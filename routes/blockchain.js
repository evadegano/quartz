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


// GET all transations
router.get("/transactions", (req, res, next) => {
  Transaction.find()
    .then((transactionFromDB) => res.status(200).json(transactionFromDB))
    .catch(() => res.status(500).json({ message: "Something went wrong." }))
});


// GET all blocks
router.get("/blocks", (req, res, next) => {
  Block.find()
    .then((blocksFromDB) => res.status(200).json(blocksFromDB))
    .catch(() => res.status(500).json({ message: "Something went wrong." }))
});


// POST new block
router.post("/blocks", (req, res, next) => {
  // create new block after it has been mined (if mining is still needed)

  // make sure that the blockchain is still valid (hasn't been tampered with)

  // add block to the database

  // update transactions statuses

  // send reward
})


// GET all wallets
router.get("/wallets", (req, res, next) => {
  Wallet.find()
    .then((walletsFromDB) => res.status(200).json(walletsFromDB))
    .catch(() => res.status(500).json({ message: "Something went wrong." }))
});


module.exports = router;