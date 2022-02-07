const { Schema, model } = require("mongoose");


const transactionInputSchema = new Schema({
    transaction_id: {
      type: Schema.Types.ObjectId,
      ref: "Transaction"
    },
    outputIndex: String,
    unlockingScript: String,
  },
  {
    timestamps: true
  }
)

const TransactionInput = model("TransactionInput", transactionInputSchema);

module.exports = TransactionInput;