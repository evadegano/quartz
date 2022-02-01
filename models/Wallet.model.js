const { Schema, model } = require("mongoose");

const walletSchema = new Schema({
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    publicKey: {
      type: String,
      required: [true, "Public key required."]
    },
    privateKey: {
      type: String,
      required: [true, "Private key required."]
    },
    balance: {
      type: Number,
      required: [true, "Balance is required."],
      default: 0
    },
    active: {
      type: Boolean,
      default: true
    },
    deactivationDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
  }
)

const Wallet = model("Wallet", walletSchema);

module.exports = Wallet;