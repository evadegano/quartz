const mongoose = require("mongoose");
const router = require("express").Router();
const stripe = require('stripe')("sk_test_51KUuGeD6SFhoou9ACHMG9MMkHMT5DKeJhlMEbqzh1GElp26nxVEbetozSgZVlxSdpDSZcyPAp8tL6aWHOWkHcdGL00SNDkbmii");
var hri = require('human-readable-ids').hri;

// package used for password hashing
const bcrypt = require("bcryptjs");
const saltRounds = 10;


// database models
const User = require("../models/User.model");
const Wallet = require("../models/Wallet.model");


// PUT user data
router.put("/:userId", (req, res, next) => {
  // get data
  const { email, password, passwordConfirm } = req.body;
  const userId = req.params.userId;

  // verify email address format
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Please enter a valid email address."});
    return;
  }

  // make sure that passwords match
  if (password !== passwordConfirm) {
    res.status(400).json({ message: "Confirmation password doesn't match password." });
    return;
  }

  // verify password format
  const pwdRgex = /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{8,}$/;
  if (!pwdRgex.test(password)) {
    res.status(400).json({ message: "Password must contain at least 8 characters, one cap letter, one number and one special character." });
    return;
  }

  // hash password
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPwd = bcrypt.hashSync(password, salt);

  
  // get user by _id and update
  User.findByIdAndUpdate(
    userId, 
    { email, password: hashedPwd },
    { new: true })
    .then((user) => res.status(200).json(user))
    .catch(() => res.status(500).json({ message: "Something went wrong." }))
});


// DELETE user data
router.delete("/:userId", (req, res, next) => {
  // get user id
  const userId = req.params.userId;

  // make sure the id is valid
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "This user id is not valid." });
    return;
  }

  // fetch user by _id and delete
  const p1 = User.findByIdAndRemove(userId);

  // turn wallet's status into inactive
  const p2 = Wallet.findOneAndUpdate({ user_id: userId }, {
    active: false,
    deactivationDate: Date.now()
  });

  Promise.all([p1, p2])
    .then(() => res.status(200).json({ message: "Your account has been removed successfully." }))
    .catch(() => res.status(500).json({ message: "Something went wrong, your account could not be deleted." }))    
});


// Get wallets
router.get("/wallets", (req, res, next) => {
  Wallet.find({})
    .then(walletsFromDB => {
      res.status(200).json(walletsFromDB)
    })
    .catch(() => {
      res.status(500).json({ message: "Something went wrong when retrieving wallets." })
    })
});


// POST wallet 
router.post("/wallets", (req, res, next) => {
  const { userId, walletAddress, keypair, publicKey, privateKey } = req.body;

  // generate random name
  let randWalletName = hri.random() + Math.round(Math.random() * 100);

  console.log("randWalletName", randWalletName);

  // create new wallet
  const newWallet = new Wallet({
    user_id: userId,
    address: walletAddress,
    name: randWalletName,
    lastConnection: Date.now(),
    keypair,
    publicKey,
    privateKey
  })

  console.log("hey");

  newWallet.save()
    .then(() => {
      res.status(200).json({ walletAddress: newWallet.address });
    })
    .catch(() => res.status(500).json({ message: "Something went wrong when creating your wallet." }))
});


// PUT wallets
router.put("/:walletId", (req, res, next) => {
  const { walletId } = req.params.walletId;

  Wallet.findByIdAndUpdate(
    walletId,
    { lastConnection: Date.now() },
    { new: true })
    .then(walletFromDb => res.status(200).json(walletFromDb.address))
    .catch(() => res.status(500).json({ message: "Connection to database failed."}))
});


// POST coins
router.post("/coins", (req, res, next) => {
  const { amount, token, publicKey, privateKey } = req.body;
  // key used to prevent user from being charged twice by mistake
  const idempotencyKey = publicKey;

  // add user to user list
  stripe.customers.create({
    email: token.email,
    source: token.id

  }).then(customer => {
    stripe.charges.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      description: "Exchangnig fiat to QRTZ"
    }, {idempotencyKey});
    
  })
    .then(() => res.status(200).json({ 
      amount, 
      keypair: {
        publicKey,
        privateKey
      } 
    }))
    .catch(() => res.status(500).json({ message: "Money exchange failed."}))
});


module.exports = router;