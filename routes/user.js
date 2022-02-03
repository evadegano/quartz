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
const Blockchain = require("../models/Blockchain.model");


// GET user wallet
router.get("/user/:walletId", (req, res, next) => {
  // fetch user

  // fetch wallet

  // fetch corresponding transactions

  // return data
  return;
});

// POST a transaction
router.post("/user/:walletId/transaction", (req, res, next) => {
  return;
});


// GET user profile
router.get("/user/:userId", (req, res, next) => {
  // fetch user
  return;
});


// PUT user data
router.put("/user/:userId", (req, res, next) => {
  // fetch user
  return;
});


// DELETE user data
router.delete("/user/:userId", (req, res, next) => {
  // fetch user
  return;
});



module.exports = router;