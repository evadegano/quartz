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


// GET user dashboard
router.get("/wallet/:userId", (req, res, next) => {
  // fetch user

  // fetch wallet

  // fetch corresponding transactions

  // return data
  return;
});


// GET user profile
router.get("/users/:userId", (req, res, next) => {
  // fetch user
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