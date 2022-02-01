const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
    amount: {
      type: Number,
      required: [true, "Tansaction amount required."]
    },
    fromPublicKey: {
      type: String,
      required: [true, "Public key required."]
    },
    toPublicKey: {
      type: String,
      required: [true, "Public key required."]
    },
    status: {
      type: String,
      enum: ["Initialized", "Awaiting mining", "Mined"],
      default: "Initialized"
    },
    signature: Buffer,
    hash: {
      type: String,
      unique: [true, "Hashing error."]
    }
  },
  {
    timestamps: true
  }
)

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;