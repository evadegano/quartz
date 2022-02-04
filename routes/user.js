const express = require("express");
const router = require("express").Router();
const passport = require("passport");

// package for password encryption
const bcrypt = require("bcryptjs");
const salt = 10;

// database models
const User = require("../models/User.model");
const Wallet = require("../models/Wallet.model");
const Block = require("../models/Block.model");
const Transaction = require("../models/Transaction.model");


// GET user wallet
router.get("/user/:walletId", (req, res, next) => {
  // fetch wallet by user_id
  Wallet.findOne({ user_id: req.user._id })
    .then()
    .catch()

  // fetch transactions by wallet public key

  // return data
  return;
});


// POST a transaction
router.post("/user/:walletId/transaction", (req, res, next) => {
  // get transaction data

  // make sure all data has been given
  
  // get total balance of this wallet by querying all transactions

  // make sure the wallet has enough funds

  // create a transaction

  // sign the transaction

  // make sure it is valid

  // add to database if valid

  return;
});


// GET user profile
router.get("/user/:userId", (req, res, next) => {
  // get user id
  const userId = req.params.userId;

  // fetch user by _id
  User.findById(userId)
    .then((userFromDBb) => {
      res.status(200).json(userFromDBb);
    })
    .catch((err) => res.status(500).json({ message: "Something went wrong." }))

  // return data
  return;
});


// PUT user data
router.put("/user/:userId", (req, res, next) => {
  // get data
  const { email, password, passwordConfirm } = req.body;
  const userId = req.params.userId;

  // make sure that passwords match
  if (password !== passwordConfirm) {
    res.status(400).json({ message: "Confirmation password doesn't match password." });
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

  // get user by _id and update
  User.findByIdAndUpdate(userId, {
    email,
    password
  })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ message: "Something went wrong." }))

  // update database
  return;
});


// DELETE user data
router.delete("/user/:userId", (req, res, next) => {
  // fetch user by _id

  // delete profile

  // turn wallet's status into inactive
  return;
});



module.exports = router;