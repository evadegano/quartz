const { Schema, model } = require("mongoose");

const blockSchema = new Schema({
    nonce: {
      type: Number,
      required: [true, "Nonce required."]
    },
    prevHash: {
      type: String,
      required: [true, "Prev hash required."],
      unique: [true, "Hashing error."]
    },
    transactions: {
      type: [Schema.Types.ObjectId],
      ref: "Transaction"
    },
    miner: {
      type: String,
      required: [true, "Miner required."]
    },
    miningReward: Number,
    miningDuration: Number
  },
  {
    timestamps: true
  }
)

const Block = model("Block", blockSchema);

module.exports = Block;