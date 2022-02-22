// packages
const mongoose = require("mongoose");
var hri = require('human-readable-ids').hri;

// package for password encryption
const bcrypt = require("bcryptjs");
const saltRounds = 10;

// helpers for wallet keys and address
const genKeys = require("../helpers/keyGenerator");
const getHash = require("../helpers/getHash");

// db models
const User = require("../models/User.model");
const Wallet = require("../models/Wallet.model");
const TempWallet = require("../models/TempWallet.model")

// variables
const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';



function run() {
  // connect to database
  mongoose.connect('mongodb://localhost/quartz')
    // .then(() => {
    //   console.log("connected!!");
    //   const users = createUsers();
    //   return addUsersToDB(users);
    // })
    .then(() => {
      console.log("connected!");
      return genWallets();
    })
    .catch(err => console.log("global err:", err))
}


// generate random date
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


// generate random email address and pwd
function randomEmailAndPwd() {
  var string = '';

  for(var ii=0; ii<15; ii++){
      string += chars[Math.floor(Math.random() * chars.length)];
  }

  return [ string, string + "gmail.com" ];
}


// create fake users
function createUsers() {
  let users = [];

  for (let i = 0; i < 271; i++) {
    const [ pwd, email ] = randomEmailAndPwd();
    const timestamps = randomDate(new Date(2021, 6, 1), new Date());

    // hash pwd
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPwd = bcrypt.hashSync(pwd, salt);

    const user = {
      email,
      password: hashedPwd,
      timestamps
    }

    users.push(user);
  }

  console.log("fake users created");
  return users;
}


// sign up fake users
function addUsersToDB(usersArray) {
  // delete users if any
  User.deleteMany({ email: {$ne: "eva.degano@gmail.com"} })
    .then(() => console.log("deleted users"))
    .then(() => {
      return User.create(usersArray)
    })
    .then(() => console.log("users added to db"))
    .catch(err => console.log("user deletion err:", err))
}


// create multiple wallets for each user
function genWallets() {
  let wallets = [];

  Wallet.deleteMany({ user_id: {$ne: "620d2a6cd7ba8f53a70a75e1"} })
    .then(() => console.log("deleted wallets"))
    .then(() => {
      return User.find({ email: {$ne: "eva.degano@gmail.com"} }
    )})
    .then(usersFromDB => {
      
      for (let i = 0; i < usersFromDB.length; i++) {
        // add a random amount of wallets to the user
        const rand = Math.round(Math.random() * 8);

        for (let j = 0; j < rand; j++) {
          // generate new keypairs
          const keypair = genKeys();
          // hash public key into a wallet address
          const address = getHash(keypair.getPublic("hex"));
          // generate random name
          let randWalletName = hri.random() + Math.round(Math.random() * 100);

          // create new wallet
          const newWallet = new Wallet({
            user_id: usersFromDB[i]._id,
            address,
            name: randWalletName,
            lastConnection: Date.now()
          })

          const newTempWallet = new TempWallet({
            address,
            keypair
          })

          newWallet.save()
            .then()
            .catch(err => console.log("creating wallet err:", err))

          newTempWallet.save()
            .then()
            .catch(err => console.log("creating temp wallet err:", err))
        }
      }

      console.log("wallets created");
    })
    .catch(err => console.log("wallet creation err:", err))
}


// top up wallets


// create tx between wallets, verify them, mine block


run();