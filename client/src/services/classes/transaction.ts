import SHA256 from "crypto-js/sha256";
enum Status {
  Pending = "pending",
  Confirmed = "confirmed",
  Rejected = "rejected"
}

class Transaction {
  public header: {
    amount: number,
    fromAddress: string,
    toAddress: string,
    timestamps: number
  };
  public signature: Buffer;
  public isValid: boolean = false;
  public status: Status;
  public hash: string;

  constructor(amount: number, fromAddress: string, toAddress: string) 
  {
    this.header = {
      amount: amount,
      fromAddress: fromAddress,
      toAddress: toAddress,
      timestamps: Date.now()
    };
    this.status = Status.Pending;
  }

  // hash transaction's header
  getHash() {
    // convert object to a JSON string for hashing    
    const transacHeader = JSON.stringify(this.header);
    
    // hash transaction's header
    return SHA256(transacHeader).toString();
  }

  // sign transaction with the sender's private and public keys
  signTransaction(walletAddress: string, signingKeyPair: any) {
    // make sure the public key matches the sender wallet's address
    if (!this.isSenderValid(walletAddress, signingKeyPair)) {
      throw new Error("This public key doesn't belong to this wallet.");
    }

    // get transaction's hash
    this.hash = this.getHash();

    // create signature
    const signature = signingKeyPair.sign(this.hash, "base64");
    this.signature = signature.toDER("hex");
  }

  // check whether the sender's public key belongs to their wallet address
  isSenderValid(walletAddress: string, signingKeyPair: any) {
    // hash public key
    const hashedKey = SHA256(signingKeyPair.getPublic("hex")).toString()

    // compare hashed key and wallet address
    if (hashedKey !== walletAddress) return false;
    return true;
  }

  // check whether the transaction has been signed correctly
  isSigatureValid() {
    if (!this.signature || this.signature.length === 0) {
      this.isValid = false;
      return false;
    }

    this.isValid = true;
    return true;
  }

  // make sure the transaction's data hasen't been tampered with
  isHeaderValid() {
    const currentHash = this.getHash();

    if (this.hash !== currentHash) {
      this.isValid = false;
      return false;
    }

    this.isValid = true;
    return true;
  }
}


class RewardTransaction extends Transaction {
  public header: {
    amount: number,
    fromAddress: string,
    toAddress: string,
    minedBlock: string,
    timestamps: number
  };

  constructor(amount: number, toAddress: string, blockHash: string) {
    super(amount, "null - QRTZ reward", toAddress);
    this.header.minedBlock = blockHash;
  }

  // sign transaction with the sender's private and public keys
  signTransaction(signingKeyPair: any) {
    // get transaction's hash
    this.hash = this.getHash();

    // create signature
    const signature = signingKeyPair.sign(this.hash, "base64");
    this.signature = signature.toDER("hex");
  }
}


class PurchaseTransaction extends Transaction {
  public header: {
    amount: number,
    fromAddress: string,
    toAddress: string,
    timestamps: number
  };

  constructor(amount: number, toAddress: string) {
    super(amount, "null - bank transfer", toAddress);
  }

  // sign transaction with the sender's private and public keys
  signTransaction(signingKeyPair: any) {
    // get transaction's hash
    this.hash = this.getHash();

    // create signature
    const signature = signingKeyPair.sign(this.hash, "base64");
    this.signature = signature.toDER("hex");

    // update transaction's status
    this.isValid = true;
    this.status = Status.Confirmed;
  }
}


export default Transaction;
export { RewardTransaction, PurchaseTransaction };