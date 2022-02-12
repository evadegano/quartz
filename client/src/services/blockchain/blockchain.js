"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var block_1 = __importDefault(require("./block"));
var transaction_1 = __importDefault(require("./transaction"));
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
var Blockchain = /** @class */ (function () {
    function Blockchain() {
        this.ledger = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.difficulty = 4;
        this.miningReward = 100;
    }
    Blockchain.prototype.createGenesisBlock = function () {
        return new block_1.default(null, null, []);
    };
    Object.defineProperty(Blockchain.prototype, "getLastBlock", {
        // get last of the ledger
        get: function () {
            return this.ledger[this.ledger.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    // add transaction to pending transactions
    Blockchain.prototype.addPendingTransaction = function (transaction) {
        // make sure that transaction has
        if (!transaction.header.fromAddress || !transaction.header.toAddress) {
            throw new Error("Transaction must include a from and to address.");
        }
        // add transaction to pending transactions
        this.pendingTransactions.push(transaction);
    };
    Blockchain.prototype.minePendingTransactions = function (miningRewardAddress) {
        // get transactions merkle hashes
        // hash them into a merkle root
        var merkleRoot = "to be modified";
        // create and mine new block
        var newBlock = new block_1.default(this.getLastBlock.hash, merkleRoot, this.pendingTransactions);
        newBlock.mine(this.difficulty);
        // make sure that the ledger is valid
        if (this.isValid()) {
            // add block to ledger
            this.ledger.push(newBlock);
            // empty pending transactions array and add reward transaction
            this.pendingTransactions = [
                new transaction_1.default(this.miningReward, null, miningRewardAddress)
            ];
        }
    };
    // make sure that the ledger hasn't been modified
    Blockchain.prototype.isValid = function () {
        for (var i = 1; i < this.ledger.length; i++) {
            var currentBlock = this.ledger[i];
            var prevBlock = this.ledger[i - 1];
            // verify current block's transactions
            if (!currentBlock.areTransactionsValid()) {
                console.log("Error: block ".concat(currentBlock.hash, " has invalid transactions."));
                return false;
            }
            // make sure that the current block is valid
            if (currentBlock.hash !== currentBlock.getHash()) {
                console.log("Error: block ".concat(currentBlock.hash, " has been tampered with."));
                return false;
            }
            // make sure that there is no broken link between blocks
            if (currentBlock.header.prevHash !== prevBlock.hash) {
                console.log("Error: block ".concat(prevBlock.hash, " has been tampered with."));
                return false;
            }
        }
        console.log("Blockchain is valid.");
        return true;
    };
    Blockchain.prototype.getTotalBalanceOfAddress = function (address) {
        var balance = 0;
        for (var _i = 0, _a = this.ledger; _i < _a.length; _i++) {
            var block = _a[_i];
            balance += block.getBalanceOfAddress(address);
        }
        return balance;
    };
    Blockchain.instance = new Blockchain(); // singleton instance
    return Blockchain;
}());
exports.default = Blockchain;
