"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var block_1 = require("./block");
var transaction_1 = require("./transaction");
var Ledger = /** @class */ (function () {
    function Ledger() {
        this.difficulty = 4;
        this.ledger = [this.createGenesisBlock()];
    }
    Ledger.prototype.createGenesisBlock = function () {
        return new block_1.default(null, new transaction_1.default(100, "genesis", "satoshi"));
    };
    Object.defineProperty(Ledger.prototype, "lastBlock", {
        // get last of the ledger
        get: function () {
            return this.ledger[this.ledger.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    // add block to the ledger
    Ledger.prototype.addBlock = function (transaction, fromPublicKey, signature) {
        // create transaction verifier
        var verifier = crypto.createVerify("SHA256");
        verifier.update(transaction.toString());
        // verify that address and signature are valid
        var isValid = verifier.verify(fromPublicKey, signature);
        if (isValid) {
            // create new block
            var newBlock = new block_1.default(this.lastBlock.hash, transaction);
            // mine block
            newBlock.mine(this.difficulty);
            // make sure that the ledger is valid
            if (this.isValid()) {
                this.ledger.push(newBlock);
            }
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
    Ledger.instance = new Ledger(); // singleton instance
    return Ledger;
}());
exports.default = Ledger;
