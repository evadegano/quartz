import SHA256 from "crypto-js/sha256";

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
  public signature: ArrayBuffer;
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
  async signTransaction(walletAddress: string, publicKey: CryptoKey, privateKey: CryptoKey) {
    // make sure the public key matches the sender wallet's address
    if (!this.isSenderValid(walletAddress, publicKey)) {
      throw new Error("This public key doesn't belong to this wallet.");
    }

    // get transaction's hash
    this.hash = this.getHash();

    // encode hash
    let enc = new TextEncoder();
    let encodedTx = enc.encode(this.hash);

    // create signature
    const signature = await window.crypto.subtle.sign(
      {
        name: "ECDSA",
        hash: {name: "SHA-384"},
      },
      privateKey,
      encodedTx
    );

    this.signature = signature;
  }

  // check whether the sender's public key belongs to their wallet address
  isSenderValid(walletAddress: string, publicKey: CryptoKey) {
    // hash public key
    const hashedKey = SHA256(publicKey.toString()).toString()

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
  public publicKey: CryptoKey;

  constructor(amount: number, toAddress: string, blockHash: string) {
    super(amount, "null - QRTZ reward", toAddress);
    this.header.minedBlock = blockHash;
  }

  // sign transaction with the sender's private and public keys
  async signTransaction(publicKey: CryptoKey, privateKey: CryptoKey) {
    // store transaction's public key
    this.publicKey = publicKey;
    
    // get transaction's hash
    this.hash = this.getHash();

    // encode hash
    let enc = new TextEncoder();
    let encodedTx = enc.encode(this.hash);

    // create signature
    const signature = await window.crypto.subtle.sign(
      {
        name: "ECDSA",
        hash: {name: "SHA-384"},
      },
      privateKey,
      encodedTx
    );

    this.signature = signature;
  }
}


class PurchaseTransaction extends Transaction {
  public header: {
    amount: number,
    fromAddress: string,
    toAddress: string,
    timestamps: number
  }
  public publicKey: CryptoKey;

  constructor(amount: number, toAddress: string) {
    super(amount, "null - bank transfer", toAddress);
  }

  // sign transaction with the sender's private and public keys
  async signTransaction(publicKey: CryptoKey, privateKey: CryptoKey) {
    // store transaction's public key
    this.publicKey = publicKey;
    
    // get transaction's hash
    this.hash = this.getHash();

    // encode hash
    let enc = new TextEncoder();
    let encodedTx = enc.encode(this.hash);

    // create signature
    const signature = await window.crypto.subtle.sign(
      {
        name: "ECDSA",
        hash: {name: "SHA-384"},
      },
      privateKey,
      encodedTx
    );

    this.signature = signature;
  }
}


export default Transaction;
export { RewardTransaction, PurchaseTransaction };