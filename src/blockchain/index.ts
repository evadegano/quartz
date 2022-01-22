import * as crypto from "crypto";

class Transaction {
  constructor(
    public amount: number,
    public payer: string,
    public payee: string
  ) {}

  // serialize object as string
  toString() {
    return JSON.stringify(this);
  }
}

class Block {
  // one-time use random number
  public nonce = Math.round(Math.random() * 999999999);
  
  constructor(
    public prevHash: string, // address of previous block
    public transaction: Transaction, // transaction stocked in the block
    public ts = Date.now() // timestamp
  ) {}

  // hash block
  get hash() {
    // stringify object
    const str = JSON.stringify(this);
    
    // create one-way cryptographic function
    const hash = crypto.createHash("SHA256");
    
    // hash string
    hash.update(str).end();

    return hash.digest("hex");
  }
}

class Chain {
  // singleton instance to make sure there is only one chain
  public static instance = new Chain(); 

  chain: Block[];

  constructor() {
    this.chain = [new Block(null, new Transaction(100, "genesis", "satoshi"))];
  }

  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  // try to find number than when added to the nonce,
  // produces a hash that starts with four zeros
  // can only figure it out with brute force
  mine(nonce: number) {
    let solution = 1;
    console.log("⛏ mining...");

    // got digit by digit to find the requested value
    while(true) {
      // create a hash in MD5 because 128 bits so faster to compute than SHA256
      const hash = crypto.createHash("MD5");
      hash.update((nonce + solution).toString()).end();

      const attempt = hash.digest("hex");

      if (attempt.substr(0, 4) === "0000") {
        console.log(`Solved: ${solution}`);

        return solution;
      }

      solution ++;
    }
  }

  addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer) {
    // create signature verification
    const verifier = crypto.createVerify("SHA256");
    verifier.update(transaction.toString());

    // verify that transaction is valid
    const isValid = verifier.verify(senderPublicKey, signature);

    if (isValid) {
      // create new block
      const newBlock = new Block(this.lastBlock.hash, transaction);
      // proof of work system
      this.mine(newBlock.nonce);
      // add block to chain
      this.chain.push(newBlock);
    }
  }
}

class Wallet {
  public publicKey: string;
  public privateKey: string;

  constructor() {
    const keypair = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem"},
      privateKeyEncoding: { type: "pkcs8", format: "pem"},
    });
  }

  sendMoney(amount: number, payeePublicKey: string) {
    const transaction = new Transaction(amount, this.publicKey, payeePublicKey);
    
    // create a sign from transaction data
    const sign = crypto.createSign("SHA256");
    sign.update(transaction.toString()).end();
    
    // create one-time signature from transaction and private key
    const signature = sign.sign(this.privateKey);
    
    // add block to the blockchain
    Chain.instance.addBlock(transaction, this.publicKey, signature);
  }
}


// example
const satoshi = new Wallet();
const bob = new Wallet();
const alice = new Wallet();