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


// // GET blockchain data
// router.get("/blockchain", (req, res, next) => {
//   const blockchainHash = "";

//   // fetch blocks from ledger

//   // populate blocks

//   // return data
//   return;
// });


// // GET all transations
// router.get("/transactions", (req, res, next) => {
//   return;
// });


// // GET pending transactions
// router.get("/pending-transactions", (req, res, next) => {
//   const blockchainHash = "";

//   // fetch pending transactions from blochain

//   // populate transactions

//   // return data
//   return;
// });



// // GET all blocks
// router.get("/blocks", (req, res, next) => {
//   return;
// });


// // GET block transactions
// router.get("/blocks/:blockId", (req, res, next) => {
//   return;
// });


// // GET all wallets
// router.get("/wallets", (req, res, next) => {
//   return;
// });


// // GET wallet details
// router.get("/wallets/:walletId", (req, res, next) => {
//   return;
// });

// POST new block
router.post("/block/blockId", (req, res, next) => {
  // create new block

  // mine new block

  // make sure that the blockchain is still valid (hasn't been tampered with)

  // add block to the database

  // update transactions statuses

  // send reward
})


module.exports = router;