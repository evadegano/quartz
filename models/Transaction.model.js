const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
    header: {
      inputCounter: Number,
      outputCounter: Number,
      merkleHash: String,
      timestamps: true
    },
    inputs: [String],
    outputs: [String]
  }
)

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;