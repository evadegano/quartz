import * as crypto from "crypto";
import Ledger from "./blockchain";
import Transaction from "./transaction";


class Wallet {
  public publicKey: string; // to send money
  public privateKey: string; // to receive money

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

  sendMoney(amount: number, toPublicKey: string) {
    // create transaction
    const transaction = new Transaction(amount, this.publicKey, toPublicKey);
    // sign transaction
    transaction.signTransaction(this);

    // add transaction to Ledger if valid
    if (transaction.isValid()) {
      Ledger.instance.addPendingTransaction(transaction);
    }
  }
}


export default Wallet;