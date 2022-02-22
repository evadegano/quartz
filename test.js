// packages
const mongoose = require("mongoose");
var hri = require('human-readable-ids').hri;
const fs = require("fs");

// package for password encryption
const bcrypt = require("bcryptjs");
const saltRounds = 10;

// helpers for wallet keys and address
const genKeys = require("./helpers/keyGenerator");
const getHash = require("./helpers/getHash");

// db models
const User = require("./models/User.model");
const Wallet = require("./models/Wallet.model");
const TempWallet = require("./models/TempWallet.model")

// variables
const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';


// mongoose.connect('mongodb://localhost/quartz')
//   .then(() => console.log("connected"))
//   .catch(err => console.log(err))


// generate new keypairs
const keypair = genKeys();
// hash public key into a wallet address
const address = getHash(keypair.getPublic("hex"));

let parsedKeypair = JSON.stringify(keypair);
parsedKeypair = JSON.parse(parsedKeypair);

console.log("parsedAddress =>", getHash(parsedKeypair.getPublic("hex")))

// const newTempWallet = new TempWallet({
//   address,
//   keypair
// })

console.log("address =>", address);

// newTempWallet.save()
//   .then(() => console.log("saved"))
//   .catch(err => console.log(err))