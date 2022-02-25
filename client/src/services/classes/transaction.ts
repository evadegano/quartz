import { sign } from "crypto";
import SHA256 from "crypto-js/sha256";
import EC from "elliptic";

const ec = new EC.ec('secp256k1');

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
  public signature: string;
  public publicKey: string;
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
  async signTransaction(keypair: EC.ec.KeyPair, publicKey: string, walletAddress: string) {
    // make sure the public key matches the sender wallet's address
    if (!this.isSenderValid(walletAddress, publicKey)) {
      throw new Error("This public key doesn't belong to this wallet.");
    }

    // get transaction's hash
    this.hash = this.getHash();

    // sign transaction
    const signature = keypair.sign(this.hash);

    // convert signature to der and then hex-string for storage
    const derSign = signature.toDER();
    let hexSign = "";

    for (let int of derSign) {
      let hex = int.toString(16);

      if (hex.length === 1) {
        hex = "0" + hex;
      }

      hexSign += hex;
    }

    if (hexSign.length > 0) {
      this.signature = hexSign;
      return hexSign;

    } else {      
      throw new Error("There was an error while signing your transaction.");
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

    // get keypair from public key
    const keypair = ec.keyFromPublic(this.publicKey, "hex");
    // verify signature
    const verified = keypair.verify(this.hash, this.signature);

    if (!verified) {
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
  public publicKey: string;

  constructor(amount: number, toAddress: string, blockHash: string) {
    super(amount, "null - QRTZ reward", toAddress);
    this.header.minedBlock = blockHash;
  }

  // sign transaction with the sender's private and public keys
  async signTransaction(keypair: EC.ec.KeyPair, publicKey: string) {
    // store transaction's public key
    this.publicKey = publicKey;
    
    // get transaction's hash
    this.hash = this.getHash();

    // sign transaction
    const signature = keypair.sign(this.hash);

    // convert signature to der and then hex-string for storage
    const derSign = signature.toDER();
    let hexSign = "";

    for (let int of derSign) {
      let hex = int.toString(16);

      if (hex.length === 1) {
        hex = "0" + hex;
      }

      hexSign += hex;
    }

    if (hexSign.length > 0) {
      this.signature = hexSign;
      return hexSign;

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
  async signTransaction(keypair: EC.ec.KeyPair, publicKey: string) {
    // store transaction's public key
    this.publicKey = publicKey;
    
    // get transaction's hash
    this.hash = this.getHash();

    // sign transaction
    const signature = keypair.sign(this.hash);

    // convert signature to der and then hex-string for storage
    const derSign = signature.toDER();
    let hexSign = "";

    for (let int of derSign) {
      let hex = int.toString(16);

      if (hex.length === 1) {
        hex = "0" + hex;
      }

      hexSign += hex;
    }

    if (hexSign.length > 0) {
      this.signature = hexSign;
      return hexSign;

    } else {      
      throw new Error("There was an error while signing this transaction.");
    }
  }
}


export default Transaction;
export { RewardTransaction, PurchaseTransaction };