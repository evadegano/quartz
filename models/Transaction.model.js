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
    }
  },
  {
    timestamps: true
  }
)

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;