const { Schema, model } = require("mongoose");

const blockSchema = new Schema({
    nonce: {
      type: Number,
      required: [true, "Nonce required."]
    },
    prevHash: {
      type: String,
      required: [true, "Prev hash required"]
    },
    transactions: [String]
  },
  {
    timestamps: true
  }
)

const Block = model("Block", blockSchema);

module.exports = Block;