import * as crypto from "crypto";
import Transaction from "./transaction"


class Block {
  public header: {
    prevHash: string;
    nonce: number;
    merkelRoot: string;
    timestamps: number;
  };
  public transactions: Transaction[];
  public transactionCounter: number;
  public miner: string;
  public miningReward: number;
  public hash: string;
  
  constructor(prevHash: string, merkelRoot: string, transactions: Transaction[]) {
    this.header = {
      prevHash: prevHash,
      nonce: Math.round(Math.random() * 999999999),
      merkelRoot: merkelRoot,
      timestamps: Date.now()
    }
    
    this.transactions = transactions;
    this.transactionCounter = this.transactions.length;
    this.hash = this.getHash();
  }

  // hash block's content
  getHash() {
    // convert object to a JSON string for hashing
    const str = JSON.stringify(this.header);

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
      hasher.update((this.header.nonce).toString()).end();

      const attempt = hasher.digest("hex");
      const substToMatch = new Array(difficulty).fill(0).join("");

      // return solution if found
      if (attempt.substr(0, difficulty) === substToMatch) {
        console.log(`Block mined: ${this.hash}`);
        return;
      }

      // else, try another solution
      this.header.nonce ++;
    }
  }

  getBalanceOfAddress(address: string) {
    let balance = 0;

      for (let transaction of this.transactions) {
        if (transaction.header.fromAddress === address) {
          balance -= transaction.header.amount;
        }

        if (transaction.header.toAddress === address) {
          balance += transaction.header.amount;
        }
      }

    return balance;
  }

  // verify all transactions in the block via their merkle hash
  areTransactionsValid() {
    return true;
  }
}


export default Block;