import * as crypto from "crypto";
import Transaction from "./transaction"


class Block {
  public prevHash: string;
  public transaction: Transaction;
  public nonce: number = Math.round(Math.random() * 999999999);
  public timestamps: number = Date.now();

  constructor(prevHash: string, transaction: Transaction) {
    this.prevHash = prevHash;
    this.transaction = transaction;
  }

  // hash block's content
  get hash() {
    // convert object to a JSON string for hashing
    const str = JSON.stringify(this);

    // hash block
    const hasher = crypto.createHash("SHA256");
    hasher.update(str).end();

    return hasher.digest("hex");
  }
}


export default Block;