"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return Transaction;
}());
exports.default = Transaction;
