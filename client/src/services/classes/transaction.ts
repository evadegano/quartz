import SHA256 from "crypto-js/sha256";
import EC from "elliptic";

// list of possible transaction's status
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
  public signature: EC.ec.Signature;
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
  async signTransaction(keypair: EC.ec.KeyPair, publicKey: string, privateKey: string, walletAddress: string) {
    // make sure the public key matches the sender wallet's address
    if (!this.isSenderValid(walletAddress, publicKey)) {
      throw new Error("This public key doesn't belong to this wallet.");
    }

    // get transaction's hash
    this.hash = this.getHash();

    const signature = keypair.sign(this.hash);

    if (signature) {
      this.signature = signature;
      return signature;
    } else {      
      throw new Error("There was an error while signing this transaction.");
    }
  }

  // check whether the sender's public key belongs to their wallet address
  isSenderValid(walletAddress: string, publicKey: string) {
    // hash public key
    const hashedKey = SHA256(publicKey).toString()

    // compare hashed key and wallet address
    if (hashedKey !== walletAddress) return false;
    return true;
  }

  // check whether the transaction has been signed correctly
  isSigatureValid() {
    if (!this.signature) {
      this.isValid = false;
      return false;
    }

    // add verification via public key, then add to blockchain-service

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
  public publicKey: string;

  constructor(amount: number, toAddress: string, blockHash: string) {
    super(amount, "null - QRTZ reward", toAddress);
    this.header.minedBlock = blockHash;
  }

  // sign transaction with the sender's private and public keys
  async signTransaction(keypair: EC.ec.KeyPair, publicKey: string, privateKey: string, walletAddress: string = "null - QRTZ reward") {
    // store transaction's public key
    this.publicKey = publicKey;
    
    // get transaction's hash
    this.hash = this.getHash();

    const signature = keypair.sign(this.hash);

    if (signature) {
      this.signature = signature;
      return signature;
    } else {
      throw new Error("There was an error while signing this transaction.");
    }
  }
}


class PurchaseTransaction extends Transaction {
  public header: {
    amount: number,
    fromAddress: string,
    toAddress: string,
    timestamps: number
  }
  public publicKey: string;

  constructor(amount: number, toAddress: string) {
    super(amount, "null - bank transfer", toAddress);
    this.isValid = true;
    this.status = Status.Confirmed;
  }

  // sign transaction with the sender's private and public keys
  async signTransaction(keypair: EC.ec.KeyPair, publicKey: string, privateKey: string, walletAddress: string = "null - bank transfer") {
    // store transaction's public key
    this.publicKey = publicKey;
    
    // get transaction's hash
    this.hash = this.getHash();

    const signature = keypair.sign(this.hash);

    if (signature) {
      this.signature = signature;
      return signature;
    } else {      
      throw new Error("There was an error while signing this transaction.");
    }
  }
}


export default Transaction;
export { RewardTransaction, PurchaseTransaction };