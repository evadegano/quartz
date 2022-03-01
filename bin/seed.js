// packages
const mongoose = require("mongoose");
const crypto = require('crypto');
const hri = require('human-readable-ids').hri;

// package for password encryption
const bcrypt = require("bcryptjs");
const saltRounds = 10;

// db models
const User = require("../models/User.model");
const Wallet = require("../models/Wallet.model");

// variables
const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';



function run() {
  // connect to database
  mongoose.connect('mongodb://localhost/quartz')
    .then(() => {
      console.log("connected!!");
      const users = createUsers();
      return addUsersToDB(users);
    })
    .then(() => {
      return deleteWallets();
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
    const timestamps = randomDate(new Date(2021, 9, 1), new Date()).getTime();

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

function deleteUsers() {
  // delete users if any
  User.deleteMany({ })
    .then(() => console.log("deleted users"))
    .catch(err => console.log("user deletion err:", err))
}


// sign up fake users
function addUsersToDB(usersArray) {
  // delete users if any
  User.create(usersArray)
    .then(() => console.log("users added to db"))
    .catch(err => console.log("adding users err:", err))
}


function getUserIds() {
  User.find({ })
    .then(usersFromDB => usersFromDB)
    .catch(err => console.log("searching for users err:", err))
}


async function createWallets(usersFromDB) {
  let wallets = [];

  for (let user of usersFromDB) {
    // generate random name
    const randWalletName = await hri.random() + Math.round(Math.random() * 100);

    // turn it into a wallet address
    const walletAddress = crypto.createHash('sha256').update(randWalletName).digest();

    wallets.push({
      user_id: user._id,
      address: walletAddress,
      name: randWalletName,
      lastConnection: user.timestamps,
    })
  }

  return wallets;
}


// delete temporary wallets
function deleteWallets() {
  Wallet.deleteMany({ })
    .then(() => console.log("deleted wallets"))
    .catch(err => console.log("wallet deletion err:", err))
}

// sign up fake users
function addWalletsToDB(walletsArray) {
  // delete users if any
  Wallet.create(walletsArray)
    .then(() => console.log("wallets added to db"))
    .catch(err => console.log("adding wallets err:", err))
}


run()