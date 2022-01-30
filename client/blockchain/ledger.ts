import * as crypto from "crypto";
import Block from "./block";
import Transaction from "./transaction";


class Ledger {
  public static instance = new Ledger(); // singleton instance
  public ledger: Block[];
  public difficulty: number = 4;

  constructor () {
    this.ledger = [new Block(null, new Transaction(100, "genesis", "satoshi"))];
  }

  // get last of the ledger
  get lastBlock() {
    return this.ledger[this.ledger.length - 1];
  }

  // proof of work
  // find a number that, when added to the block's nonce
  // produces a hash that starts with a certain amount of 0
  mine (nonce: number) {
    let solution = 1;
    console.log("⛏ mining...");

    while (true) {
      const hasher = crypto.createHash("MD5"); // use MD5 because 128 bits hence faster to compute than SHA256
      hasher.update((nonce + solution).toString()).end();

      const attempt = hasher.digest("hex");
      const substToMatch = new Array(this.difficulty).fill(0).join("");

      // return solution if found
      if (attempt.substr(0, this.difficulty) === substToMatch) {
        console.log(`Solved: ${solution}`);
        return solution;
      }

      // else, try another solution
      solution ++;
    }
  }

  // add block to the ledger
  addBlock(transaction: Transaction, fromPublicKey: string, signature: Buffer) {
    // create transaction verifier
    const verifier = crypto.createVerify("SHA256");
    verifier.update(transaction.toString());
    // verify that address and signature are valid
    const isValid = verifier.verify(fromPublicKey, signature);

    if (isValid) {
      const newBlock = new Block(this.lastBlock.hash, transaction);
      this.mine(newBlock.nonce);
      this.ledger.push(newBlock);
    }
  }
}


export default Ledger;