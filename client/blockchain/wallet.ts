import * as crypto from "crypto";
import Ledger from "./ledger";
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
    const transaction = new Transaction(amount, this.publicKey, toPublicKey);

    // create signature
    const sign = crypto.createSign("SHA256");
    // sign transaction
    sign.update(transaction.toString()).end();

    // sign signature
    const signature = sign.sign(this.privateKey);
    Ledger.instance.addBlock(transaction, this.publicKey, signature);
  }
}


export default Wallet;