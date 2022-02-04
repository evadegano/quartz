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
  // get wallet id
  const walletId = req.params.walletId;

  // fetch wallet by wallet id
  Wallet.findById(walletId)
    .then((walletFromDB) => {
      return;
    })
    .catch((err) => res.status(500).json({ message: "Something went wrong." }))

    // fetch transactions by wallet public key

    // calculate rank

    // calculate rewards

    // calculate blocks mined

    // return all data
});


// POST a transaction 
// question: is it ok to use private key like this?
router.post("/user/:walletId/transaction", (req, res, next) => {
  // get transaction data
  const { amount, fromPublicKey, toPublicKey, userPrivateKey } = req.body;
  const walletId = req.params.walletId;
  let walletBalance = 0;

  // make sure all data has been given
  if (!amount || !fromPublicKey || !toPublicKey) {
    res.status(400).json({ message: "Please fill in all fields." })
  }

  // make sure wallet address and sender address are the same
  Wallet.findById(walletId)
    .then((walletFromDB) => {
      const walletPublicKey = walletFromDB.publicKey;

      if (walletPublicKey !== fromPublicKey) {
        res.status(400).json({ message: "You cannot send coins from another account." });
      }
    })
    .catch((err) => res.status(500).json({ message: "Something went wrong." }))
  
  // get total balance of this wallet by querying all transactions
  Transaction.find({ fromPublicKey })
    .then((transactionsFromDB) => {
      // deduce debit from balance
      balance = transactionsFromDB.reduce((sum, transac) => sum - transac.amount, balance);
    })
    .catch((err) => res.status(500).json({ message: "Something went wrong." }))

  Transaction.find({ toPublicKey: fromPublicKey })
  .then((transactionsFromDB) => {
    // add credit to balance
    balance = transactionsFromDB.reduce((sum, transac) => sum + transac.amount, balance);
  })
  .catch((err) => res.status(500).json({ message: "Something went wrong." }))

  // make sure the wallet has enough funds
  if (balance < amount) {
    res.status(400).json({ message: "Insufficient funds." });
  }

  // create a transaction
  const newTransaction = new Transaction({
    amount,
    fromPublicKey,
    toPublicKey,
    signature: "temp"
  })

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
    .then((userFromDB) => {
      res.status(200).json(userFromDB);
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