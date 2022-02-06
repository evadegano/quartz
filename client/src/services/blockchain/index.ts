import Wallet from "./wallet";
import Blockchain from "./blockchain";
import Transaction from "./transaction";

const blockchain = Blockchain.instance;

const satoshi = new Wallet();
const eva = new Wallet();

blockchain.addPendingTransaction(new Transaction(100, null, satoshi.publicKey))
blockchain.minePendingTransactions(satoshi.publicKey)

satoshi.sendMoney(50, eva.publicKey);

blockchain.minePendingTransactions(satoshi.publicKey);

blockchain.ledger[1].transactions[0].amount = 1;

console.log(blockchain.isValid());