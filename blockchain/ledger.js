"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var block_1 = require("./block");
var transaction_1 = require("./transaction");
var Ledger = /** @class */ (function () {
    function Ledger() {
        this.ledger = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.difficulty = 4;
        this.miningReward = 100;
    }
    Ledger.prototype.createGenesisBlock = function () {
        return new block_1.default(null, []);
    };
    Object.defineProperty(Ledger.prototype, "getLastBlock", {
        // get last of the ledger
        get: function () {
            return this.ledger[this.ledger.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    // add transaction to pending transactions
    Ledger.prototype.addPendingTransaction = function (transaction) {
        this.pendingTransactions.push(transaction);
    };
    Ledger.prototype.minePendingTransactions = function (miningRewardAddress) {
        var newBlock = new block_1.default(this.getLastBlock.hash, this.pendingTransactions);
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
    Ledger.prototype.isValid = function () {
        for (var i = 1; i < this.ledger.length; i++) {
            var currentBlock = this.ledger[i];
            var prevBlock = this.ledger[i - 1];
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
    };
    Ledger.prototype.getTotalBalanceOfAddress = function (address) {
        var balance = 0;
        for (var _i = 0, _a = this.ledger; _i < _a.length; _i++) {
            var block = _a[_i];
            balance += block.getBalanceOfAddress(address);
        }
        return balance;
    };
    Ledger.instance = new Ledger(); // singleton instance
    return Ledger;
}());
exports.default = Ledger;
