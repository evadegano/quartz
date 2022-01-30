import * as crypto from "crypto";
import Transaction from "./transaction"


class Block {
  public prevHash: string;
  public transactions: Transaction[];
  public hash: string;
  public nonce: number = Math.round(Math.random() * 999999999);
  public timestamps: number = Date.now();

  constructor(prevHash: string, transactions: Transaction[]) {
    this.prevHash = prevHash;
    this.transactions = transactions;
    this.hash = this.getHash();
  }

  // hash block's content
  getHash() {
    // convert object to a JSON string for hashing
    const blockData = [this.prevHash, this.transactions, this.timestamps];
    const str = JSON.stringify(blockData);

    // hash block
    const hasher = crypto.createHash("SHA256");
    hasher.update(str).end();

    return hasher.digest("hex");
  }

  // proof of work
  // find a number that, when added to the block's nonce
  // produces a hash that starts with a certain amount of 0
  mine (difficulty: number) {
    console.log("⛏ mining...");

    while (true) {
      const hasher = crypto.createHash("MD5"); // use MD5 because 128 bits hence faster to compute than SHA256
      hasher.update((this.nonce).toString()).end();

      const attempt = hasher.digest("hex");
      const substToMatch = new Array(difficulty).fill(0).join("");

      // return solution if found
      if (attempt.substr(0, difficulty) === substToMatch) {
        console.log(`Block mined: ${this.hash}`);
        return;
      }

      // else, try another solution
      this.nonce ++;
    }
  }

  getBalanceOfAddress(address: string) {
    let balance = 0;

      for (let transaction of this.transactions) {
        if (transaction.fromPublicKey === address) {
          balance -= transaction.amount;
        }

        if (transaction.toPublicKey === address) {
          balance += transaction.amount;
        }
      }

    return balance;
  }
}


export default Block;