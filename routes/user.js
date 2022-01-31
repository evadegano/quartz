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
const Ledger = require("../models/Ledger.model");


// GET user dashboard
router.get("/wallet/:userId", (req, res, next) => {
  // search for wallet based on user_id

  // populate 
  return;
});


// GET user profile
router.get("/users/:userId", (req, res, next) => {
  // if 
  return;
});


// PUT user profile
router.put("/users/:userId", (req, res, next) => {
  return;
});


// DELETE user
router.delete("/users/:userId", (req, res, next) => {
  return;
});

// POST user transaction
router.post("/users/:userId/transaction", (req, res, next) => {
  return;
});


module.exports = router;