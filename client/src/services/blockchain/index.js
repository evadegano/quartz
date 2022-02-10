"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wallet_1 = require("./wallet");
var blockchain_1 = require("./blockchain");
var transaction_1 = require("./transaction");
var blockchain = blockchain_1.default.instance;
var satoshi = new wallet_1.default();
var eva = new wallet_1.default();
blockchain.addPendingTransaction(new transaction_1.default(100, null, satoshi.publicKey));
blockchain.minePendingTransactions(satoshi.publicKey);
satoshi.sendMoney(50, eva.publicKey);
blockchain.minePendingTransactions(satoshi.publicKey);
blockchain.ledger[1].transactions[0].amount = 1;
console.log(blockchain.isValid());