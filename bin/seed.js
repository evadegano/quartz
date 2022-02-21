const mongoose = require("mongoose");
const axios = require("axios");
const User = require("../models/User.model");
const Wallet = require("../models/Wallet.model");

function genRandDate() {
  return;
}

// connect to mongoose
mongoose.connect(process.env.MONGODB_URI)
  .then(function () {
      console.log('connected!!!')
  })
  .catch(err => {
      console.log(err)
  })


// create users
const users = [
  {
    email: "",
    password: "",
    timestamps: Date.now()
  }
]


// create multiple wallets for each user



// top up wallets


// create tx between wallets, verify them, mine block


// create tx between wallets, verify them, mine block


// create tx between wallets, verify them, mine block


// create tx between wallets, verify them, mine block


// create tx between wallets, verify them, mine block


// create tx between wallets, verify them, mine block


// create tx between wallets, verify them, mine block


// create tx between wallets, verify them, mine block
