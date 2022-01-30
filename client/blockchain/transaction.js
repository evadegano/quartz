"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var Transaction = /** @class */ (function () {
    function Transaction(amount, fromPublicKey, toPublicKey) {
        this.amount = amount;
        this.fromPublicKey = fromPublicKey;
        this.toPublicKey = toPublicKey;
    }
    // convert object to a JSON string for hashing
    Transaction.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Transaction.prototype.isValid = function (signature) {
        // create transaction verifier
        var verifier = crypto.createVerify("SHA256");
        verifier.update(this.toString());
        // verify that address and signature are valid
        var isValid = verifier.verify(this.fromPublicKey, signature);
        if (isValid) {
            return true;
        }
        return false;
    };
    return Transaction;
}());
exports.default = Transaction;
