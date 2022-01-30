import Wallet from "./wallet";
import Ledger from "./ledger";


const satoshi = new Wallet();
const eva = new Wallet();

satoshi.sendMoney(50, eva.publicKey);

console.log(Ledger.instance);