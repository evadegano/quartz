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


// GET blockchain data
router.get("/blockchain", (req, res, next) => {
  return;
});


// GET pending transactions
router.get("/pending-transactions", (req, res, next) => {
  return;
});


// GET block transactions
router.get("/blockId:", (req, res, next) => {
  return;
});


// GET some user wallet
router.get("/walletId:", (req, res, next) => {
  return;
});


module.exports = router;