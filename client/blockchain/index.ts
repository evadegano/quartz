import Wallet from "./wallet";
import Blockchain from "./blockchain";

const blockchain = Blockchain.instance;

const satoshi = new Wallet();
const eva = new Wallet();

satoshi.sendMoney(50, eva.publicKey);

blockchain.minePendingTransactions(satoshi.publicKey);

blockchain.ledger[1].transactions[0].amount = 1;

console.log(blockchain.isValid());