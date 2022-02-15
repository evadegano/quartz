import Transaction from "./classes/transaction";
import { RewardTransaction } from "./classes/transaction";
import Blockchain from "../blockchain/Blockchain";
import Block from "./classes/block";
import Gun from  "gun";
import SHA256 from "crypto-js/sha256";
import EC from "elliptic";
const ec  = new EC("secp256k1");
const gun = Gun(["http://localhost:5005/gun"]); // add heroku url once in prod
let transacsRef = gun.get("transactions");
let blockchainRef = gun.get(Blockchain.instance);
let ledgerRef = blockchainRef.get("ledger");
let blocksRef = ledgerRef.get("blocks");


function getWalletBalance(walletAddress) {
  let balance = 0;

  transacsRef.map().once(tx => {
    if (tx.status === "confirmed") {
      if (tx.header.fromAddress === walletAddress) {
        balance -= tx.header.amount;
      }

      if (tx.header.toAddress === walletAddress) {
        balance += tx.header.amount;
      }
    }
  })

  return balance;
}


function sendCoins(amount, signingKeyPair, senderAddress, receiverAddress) {
  // make sure this wallet has enough funds
  const walletBalance = getWalletBalance(senderAddress);
  if (walletBalance < amount) {
    throw new Error("Unsufficient funds.");
  }

  // create transaction
  const transaction = new Transaction(amount, senderAddress, receiverAddress);
  // sign transaction
  transaction.signTransaction(senderAddress, signingKeyPair);

  // add transaction to the decentralized database
  transacsRef.set(transaction);
}


function getCoins(amount, signingKeyPair, receiverAddress) {
  // create transaction
  const transaction = new Transaction(amount, receiverAddress, receiverAddress);
  // sign transaction
  transaction.signTransaction(receiverAddress, signingKeyPair);
  
  // add transaction to the decentralized database
  transacsRef.set(transaction);
}

function hashPair(a, b = a) {
  return SHA256(`${a}${b}`).toString();
}

function getMerkleRoot(transactions) {
  if (transactions.length === 1) return transactions.hash;

  
}


function processTx(transactions, minerAddress) {
  let rejectedTx = {};
  let confirmedTx = []

  // verify transactions
  transactions.map(tx => {
    // set default validity to true
    tx.isValid = true;

    // make sure wallet has enough funds
    const walletBalance = getWalletBalance(tx.header.fromAddress);
    if (walletBalance < tx.header.amount) {
      // if error, add it to the rejection object
      rejectedTx[tx.hash].push("Insufficient funds.");
      tx.isValid = false;
    }

    // check signature validity
    if (!tx.isSignatureValid()) {
      // if error, add it to the rejection object
      rejectedTx[tx.hash].push("Invalid signature.");
    }

    // check header's validity
    if (!tx.isHeaderValid()) {
      // if error, add it to the rejection object
      rejectedTx[tx.hash].push("Invalid header.");
    }
  })

  // update transactions' status
  transactions.map(tx => {
    if (tx.isValid) {
      // if transaction is valid, set status to confirmed
      gun.get(tx["_"]["#"]).put({ status: "confirmed" });
      confirmedTx.push(tx);
    } else {
      gun.get(tx["_"]["#"]).put({ status: "rejected" });
    }
  })

  // build merkle tree with confirmed transactions
  const merkleRoot = getMerkleRoot(confirmedTx);

  // get blockchain data
  const difficulty = blockchainRef.get("difficulty");
  const miningReward = blockchainRef.get("miningReward");

  // create and mine a block
  const newBlock = new Block("pevhash", merkleRoot, confirmedTx, difficulty, miningReward);
  newBlock.mine(minerAddress);

  // add block to the blockchain
  blocksRef.set(newBlock);

  // create one-time signing key pair
  const keypair = ec.genKeyPair();

  // add reward transaction to the blockchain
  const rewardTx = new RewardTransaction(miningReward, blockchainRef.miningReward, newBlock.hash);
  rewardTx.signTransaction(keypair);
  transacsRef.set(rewardTx);

  return { confirmedTx, rejectedTx, rewardTx };
}


export { getWalletBalance, sendCoins, getCoins, processTx };