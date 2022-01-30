"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var Block = /** @class */ (function () {
    function Block(prevHash, transaction) {
        this.nonce = Math.round(Math.random() * 999999999);
        this.timestamps = Date.now();
        this.prevHash = prevHash;
        this.transaction = transaction;
    }
    Object.defineProperty(Block.prototype, "hash", {
        // hash block's content
        get: function () {
            // convert object to a JSON string for hashing
            var str = JSON.stringify(this);
            // hash block
            var hasher = crypto.createHash("SHA256");
            hasher.update(str).end();
            return hasher.digest("hex");
        },
        enumerable: false,
        configurable: true
    });
    return Block;
}());
exports.default = Block;
