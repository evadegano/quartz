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
var Transaction = /** @class */ (function () {
    function Transaction(amount, fromAddress, toAddress) {
        this.header = {
            amount: amount,
            fromAddress: fromAddress,
            toAddress: toAddress,
            timestamps: Date.now()
        };
    }
    // hash transaction's header
    Transaction.prototype.getHash = function () {
        // convert object to a JSON string for hashing    
        var str = JSON.stringify(this.header);
        // hash transaction's header
        var hasher = crypto.createHash("SHA256");
        hasher.update(str).end();
        return hasher.digest("hex");
    };
    // sign transaction with the sender's private and public keys
    Transaction.prototype.signTransaction = function (walletAddress, signingKeyPair) {
        // make sure the public key matches the sender wallet's address
        if (!this.isSenderValid(signingKeyPair.publicKey, walletAddress)) {
            throw new Error("This public key doesn't belong to this wallet.");
        }
        // get transaction's hash
        this.hash = this.getHash();
        // create signature
        var signer = crypto.createSign("SHA256");
        signer.update(this.hash).end();
        var signature = signer.sign(signingKeyPair.privateKey);
        this.signature = signature;
    };
    // check whether the sender's public key belongs to their wallet address
    Transaction.prototype.isSenderValid = function (publicKey, walletAddress) {
        // hash public key
        var hasher = crypto.createHash("SHA256");
        hasher.update(publicKey).end();
        var hashedKey = hasher.digest("hex");
        if (hashedKey !== walletAddress)
            return false;
        return true;
    };
    // check whether the transaction has been signed correctly
    Transaction.prototype.isSigatureValid = function (publicKey) {
        // mining rewards
        if (this.header.fromAddress === null)
            return true;
        if (!this.signature || this.signature.length === 0) {
            return false;
        }
        // check whether the singing key pair is valid
        return true;
    };
    return Transaction;
}());
exports.default = Transaction;
