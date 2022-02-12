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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = __importStar(require("crypto"));
var blockchain_1 = __importDefault(require("./blockchain"));
var transaction_1 = __importDefault(require("./transaction"));
var Wallet = /** @class */ (function () {
    function Wallet() {
        this.address = this.genAddress();
        this.creationDate = Date.now();
        this.lastActive = Date.now();
    }
    Wallet.prototype.genSigningKeys = function () {
        // digital signature to sign and verify hash
        // used to prevent third party agents from modifying transaction
        var keypair = crypto.generateKeyPairSync("rsa", {
            modulusLength: 2048,
            publicKeyEncoding: { type: "spki", format: "pem" },
            privateKeyEncoding: { type: "pkcs8", format: "pem" },
        });
        return keypair;
    };
    Wallet.prototype.genAddress = function () {
        // convert object to a JSON string for hashing
        var publicKey = this.genSigningKeys().publicKey;
        // hash public key
        var hasher = crypto.createHash("SHA256");
        hasher.update(publicKey).end();
        return hasher.digest("hex");
    };
    Wallet.prototype.updateBalance = function () {
        this.balance = blockchain_1.default.instance.getTotalBalanceOfAddress(this.address);
    };
    Wallet.prototype.sendMoney = function (amount, signingKeyPair, receiverAddress) {
        // update balance
        this.updateBalance();
        // make sure the wallet has enough funds
        if (amount > this.balance) {
            throw new Error("Not enough funds.");
        }
        // create transaction
        var transaction = new transaction_1.default(amount, this.address, receiverAddress);
        // sign transaction
        transaction.signTransaction(this.address, signingKeyPair);
        // add transaction to Ledger if valid
        if (!transaction.isSigatureValid(signingKeyPair.publicKey)) {
            throw new Error("Invalid transaction.");
        }
        // else, add transaction to the blockchain
        blockchain_1.default.instance.addPendingTransaction(transaction);
    };
    return Wallet;
}());
exports.default = Wallet;
