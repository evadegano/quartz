// packages
const mongoose = require("mongoose");

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


// delete temporary wallets
function deleteWallets() {
  Wallet.deleteMany({ })
    .then(() => console.log("deleted wallets"))
    .catch(err => console.log("wallet deletion err:", err))
}


run()