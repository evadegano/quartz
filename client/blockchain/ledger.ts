import * as crypto from "crypto";
import Block from "./block";
import Transaction from "./transaction";


class Ledger {
  public static instance = new Ledger(); // singleton instance
  public ledger: Block[];
  public difficulty: number = 4;

  constructor () {
    this.ledger = [this.createGenesisBlock()];
  }

  createGenesisBlock () {
    return new Block(null, new Transaction(100, "genesis", "satoshi"));
  }

  // get last of the ledger
  get lastBlock () {
    return this.ledger[this.ledger.length - 1];
  }

  // add block to the ledger
  addBlock (transaction: Transaction, fromPublicKey: string, signature: Buffer) {
    // create transaction verifier
    const verifier = crypto.createVerify("SHA256");
    verifier.update(transaction.toString());
    // verify that address and signature are valid
    const isValid = verifier.verify(fromPublicKey, signature);

    if (isValid) {
      // create new block
      const newBlock = new Block(this.lastBlock.hash, transaction);
      // mine block
      newBlock.mine(this.difficulty);

      // make sure that the ledger is valid
      if (this.isValid()) {
        this.ledger.push(newBlock);
      }
    }
  }

  // make sure that the ledger hasn't been modified
  isValid() {
    for (let i  = 1; i < this.ledger.length; i++) {
      const currentBlock = this.ledger[i];
      const prevBlock = this.ledger[i - 1];

      if (currentBlock.hash !== currentBlock.getHash()) {
        console.log("Blockchain is not valid.");
        return false;
      }

      if (currentBlock.prevHash !== prevBlock.hash) {
        console.log("Blockchain is not valid.");
        return false;
      }
    }

    console.log("Blockchain is valid.");
    return true;
  }
}


export default Ledger;