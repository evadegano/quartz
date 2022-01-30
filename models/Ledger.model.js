const { Schema, model } = require("mongoose");

const ledgerSchema = new Schema({
    blocks: [String]
  },
  {
    timestamps: true
  }

)

const Ledger = model("Ledger", ledgerSchema);

module.exports = Ledger;