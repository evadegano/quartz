import Wallet from "./wallet";
import Blockchain from "./blockchain";
import Transaction from "./transaction";

const blockchain = Blockchain.instance;

const satoshi = new Wallet();
const eva = new Wallet();

blockchain.addPendingTransaction(new Transaction(100, null, satoshi.address))
blockchain.minePendingTransactions(satoshi.address)

//satoshi.sendMoney(50, eva.address);

blockchain.minePendingTransactions(satoshi.address);

blockchain.ledger[1].transactions[0].header.amount = 1;

console.log(blockchain.isValid());