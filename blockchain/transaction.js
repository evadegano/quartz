"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var Transaction = /** @class */ (function () {
    function Transaction(amount, fromPublicKey, toPublicKey) {
        this.timestamps = Date.now();
        this.amount = amount;
        this.fromPublicKey = fromPublicKey;
        this.toPublicKey = toPublicKey;
    }
    // hash transaction's content
    Transaction.prototype.getHash = function () {
        // convert object to a JSON string for hashing
        var transacData = [this.amount, this.fromPublicKey, this.toPublicKey, this.timestamps, this.signature];
        var str = JSON.stringify(transacData);
        // hash block
        var hasher = crypto.createHash("SHA256");
        hasher.update(str).end();
        return hasher.digest("hex");
    };
    Transaction.prototype.signTransaction = function (wallet) {
        // make sure that the wallet is valid
        if (wallet.publicKey !== this.fromPublicKey) {
            throw new Error("You cannot sign transactions from other wallets.");
        }
        // create signature
        var sign = crypto.createSign("SHA256");
        // sign transaction
        sign.update(JSON.stringify(this)).end();
        var signature = sign.sign(wallet.privateKey);
        this.signature = signature;
        this.hash = this.getHash();
    };
    Transaction.prototype.isValid = function () {
        var transacData = {
            timestamps: this.timestamps,
            amount: this.amount,
            fromPublicKey: this.fromPublicKey,
            toPublicKey: this.toPublicKey,
        };
        // create transaction verifier
        var verifier = crypto.createVerify("SHA256");
        verifier.update(JSON.stringify(transacData));
        // verify that address and signature are valid
        var isValid = verifier.verify(this.fromPublicKey, this.signature);
        if (isValid) {
            return true;
        }
        return false;
    };
    return Transaction;
}());
exports.default = Transaction;
