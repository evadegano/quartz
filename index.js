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
const crypto = __importStar(require("crypto"));
class Transaction {
    constructor(amount, payer, payee) {
        this.amount = amount;
        this.payer = payer;
        this.payee = payee;
    }
    // serialize object as string
    toString() {
        return JSON.stringify(this);
    }
}
class Block {
    constructor(prevHash, // address of previous block
    transaction, // transaction stocked in the block
    ts = Date.now() // timestamp
    ) {
        this.prevHash = prevHash;
        this.transaction = transaction;
        this.ts = ts;
        // one-time use random number
        this.nonce = Math.round(Math.random() * 999999999);
    }
    // hash block
    get hash() {
        // stringify object
        const str = JSON.stringify(this);
        // create one-way cryptographic function
        const hash = crypto.createHash("SHA256");
        // hash string
        hash.update(str).end();
        return hash.digest("hex");
    }
}
class Chain {
    constructor() {
        this.chain = [new Block(null, new Transaction(100, "genesis", "satoshi"))];
    }
    get lastBlock() {
        return this.chain[this.chain.length - 1];
    }
    // try to find number than when added to the nonce,
    // produces a hash that starts with four zeros
    // can only figure it out with brute force
    mine(nonce) {
        let solution = 1;
        console.log("⛏ mining...");
        // got digit by digit to find the requested value
        while (true) {
            // create a hash in MD5 because 128 bits so faster to compute than SHA256
            const hash = crypto.createHash("MD5");
            hash.update((nonce + solution).toString()).end();
            const attempt = hash.digest("hex");
            if (attempt.substr(0, 4) === "0000") {
                console.log(`Solved: ${solution}`);
                return solution;
            }
            solution++;
        }
    }
    addBlock(transaction, senderPublicKey, signature) {
        // create signature verification
        const verifier = crypto.createVerify("SHA256");
        verifier.update(transaction.toString());
        // verify that transaction is valid
        const isValid = verifier.verify(senderPublicKey, signature);
        if (isValid) {
            // create new block
            const newBlock = new Block(this.lastBlock.hash, transaction);
            // proof of work system
            this.mine(newBlock.nonce);
            // add block to chain
            this.chain.push(newBlock);
        }
    }
}
// singleton instance to make sure there is only one chain
Chain.instance = new Chain();
class Wallet {
    constructor() {
        const keypair = crypto.generateKeyPairSync("rsa", {
            modulusLength: 2048,
            publicKeyEncoding: { type: "spki", format: "pem" },
            privateKeyEncoding: { type: "pkcs8", format: "pem" },
        });
    }
    sendMoney(amount, payeePublicKey) {
        const transaction = new Transaction(amount, this.publicKey, payeePublicKey);
        // create a sign from transaction data
        const sign = crypto.createSign("SHA256");
        sign.update(transaction.toString()).end();
        // create one-time signature from transaction and private key
        const signature = sign.sign(this.privateKey);
        // add block to the blockchain
        Chain.instance.addBlock(transaction, this.publicKey, signature);
    }
}
// example
const satoshi = new Wallet();
const bob = new Wallet();
const alice = new Wallet();
