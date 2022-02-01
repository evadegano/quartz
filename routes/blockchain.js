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
const Blockhain = require("../models/Blockchain.model");


// GET blockchain data
router.get("/blockchain", (req, res, next) => {
  const blockchainHash = "";

  // fetch blocks from ledger

  // populate blocks

  // return data
  return;
});


// GET pending transactions
router.get("/pending-transactions", (req, res, next) => {
  const blockchainHash = "";

  // fetch pending transactions from blochain

  // populate transactions

  // return data
  return;
});


// GET block transactions
router.get("/blockId:", (req, res, next) => {
  // get block hash
  const blockHash = ""

  // fetch block

  // populate transactions

  // return data
  return;
});


// GET some user wallet
router.get("/walletId:", (req, res, next) => {
  // get wallet hash

  // fetch wallet

  // fetch corresponding transactions

  // return data
  return;
});


module.exports = router;