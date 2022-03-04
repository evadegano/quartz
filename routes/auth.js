const router = require("express").Router();
const passport = require("passport");
 
// package for password encryption
const bcrypt = require("bcryptjs");
const saltRounds = 10;

// database models
const User = require("../models/User.model");
const Wallet = require("../models/Wallet.model");


// POST signup page
router.post("/signup", (req, res, next) => {
  let { email, password, passwordConfirm, timestamps } = req.body;

  if (!timestamps) {
    timestamps = Date.now();
  }

  // make sure both email and password have been given
  if (!email | !password | !passwordConfirm) {
    res.status(400).json({ message: "Both an email and password are required." });
    return;
  }

  // make sure that passwords match
  if (password !== passwordConfirm) {
    res.status(400).json({ message: "Your confirmation password doesn't match you password." });
    return;
  }

  // verify password format
  const pwdRgex = /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{8,}$/;
  if (!pwdRgex.test(password)) {
    res.status(400).json({ message: "Your password must contain at least 8 characters, one cap letter, one number and one special character." });
    return;
  }

  // verify email address format
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Please enter a valid email address."});
    return;
  }

  // search for email address in database
  User.findOne({ email }, (err, user) => {
    // if found, return error
    if (user) {
      res.status(400).json({ message: "This email address is already linked to an account." });
      return;
    }
  })

  // else, add user to database
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPwd = bcrypt.hashSync(password, salt);

  const newUser = new User({
    email,
    password: hashedPwd,
    timestamps
  });

  newUser.save()
    .then(newUser => { 
      // save user in session
      req.login(newUser, (err) => {
        if (err) {
          res.status(500).json({ message: "Login error, please try again." });
          return;
        }

        // store data to pass to state
        const userData = {
          _id: newUser._id,
          createdAt: newUser.createdAt,
          email: newUser.email
        };


        // return user
        res.status(200).json({ newUser: userData });
      })
    })
    .catch(() => res.status(500).json({ message: "Something went wrong while signing you up." }))
});


// POST login page
router.post("/login", (req, res, next) => {
  
  passport.authenticate("local", (err, user, failureDetails) => {
    // return error if any
    if (err) {
      res.status(500).json({ message: "Something went wrong. Please try again." });
      return;
    }

    // return error if no user
    if (!user) {
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(user, (err) => {
      if (err) {
        res.status(500).json({ message: "Something went wrong while saving your session." });
        return;
      }

      // find user's active wallet
      Wallet.findOneAndUpdate(
        { user_id: user._id },
        { lastConnection: new Date().getTime() },
        { new: true }
        ).sort({ lastConnection: -1 })
        .then(walletFromDB => {
          // store data to pass to state
          const userData = {
            _id: user._id,
            createdAt: user.createdAt,
            email: user.email
          };

          res.status(200).json({ user: userData, walletAddress: walletFromDB.address });
        })
        .catch(() => res.status(500).json({ message: "Something went wrong while retrieving your wallet." }))
    })
  })(req, res, next);
});


// GET user is logged in
router.get("/loggedin", (req, res, next) => {
  try 
  {
    // return user if loggin
  if (req.user) {
    // find user's active wallet
    Wallet.findOneAndUpdate(
      { user_id: req.user._id },
      { lastConnection: new Date().getTime() },
      { new: true }
      ).sort({ lastConnection: -1 })
      .then(walletFromDB => {
        res.status(200).json({ user: req.user, walletAddress: walletFromDB.address });
      })
      .catch(() => res.status(500).json({ message: "Something went wrong while retrieving your wallet." }))
  }

  else {
    // else return error
    res.status(403).json({ message: "Unauthorized" });
  }
  }
  catch(err) {
    console.log("error", err);
  }
});


// POST log out user
router.post("/logout", (req, res, next) => {
  req.logout();
  res.status(204).send({ message: "You were logged out successfully."});
});


module.exports = router;