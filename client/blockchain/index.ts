import Wallet from "./wallet";
import Blockchain from "./blockchain";

const blockchain = Blockchain.instance;

const satoshi = new Wallet();
const eva = new Wallet();

satoshi.sendMoney(50, eva.publicKey);

console.log(Blockchain)

blockchain.minePendingTransactions(satoshi.publicKey);

console.log(blockchain.getTotalBalanceOfAddress(satoshi.publicKey));