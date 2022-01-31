"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var blockchain_1 = require("./blockchain");
var transaction_1 = require("./transaction");
var Wallet = /** @class */ (function () {
    function Wallet() {
        // digital signature to sign and verify hash
        // used to prevent third party agents from modifying transaction
        var keypair = crypto.generateKeyPairSync("rsa", {
            modulusLength: 2048,
            publicKeyEncoding: { type: "spki", format: "pem" },
            privateKeyEncoding: { type: "pkcs8", format: "pem" },
        });
        this.publicKey = keypair.publicKey;
        this.privateKey = keypair.privateKey;
    }
    Wallet.prototype.sendMoney = function (amount, toPublicKey) {
        // create transaction
        var transaction = new transaction_1.default(amount, this.publicKey, toPublicKey);
        // sign transaction
        transaction.signTransaction(this);
        // add transaction to Ledger if valid
        if (transaction.isValid()) {
            blockchain_1.default.instance.addPendingTransaction(transaction);
        }
    };
    return Wallet;
}());
exports.default = Wallet;
