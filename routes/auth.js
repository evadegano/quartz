const express = require("express");
const router = require("express").Router();
const passport = require("passport");
 
// package for password encryption
const bcrypt = require("bcryptjs");
const saltRounds = 10;

// helpers for wallet keys and address
const genKeys = require("../helpers/keygenerator");
const getHash = require("../helpers/getHash");

// database models
const User = require("../models/User.model");
const Wallet = require("../models/Wallet.model");


// POST signup page
router.post("/signup", (req, res, next) => {
  const { email, password, passwordConfirm } = req.body;

  // make sure both email and password have been given
  if (!email | !password | !passwordConfirm) {
    res.status(400).json({ message: "Email and password are required." });
    return;
  }

  // make sure that passwords match
  if (password !== passwordConfirm) {
    res.status(400).json({ message: "Confirmation password doesn't match password." });
    return;
  }

  // verify password format
  const pwdRgex = /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{8,}$/;
  if (!pwdRgex.test(password)) {
    res.status(400).json({ message: "Password must contain at least 8 characters, one cap letter, one number and one special character." });
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
  });

  newUser.save()
    .then(newUser => { 
      // save user in session
      req.login(newUser, (err) => {
        if (err) {
          res.status(500).json({ message: "Login error, please try again." });
          return;
        }

        // generate new keypairs
        const [ publicKey, privateKey ] = genKeys();
        // hash public key into a wallet address
        const address = getHash(publicKey);

        // create new wallet
        const newWallet = new Wallet({
          user_id: req.user._id,
          address,
          lastConnection: Date.now()
        })

        newWallet.save()
          .then(() => {
            res.status(200).json({
              newUser: req.user,
              walletAddress: newWallet.address,
              publicKey,
              privateKey
            });
          })
          .catch(() => res.status(500).json({ message: "Something went wrong when creating your wallet." }))
      })
    })
    .catch(() => res.status(500).json({ message: "Something went wrong during sign up." }))
});


// POST wallet 
// router.post("/wallet", (req, res, next) => {
//   const { userId } = req.body;
  
//   // generate new keypairs
//   const [ publicKey, privateKey ] = genKeys();
//   // hash public key into a wallet address
//   const address = getHash(publicKey);

//   // create new wallet
//   const newWallet = new Wallet({
//     user_id: req.user._id,
//     address,
//     lastConnection: Date.now()
//   })

//   newWallet.save()
//     .then(() => {
//       res.status(200).json({
//         walletAddress: newWallet.address,
//         publicKey,
//         privateKey
//       });
//     })
//     .catch(() => res.status(500).json({ message: "Something went wrong when creating your wallet." }))
// });


// POST login page
router.post("/login", (req, res, next) => {
  
  passport.authenticate("local", (err, user, failureDetails) => {
    // return error if any
    if (err) {
      res.status(500).json({ message: "Something went wrong when authenticating user." });
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
        res.status(500).json({ message: "Something went wrong when saving session." });
        return;
      }

      Wallet.find({ user_id: user._id }).sort({ lastConnection: "descending"})
        .then(walletsFromDB => {
          const walletAddresses = walletsFromDB.map(wallet => wallet.address);

          res.status(200).json({ user, userWallets: walletAddresses });
        })
        .catch(() => res.status(500).json({ message: "Something went wrong when retrieving user wallets." }))

    })
  })(req, res, next);
});

// GET user is logged in
router.get("/loggedin", (req, res, next) => {
  // return user if loggin
  if (req.user) {
    res.status(200).json(req.user);
    return
  }

  // else return error
  res.status(403).json({ message: "Unauthorized" });
});


// POST log out user
router.post("/logout", (req, res, next) => {
  req.logout();
  res.status(204).send();
});


module.exports = router;