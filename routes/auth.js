const express = require("express");
const router = require("express").Router();
const passport = require("passport");

// package for password encryption
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

// wallet signature to sign and verify transactions
const { genKeys } = require("../helpers/blockchain");

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

      // else, add user to database
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashedPwd = bcrypt.hashSync(password, salt);

      const newUser = new User({
        email,
        password: hashedPwd
      });

      newUser.save()
        .then(() => {
          req.login(newUser, (err) => {
            if (err) {
              res.status(500).json({ message: "Login error, please try again." });
              return;
            }

            res.status(200).json(newUser);
          })
        })
        .catch((err) => res.status(500).json({ message: "Something went wrong." }))
    })
});


// POST wallet 
// question: should I do it on the client side instead?
router.post("/user/wallet", (req, res, next) => {
  // generate new keypairs
  const keypair = genKeys();
  // create new wallet
  const newWallet = new Wallet({
    user_id: req.user._id,
    name: "",
    publicKey: keypair.publicKey,
    lastConnection: Date.now()
  })

  newWallet.save()
    .then(() => {
      res.status(200).json({
        newWallet,
        privateKey: keypair.privateKey
      });
    })
    .catch((err) => res.status(500).json({ message: "Something went wrong." }))
})


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

      res.status(200).json(user);
    })
  })
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