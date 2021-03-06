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
  public amount: number;
  public fromAddress: string;
  public toAddress: string;
  public timestamps: number;
  public signature: string;
  public publicKey: string;
  public isValid: boolean = false;
  public status: Status;
  public hash: string;

  constructor(amount: number, fromAddress: string, toAddress: string, timestamps: number = new Date().getTime()) 
  {
    this.amount = amount;
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.timestamps = timestamps;
    this.status = Status.Pending;
  }

  // hash transaction's header
  getHash() {
    // convert object to a JSON string for hashing
    const header = {
      amount: this.amount,
      fromAddress: this.fromAddress,
      toAddress: this.toAddress,
      timestamps: this.timestamps
    }
    const transacHeader = JSON.stringify(header);
    
    // hash transaction's header
    return SHA256(transacHeader).toString();
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
      throw new Error("There was an error while signing your transaction.");
    }
  }
}


class RewardTransaction extends Transaction {
  public minedBlock: string;

  constructor(amount: number, toAddress: string, timestamps: number = new Date().getTime(), blockHash: string) {
    super(amount, "null - QRTZ reward", toAddress, timestamps);
    this.minedBlock = blockHash;
  }

  // hash transaction's header
  getHash() {
    // convert object to a JSON string for hashing
    const header = {
      amount: this.amount,
      fromAddress: this.fromAddress,
      toAddress: this.toAddress,
      timestamps: this.timestamps,
      minedBlock: this.minedBlock,
    }
    const transacHeader = JSON.stringify(header);
    
    // hash transaction's header
    return SHA256(transacHeader).toString();
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

  constructor(amount: number, toAddress: string, timestamps: number = new Date().getTime()) {
    super(amount, "null - bank transfer", toAddress, timestamps);
    this.isValid = true;
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