import Block from "./block";
import Transaction from "./transaction";

// on the blockchain page, display a message with the integrity of the bc

// return unspent outputs of a wallet
// # It returns a JSON object with a list "unspent_outputs", containing UTXO, like this:
// #{      "unspent_outputs":[
// #   {
// #     "tx_hash":"ebadfaa92f1fd29e2fe296eda702c48bd11ffd52313e986e99ddad9084062167",
// #     "tx_index":51919767,
// #     "tx_output_n": 1,
// #     "script":"76a9148c7e252f8d64b0b6e313985915110fcfefcf4a2d88ac",
// #     "value": 8000000,
// #     "value_hex": "7a1200",
// #     "confirmations":28691
// #   },
// # ...
// #]}

class Blockchain {
  public static instance = new Blockchain(); // singleton instance
  public ledger: Block[] = [this.createGenesisBlock()];
  public pendingTransactions: Transaction[] = [];
  public difficulty: number = 4;
  public miningReward: number = 100;

  createGenesisBlock () {
    return new Block(null, null, []);
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

    // add transaction to pending transactions
    this.pendingTransactions.push(transaction);
    // update transaction's status
    transaction.status = "Awaiting mining";
  }

  minePendingTransactions(miningRewardAddress: string) {
    // get transactions merkle hashes

    // hash them into a merkle root
    const merkleRoot = "to be modified";
    // create and mine new block
    const newBlock = new Block(this.getLastBlock.hash, merkleRoot, this.pendingTransactions);
    newBlock.mine(this.difficulty);

    // make sure that the ledger is valid
    if (this.isValid()) {
      // add block to ledger
      this.ledger.push(newBlock);

      // update transactions status
      newBlock.transactions.map(transaction => transaction.status = "Mined");

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
      if (currentBlock.header.prevHash !== prevBlock.hash) {
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