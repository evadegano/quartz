import * as crypto from "crypto";

class Transaction {
    public amount: number;
    public fromPublicKey: string;
    public toPublicKey: string;

  constructor(amount: number, fromPublicKey: string, toPublicKey: string,) 
  {
    this.amount = amount;
    this.fromPublicKey = fromPublicKey;
    this.toPublicKey = toPublicKey;
  }

  // convert object to a JSON string for hashing
  toString() {
    return JSON.stringify(this);
  }

  isValid(signature: Buffer) {
    // create transaction verifier
    const verifier = crypto.createVerify("SHA256");
    verifier.update(this.toString());
    // verify that address and signature are valid
    const isValid = verifier.verify(this.fromPublicKey, signature);

    if (isValid) {
      return true;
    }

    return false;
  }
}

export default Transaction;