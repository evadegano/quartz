"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var block_1 = require("./block");
var transaction_1 = require("./transaction");
var Ledger = /** @class */ (function () {
    function Ledger() {
        this.difficulty = 4;
        this.ledger = [new block_1.default(null, new transaction_1.default(100, "genesis", "satoshi"))];
    }
    Object.defineProperty(Ledger.prototype, "lastBlock", {
        // get last of the ledger
        get: function () {
            return this.ledger[this.ledger.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    // proof of work
    // find a number that, when added to the block's nonce
    // produces a hash that starts with a certain amount of 0
    Ledger.prototype.mine = function (nonce) {
        var solution = 1;
        console.log("⛏ mining...");
        while (true) {
            var hasher = crypto.createHash("MD5"); // use MD5 because 128 bits hence faster to compute than SHA256
            hasher.update((nonce + solution).toString()).end();
            var attempt = hasher.digest("hex");
            var substToMatch = new Array(this.difficulty).fill(0).join("");
            // return solution if found
            if (attempt.substr(0, this.difficulty) === substToMatch) {
                console.log("Solved: ".concat(solution));
                return solution;
            }
            // else, try another solution
            solution++;
        }
    };
    // add block to the ledger
    Ledger.prototype.addBlock = function (transaction, fromPublicKey, signature) {
        // create transaction verifier
        var verifier = crypto.createVerify("SHA256");
        verifier.update(transaction.toString());
        // verify that address and signature are valid
        var isValid = verifier.verify(fromPublicKey, signature);
        if (isValid) {
            var newBlock = new block_1.default(this.lastBlock.hash, transaction);
            this.mine(newBlock.nonce);
            this.ledger.push(newBlock);
        }
    };
    Ledger.instance = new Ledger(); // singleton instance
    return Ledger;
}());
exports.default = Ledger;
