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
    name: String,
    balance: {
      type: Number,
      required: [true, "Balance is required."],
      default: 0
    },
    active: {
      type: Boolean,
      default: true
    },
    lastActive: Date,
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