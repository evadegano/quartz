const { Schema, model } = require("mongoose");

const tempWalletSchema = new Schema({
    address: String,
    publicKey: String,
    privateKey: String
  }
)

const TempWallet = model("TempWallet", tempWalletSchema);

module.exports = TempWallet;