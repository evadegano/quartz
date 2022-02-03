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
    transactions: [String],
    miner: {
      type: String,
      required: [true, "Miner required."]
    },
    hash: {
      type: String,
      unique: [true, "Hashing error."]
    },
  },
  {
    timestamps: true
  }
)

const Block = model("Block", blockSchema);

module.exports = Block;