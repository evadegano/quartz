"use strict";
exports.__esModule = true;
var crypto = require("crypto");
var Transaction = /** @class */ (function () {
    function Transaction(amount, payer, payee) {
        this.amount = amount;
        this.payer = payer;
        this.payee = payee;
    }
    // serialize object as string
    Transaction.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return Transaction;
}());
var Block = /** @class */ (function () {
    function Block(prevHash, // address of previous block
    transaction, // transaction stocked in the block
    ts // timestamp
    ) {
        if (ts === void 0) { ts = Date.now(); }
        this.prevHash = prevHash;
        this.transaction = transaction;
        this.ts = ts;
        // one-time use random number
        this.nonce = Math.round(Math.random() * 999999999);
    }
    Object.defineProperty(Block.prototype, "hash", {
        // hash block
        get: function () {
            // stringify object
            var str = JSON.stringify(this);
            // create one-way cryptographic function
            var hash = crypto.createHash("SHA256");
            // hash string
            hash.update(str).end();
            return hash.digest("hex");
        },
        enumerable: false,
        configurable: true
    });
    return Block;
}());
var Chain = /** @class */ (function () {
    function Chain() {
        this.chain = [new Block(null, new Transaction(100, "genesis", "satoshi"))];
    }
    Object.defineProperty(Chain.prototype, "lastBlock", {
        get: function () {
            return this.chain[this.chain.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    // try to find number than when added to the nonce,
    // produces a hash that starts with four zeros
    // can only figure it out with brute force
    Chain.prototype.mine = function (nonce) {
        var solution = 1;
        console.log("⛏ mining...");
        // got digit by digit to find the requested value
        while (true) {
            // create a hash in MD5 because 128 bits so faster to compute than SHA256
            var hash = crypto.createHash("MD5");
            hash.update((nonce + solution).toString()).end();
            var attempt = hash.digest("hex");
            if (attempt.substr(0, 4) === "0000") {
                console.log("Solved: ".concat(solution));
                return solution;
            }
            solution++;
        }
    };
    Chain.prototype.addBlock = function (transaction, senderPublicKey, signature) {
        // create signature verification
        var verifier = crypto.createVerify("SHA256");
        verifier.update(transaction.toString());
        // verify that transaction is valid
        var isValid = verifier.verify(senderPublicKey, signature);
        if (isValid) {
            // create new block
            var newBlock = new Block(this.lastBlock.hash, transaction);
            // proof of work system
            this.mine(newBlock.nonce);
            // add block to chain
            this.chain.push(newBlock);
        }
    };
    // singleton instance to make sure there is only one chain
    Chain.instance = new Chain();
    return Chain;
}());
var Wallet = /** @class */ (function () {
    function Wallet() {
        var keypair = crypto.generateKeyPairSync("rsa", {
            modulusLength: 2048,
            publicKeyEncoding: { type: "spki", format: "pem" },
            privateKeyEncoding: { type: "pkcs8", format: "pem" }
        });
    }
    Wallet.prototype.sendMoney = function (amount, payeePublicKey) {
        var transaction = new Transaction(amount, this.publicKey, payeePublicKey);
        // create a sign from transaction data
        var sign = crypto.createSign("SHA256");
        sign.update(transaction.toString()).end();
        // create one-time signature from transaction and private key
        var signature = sign.sign(this.privateKey);
        // add block to the blockchain
        Chain.instance.addBlock(transaction, this.publicKey, signature);
    };
    return Wallet;
}());
// example
var satoshi = new Wallet();
var bob = new Wallet();
var alice = new Wallet();
