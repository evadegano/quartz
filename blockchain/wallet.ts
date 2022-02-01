import * as crypto from "crypto";
import Blockchain from "./blockchain";
import Transaction from "./transaction";


class Wallet {
  public publicKey: string; // to send money
  public privateKey: string; // to receive money
  public balance: number;

  constructor() {
    // digital signature to sign and verify hash
    // used to prevent third party agents from modifying transaction
    const keypair = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem"},
      privateKeyEncoding: { type: "pkcs8", format: "pem"},
    });

    this.publicKey = keypair.publicKey;
    this.privateKey = keypair.privateKey;
  }

  updateBalance() {
    this.balance = Blockchain.instance.getTotalBalanceOfAddress(this.publicKey);
  }

  sendMoney(amount: number, toPublicKey: string) {
    // update balance
    this.updateBalance();

    // make sure the wallet has enough funds
    if (amount > this.balance) {
      throw new Error("Not enough funds.");
    }

    // create transaction
    const transaction = new Transaction(amount, this.publicKey, toPublicKey);
    // sign transaction
    transaction.signTransaction(this);

    // add transaction to Ledger if valid
    if (transaction.isValid()) {
      Blockchain.instance.addPendingTransaction(transaction);
    }
  }
}


export default Wallet;