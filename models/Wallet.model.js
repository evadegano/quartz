const { Schema, model } = require("mongoose");

const walletSchema = new Schema({
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    address: {
      type: String,
      required: [true, "Wallet address required."]
    },
    name: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: true
    },
    lastConnection: Date,
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