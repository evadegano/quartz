import * as crypto from "crypto";

class Transaction {
    public amount: number;
    public fromPublicKey: string;
    public toPublicKey: string;

  constructor(amount: number, fromPublicKey: string, toPublicKey: string,) 
  {
    this.amount = amount;
    this.fromPublicKey = fromPublicKey;
    this.toPublicKey = toPublicKey;
  }

  // convert object to a JSON string for hashing
  toString() {
    return JSON.stringify(this);
  }
}

export default Transaction;