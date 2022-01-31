import Block from "./block";
import Transaction from "./transaction";


class Blockchain {
  public static instance = new Blockchain(); // singleton instance
  public ledger: Block[] = [this.createGenesisBlock()];
  public pendingTransactions: Transaction[] = [];
  public difficulty: number = 4;
  public miningReward: number = 100;

  createGenesisBlock () {
    return new Block(null, []);
  }

  // get last of the ledger
  get getLastBlock () {
    return this.ledger[this.ledger.length - 1];
  }

  // add transaction to pending transactions
  addPendingTransaction(transaction: Transaction) {
    // make sure that transaction has
    if (!transaction.fromPublicKey || !transaction.toPublicKey) {
      throw new Error("Transaction must include a from and to address.");
    }

    // make sure that transaction is valid
    if (!transaction.isValid()) {
      throw new Error("Cannot add an invalid transaction to the ledger.");
    }

    this.pendingTransactions.push(transaction);
  }

  minePendingTransactions(miningRewardAddress: string) {
    const newBlock = new Block(this.getLastBlock.hash, this.pendingTransactions);
    newBlock.mine(this.difficulty);

    // make sure that the ledger is valid
    if (this.isValid()) {
      // add block to ledger
      this.ledger.push(newBlock);

      // empty pending transactions array and add reward transaction
      this.pendingTransactions = [
        new Transaction(this.miningReward, null, miningRewardAddress)
      ];
    }
  }

  // make sure that the ledger hasn't been modified
  isValid() {
    for (let i  = 1; i < this.ledger.length; i++) {
      const currentBlock = this.ledger[i];
      const prevBlock = this.ledger[i - 1];

      // verify current block's transactions
      if (!currentBlock.areTransactionsValid()) {
        console.log(`Error: block ${currentBlock.hash} has invalid transactions.`);
        return false;
      }

      // make sure that the current block is valid
      if (currentBlock.hash !== currentBlock.getHash()) {
        console.log(`Error: block ${currentBlock.hash} has been tampered with.`);
        return false;
      }

      // make sure that there is no broken link between blocks
      if (currentBlock.prevHash !== prevBlock.hash) {
        console.log(`Error: block ${prevBlock.hash} has been tampered with.`);
        return false;
      }
    }

    console.log("Blockchain is valid.");
    return true;
  }

  getTotalBalanceOfAddress(address: string) {
    let balance = 0;

    for (let block of this.ledger) {
      balance += block.getBalanceOfAddress(address);
    }

    return balance;
  }
}


export default Blockchain;