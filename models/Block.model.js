const { Schema, model } = require("mongoose");

const blockSchema = new Schema({
    header: {
      nonce: Number,
      merkleRoot: String,
      prevHash: String,
      timestamps: true
    },
    transactions: {
      type: [Schema.Types.ObjectId],
      ref: "Transaction"
    },
    transactionCounter: Number,
    miner: {
      type: [Schema.Types.ObjectId],
      ref: "Wallet"
    },
    miningReward: Number,
  }
)

const Block = model("Block", blockSchema);

module.exports = Block;