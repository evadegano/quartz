"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var wallet_1 = __importDefault(require("./wallet"));
var blockchain_1 = __importDefault(require("./blockchain"));
var transaction_1 = __importDefault(require("./transaction"));
var blockchain = blockchain_1.default.instance;
var satoshi = new wallet_1.default();
var eva = new wallet_1.default();
blockchain.addPendingTransaction(new transaction_1.default(100, null, satoshi.address));
blockchain.minePendingTransactions(satoshi.address);
//satoshi.sendMoney(50, eva.address);
blockchain.minePendingTransactions(satoshi.address);
blockchain.ledger[1].transactions[0].header.amount = 1;
console.log(blockchain.isValid());
