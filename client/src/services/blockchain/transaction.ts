import * as crypto from "crypto";
import Wallet from "./wallet";
import TransactionOutput from "./transactionOutput";
import TransactionInput from "./transactionInput";


class Transaction {
    public header: {
      inputCounter: number,
      outputCounter: number,
      merkleHash: string,
      timestamps: number
    };
    public TransactionOutput: [TransactionOutput];
    public TransactionInput: [TransactionInput];
    public hash: string;

  constructor(amount: number, fromPublicKey: string, toPublicKey: string,) 
  {
    this.amount = amount;
    this.fromPublicKey = fromPublicKey;
    this.toPublicKey = toPublicKey;
    this.status = "Sent";
  }

  // hash transaction's content
  getHash() {
    // convert object to a JSON string for hashing    
    const str = JSON.stringify(this.header);

    // hash block
    const hasher = crypto.createHash("SHA256");
    hasher.update(str).end();

    return hasher.digest("hex");
  }

  signTransaction(wallet: Wallet) {
    // make sure that the wallet is valid
    if (wallet.publicKey !== this.fromPublicKey) {
      throw new Error("You cannot sign transactions from other wallets.");
    }

    // create signature
    const sign = crypto.createSign("SHA256");
    // sign transaction
    sign.update(JSON.stringify(this)).end();
    const signature = sign.sign(wallet.privateKey);

    this.signature = signature;
    this.hash = this.getHash();
  }

  isValid() {
    const transacData = {
      timestamps: this.timestamps,
      amount: this.amount, 
      fromPublicKey: this.fromPublicKey,
      toPublicKey: this.toPublicKey,
    };

    // create transaction verifier
    const verifier = crypto.createVerify("SHA256");
    verifier.update(JSON.stringify(transacData));
    // verify that address and signature are valid
    const isValid = verifier.verify(this.fromPublicKey, this.signature);

    if (isValid) {
      return true;
    }

    return false;
  }
}

export default Transaction;