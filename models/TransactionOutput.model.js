const { Schema, model } = require("mongoose");


const transactionOutputSchema = new Schema({
    amount: {
      type: Number,
      required: [true, "Tansaction amount required."]
    },
    lockingScript: String
  },
  {
    timestamps: true
  }
)

const TransactionOutput = model("TransactionOutput", transactionOutputSchema);

module.exports = TransactionOutput;