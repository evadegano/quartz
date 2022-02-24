const { Schema, model } = require("mongoose");

const walletSchema = new Schema({
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    address: {
      type: String,
      required: [true, "Wallet address required."],
      unique: [true, "This address has already been taken"]
    },
    name: {
      type: String,
      required: [true, "Wallet name required."],
      unique: [true, "This name has already been taken"]
    },
    active: {
      type: Boolean,
      default: true
    },
    lastConnection: Date,
    deactivationDate: {
      type: Date,
      default: null
    },
    keypair: {},
    publicKey: String,
    privateKey: String
  },
  {
    timestamps: true,
  }
)

const Wallet = model("Wallet", walletSchema);

module.exports = Wallet;