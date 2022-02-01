const { Schema, model } = require("mongoose");

const blockchainSchema = new Schema({
    ledger: [String],
    pendingTransactions: [String],
    difficulty: {
      type: Number,
      required: [true, "Difficulty is required"]
    },
    miningReward: {
      type: Number,
      required: [true, "Difficulty is required"]
    },
    hash: String
  },
  {
    timestamps: true
  }

)

const Blockchain = model("Blockchain", blockchainSchema);

module.exports = Blockchain;