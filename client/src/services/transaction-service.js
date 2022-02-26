// packages
import Gun from  "gun";
import EC from "elliptic";

// helper functions
import { getWalletBalance, getMerkleRoot, verifySignature, verifyHeader } from "./helpers";

// classes
import Transaction from "./classes/transaction";
import { RewardTransaction, PurchaseTransaction } from "./classes/transaction";
import Block from "./classes/block";

// init variables
const ec = new EC.ec('secp256k1');


/*
  Create transactions between wallets
*/
async function sendCoins(gun, amount, keypair, publicKey, senderAddress, receiverAddress, timestamps) {
  // set pointer to transactions on gun
  const transacsRef = gun.get("transactions");

  // make sure this wallet has enough funds
  const walletBalance = getWalletBalance(transacsRef, senderAddress);

  console.log("balance =>", walletBalance);

  if (walletBalance < amount) {
    throw new Error("Insufficient funds.");
  }

  // create transaction
  const transaction = new Transaction(amount, senderAddress, receiverAddress, timestamps);
  console.log("transaction =>", transaction);
  // sign transaction
  await transaction.signTransaction(keypair, publicKey, senderAddress);

  // store transaction's hash as its id
  const txId = transaction.hash;

  // add transaction to db
  const newTx = gun.get(`${txId}`).put(transaction);
  // link transaction to the transactions ledger
  transacsRef.set(newTx);
}


/*
  Create a transaction when a user tops up their wallet
*/
async function createPurchaseTx(gun, amount, receiverAddress, keypair, publicKey, timestamps) {
  // set pointer to transactions on gun
  const transacsRef = gun.get("transactions");

  // create transaction
  const transaction = new PurchaseTransaction(amount, receiverAddress, timestamps);
  // sign transaction
  await transaction.signTransaction(keypair, publicKey);

  // store transaction's hash as its id
  const txId = transaction.hash;
  
  // add transaction to db
  const newTx = gun.get(`${txId}`).put(transaction);
  // link transaction to the transactions ledger
  transacsRef.set(newTx);
}


/*
  Verify transactions and mine them into a block
*/
async function processTx(gun, blockchainRef, blocksRef, transactions, minerAddress, timestamps) {
  let rejectedTx = {};
  let confirmedTx = []

  // verify transactions
  for (let tx of transactions) {
    // set default validity to true
    tx.isValid = true;

    // make sure wallet has enough funds (ignore rewards and bank transfers)
    if (tx.fromAddress !== "null - bank transfer" && tx.fromAddress !== "null - QRTZ reward") {
      const walletBalance = getWalletBalance(tx.fromAddress);
      
      if (walletBalance < tx.amount) {
        // if error, add it to the rejection object
        rejectedTx[tx.hash] ? rejectedTx[tx.hash].push("Insufficient funds.") : rejectedTx[tx.hash] = ["Insufficient funds."];
        tx.isValid = false;
      }
    }
    
    // check signature validity
    if (!verifySignature(tx)) {
      // if error, add it to the rejection object
      rejectedTx[tx.hash] ? rejectedTx[tx.hash].push("Invalid signature.") : rejectedTx[tx.hash] = ["Invalid signature."];
      tx.isValid = false;
    }

    // check header's validity
    if (!verifyHeader(tx)) {
      // if error, add it to the rejection object
      rejectedTx[tx.hash] ? rejectedTx[tx.hash].push("Invalid header.") : rejectedTx[tx.hash] = ["Invalid header."];
      tx.isValid = false;
    }

    // add valid transactions to the confirmed tx list
    if (tx.isValid) {
      confirmedTx.push(tx);
    }
  }

  // build merkle tree with confirmed transactions
  const confirmedTxHashes = confirmedTx.map(tx => tx.hash);
  const merkleRoot = getMerkleRoot(confirmedTxHashes);

  // get blockchain data
  const difficulty = blockchainRef.get("difficulty");
  const miningReward = blockchainRef.get("miningReward");
  const prevBlockHash = blockchainRef.get("lastBlock");

  if (difficulty) {
    console.log("difficulty", difficulty);
    console.log("miningReward", miningReward);
    console.log("prevBlockHash", prevBlockHash);
    return;
  }

  if (!difficulty) return "error: get blockchain data" // is this working?

  // create and mine a block
  const newBlock = new Block(prevBlockHash, merkleRoot, confirmedTx, difficulty, miningReward, timestamps);
  newBlock.mine(minerAddress);

  // if first one to mine, add block to the blockchain
  if (!blocksRef.get(newBlock)) {
    // update transactions' status
    for (let tx of transactions) {
      if (tx.isValid) {
        // if transaction is valid, set status to confirmed
        gun.get(`${tx.hash}`).put({ status: "confirmed" });
      } else {
        gun.get(`${tx.hash}`).put({ status: "rejected" });
      }
    }

    // add new block to the blockchain
    blocksRef.set(newBlock);

    // generate a one-time signing keypair
    const keypair = ec.genKeyPair();
    const publicKey = keypair.getPublic("hex");

    // create new transaction
    const rewardTx = new RewardTransaction(miningReward, minerAddress, timestamps, newBlock.hash);
    await rewardTx.signTransaction(keypair, publicKey);
    
    // store transaction's hash as its id
    const txId = rewardTx.hash;

    // add transaction to db
    const newTx = gun.get(`${txId}`).put(rewardTx);
    // set pointer to transactions on gun
    const transacsRef = gun.get("transactions");
    // link transaction to the transactions ledger
    transacsRef.set(newTx);

    return { confirmedTx, rejectedTx, rewardTx };
  }

  // throw error if block has already been mined by someone else
  throw new Error("Pending transactions have been validated by someone else.");
}


export { sendCoins, createPurchaseTx, processTx };