import * as crypto from "crypto";


class Transaction {
    public header: {
      amount: number,
      fromAddress: string,
      toAddress: string,
      timestamps: number
    };
    public merkleHash: string;
    public signature: Buffer;
    public isConfirmed: boolean;
    public hash: string;

  constructor(amount: number, fromAddress: string, toAddress: string,) 
  {
    this.header = {
      amount: amount,
      fromAddress: fromAddress,
      toAddress: toAddress,
      timestamps: Date.now()
    }
  }

  // hash transaction's header
  getHash() {
    // convert object to a JSON string for hashing    
    const str = JSON.stringify(this.header);
    
    // hash transaction's header
    const hasher = crypto.createHash("SHA256");
    hasher.update(str).end();
    return hasher.digest("hex");
  }

  // sign transaction with the sender's private and public keys
  signTransaction(walletAddress: string, signingKeyPair: any) {
    // make sure the public key matches the sender wallet's address
    if (!this.isSenderValid(signingKeyPair.publicKey, walletAddress)) {
      throw new Error("This public key doesn't belong to this wallet.");
    }

    // get transaction's hash
    this.hash = this.getHash();

    // create signature
    const signer = crypto.createSign("SHA256");
    signer.update(this.hash).end();

    const signature = signer.sign(signingKeyPair.privateKey);
    this.signature = signature;
  }

  // check whether the sender's public key belongs to their wallet address
  isSenderValid(publicKey: string, walletAddress: string) {
    // hash public key
    const hasher = crypto.createHash("SHA256");
    hasher.update(publicKey).end();
    const hashedKey = hasher.digest("hex");

    if (hashedKey !== walletAddress) return false;
    return true;
  }

  // check whether the transaction has been signed correctly
  isSigatureValid(publicKey: string) {
    // mining rewards
    if (this.header.fromAddress === null) return true;

    if (!this.signature || this.signature.length === 0) {
      return false;
    }

    // check whether the singing key pair is valid

    return true;
  }
}

export default Transaction;