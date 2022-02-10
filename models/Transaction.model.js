const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
    header: {
      inputCounter: Number,
      outputCounter: Number,
      merkleHash: String,
      //timestamps: true
    },
    inputs: [String],
    outputs: [String],
    confirmed: {
      type: Boolean,
      default: false
    }
  }
)

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;