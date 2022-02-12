"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = __importStar(require("crypto"));
var Block = /** @class */ (function () {
    function Block(prevHash, merkelRoot, transactions) {
        this.header = {
            prevHash: prevHash,
            nonce: Math.round(Math.random() * 999999999),
            merkelRoot: merkelRoot,
            timestamps: Date.now()
        };
        this.transactions = transactions;
        this.transactionCounter = this.transactions.length;
        this.hash = this.getHash();
    }
    // hash block's content
    Block.prototype.getHash = function () {
        // convert object to a JSON string for hashing
        var str = JSON.stringify(this.header);
        // hash block
        var hasher = crypto.createHash("SHA256");
        hasher.update(str).end();
        return hasher.digest("hex");
    };
    // proof of work
    // find a number that, when added to the block's nonce
    // produces a hash that starts with a certain amount of 0
    Block.prototype.mine = function (difficulty) {
        console.log("⛏ mining...");
        while (true) {
            var hasher = crypto.createHash("MD5"); // use MD5 because 128 bits hence faster to compute than SHA256
            hasher.update((this.header.nonce).toString()).end();
            var attempt = hasher.digest("hex");
            var substToMatch = new Array(difficulty).fill(0).join("");
            // return solution if found
            if (attempt.substr(0, difficulty) === substToMatch) {
                console.log("Block mined: ".concat(this.hash));
                return;
            }
            // else, try another solution
            this.header.nonce++;
        }
    };
    Block.prototype.getBalanceOfAddress = function (address) {
        var balance = 0;
        for (var _i = 0, _a = this.transactions; _i < _a.length; _i++) {
            var transaction = _a[_i];
            if (transaction.header.fromAddress === address) {
                balance -= transaction.header.amount;
            }
            if (transaction.header.toAddress === address) {
                balance += transaction.header.amount;
            }
        }
        return balance;
    };
    // verify all transactions in the block via their merkle hash
    Block.prototype.areTransactionsValid = function () {
        return true;
    };
    return Block;
}());
exports.default = Block;
