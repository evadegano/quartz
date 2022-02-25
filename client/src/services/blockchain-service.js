import Transaction from "./classes/transaction";
import { RewardTransaction, PurchaseTransaction } from "./classes/transaction";
import Blockchain from "./classes/blockchain";
import Block from "./classes/block";
import Gun from  "gun";
import SHA256 from "crypto-js/sha256";
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


function sendCoins(amount, publicKey, privateKey, senderAddress, receiverAddress) {
  // make sure this wallet has enough funds
  const walletBalance = getWalletBalance(senderAddress);

  if (walletBalance < amount) {
    throw new Error("Insufficient funds.");
  }

  // create transaction
  const transaction = new Transaction(amount, senderAddress, receiverAddress);
  // sign transaction
  transaction.signTransaction(senderAddress, publicKey, privateKey);

  // add transaction to the decentralized database
  transacsRef.set(transaction);
}

// adapt data format for GunJS
// function taken from: https://github.com/amark/gun/issues/231
function array2object(arr) {
  var obj = {};

  Gun.list.map(arr, function(v,f,t) {

    if (Gun.list.is(v) || Gun.obj.is(v)) {

      obj[f] = array2object(v);
      return;
    }
    obj[f] = v;
  });

  return obj;
}


async function createPurchaseTx(amount, receiverAddress, keypair, publicKey) {
  // create transaction
  const transaction = new PurchaseTransaction(amount, receiverAddress);

  // sign transaction
  await transaction.signTransaction(keypair, publicKey);

  // store transaction's hash as its id
  const txId = transaction.hash;
  // turn transaction into an object to git in GunJS
  const objTx = array2object(transaction);

  console.log("newTransac", transaction);
  
  // add transaction to db
  const newTx = gun.get(`${txId}`).put(objTx);
  // add transaction's header to db
  newTx.get("header").put(transaction.header);
  // link transaction to the transactions ledger
  transacsRef.set(newTx);
}


// hash values from an array in pair
function hashInPair(hashArray, output = []) {
  // if only one element left, hash it with itself and return result
  if (hashArray.length === 1) {
    const hash = SHA256(`${hashArray[0]}${hashArray[0]}`).toString();
    output.push(hash);

    return output;
  }

  // if two elements left, hash them and return result
  if (hashArray.length === 2) {
    const hash = SHA256(`${hashArray[0]}${hashArray[1]}`).toString();
    output.push(hash);

    return output;
  }

  // else hash elmements and move on to the next
  const hash = SHA256(`${hashArray[0]}${hashArray[1]}`).toString();
  output.push(hash);

  return hashInPair(hashArray.slice(2), output);
}


// get the Merkle root of a tree of data
function getMerkleRoot(txHashes) {
  const merkleRoot = hashInPair(txHashes);

  if (merkleRoot.length === 1) {
    return merkleRoot[0];
  }

  return getMerkleRoot(merkleRoot);
}


function processTx(transactions, minerAddress) {
  let rejectedTx = {};
  let confirmedTx = []

  // verify transactions
  for (let tx in transactions) {
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
      tx.isValid = false;
    }

    // check header's validity
    if (!tx.isHeaderValid()) {
      // if error, add it to the rejection object
      rejectedTx[tx.hash].push("Invalid header.");
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
  const prevBlockHash = blockchainRef.getLastBlockHash();

  // create and mine a block
  const newBlock = new Block(prevBlockHash, merkleRoot, confirmedTx, difficulty, miningReward);
  newBlock.mine(minerAddress);

  // if first one to mine, add block to the blockchain
  if (!blocksRef.get(newBlock)) {
    // update transactions' status
    for (let tx in transactions) {
      if (tx.isValid) {
        // if transaction is valid, set status to confirmed
        gun.get(tx["_"]["#"]).put({ status: "confirmed" });
      } else {
        gun.get(tx["_"]["#"]).put({ status: "rejected" });
      }
    }

    // add new block to the blockchain
    blocksRef.set(newBlock);

    // create one-time signing key pair
    window.crypto.subtle.generateKey(
      {
        name: "ECDSA",
        namedCurve: "P-384"
      },
      true,
      ["sign", "verify"]
      )
      .then((keyPair) => {
        const publicKey = keyPair.publicKey;
        const privateKey = keyPair.privateKey;

        // add reward transaction to the blockchain
        const rewardTx = new RewardTransaction(miningReward, minerAddress, newBlock.hash);
        rewardTx.signTransaction(publicKey, privateKey);
        transacsRef.set(rewardTx);

        return { confirmedTx, rejectedTx, rewardTx };
      });
  }

  throw new Error("Pending transactions have been validated by someone else.");
}


export { getWalletBalance, sendCoins, createPurchaseTx, processTx };