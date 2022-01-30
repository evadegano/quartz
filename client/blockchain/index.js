"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wallet_1 = require("./wallet");
var ledger_1 = require("./ledger");
var satoshi = new wallet_1.default();
var eva = new wallet_1.default();
satoshi.sendMoney(50, eva.publicKey);
console.log(ledger_1.default.instance);
