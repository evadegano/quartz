const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const TempWallet = require("../models/TempWallet.model");


router.get("/users", (req, res, next) => {
  User.find({ })
    .then(usersFromDB => {
      const userIDs = usersFromDB.map(user => user._id)
      res.status(500).json({ userIDs })
    })
    .catch(err => res.status(500).json({ message: err }))
})


router.post("/temp-wallets", (req, res, next) => {
  const { walletAddress, publicKey, privateKey } = req.body;

  TempWallet.create({ walletAddress, publicKey, privateKey })
    .then((walletsFromDB => res.status(200).json({ wallets: walletsFromDB })))
    .catch(err => res.status(500).json({ message: err }))
})


router.get("/temp-wallets", (req, res, next) => {
  const { address } = req.body;

  TempWallet.findOne({ address })
    .then(tempWalletFromDB => res.status(200).json({ tempWallet: tempWalletFromDB }))
    .catch(err => res.status(500).json({ message: err }))
})

module.exports = router;