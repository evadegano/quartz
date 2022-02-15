import Transaction from "./classes/transaction";
import Block from "./classes/block";
import Gun from  "gun";
const gun = Gun(["http://localhost:5005/gun"]); // add heroku url once in prod
let transacsRef = gun.get("transactions");
let ledgerRef = gun.get("ledger");
let blocksRef = gun.get("blocks");


function getWalletBalance(walletAddress) {
  let balance = 0;

  transacsRef.map().once(transac => {
    if (transac.isValid && transac.isConfirmed) {
      if (transac.header.fromAddress === walletAddress) {
        balance -= transac.header.amount;
      }

      if (transac.header.toAddress === walletAddress) {
        balance += transac.header.amount;
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

  // verify signature validity
  if (!transaction.isSigatureValid(signingKeyPair.publicKey)) {
    throw new Error("Invalid transaction.");
  }

  // add transaction to the decentralized database
  transacsRef.set(transaction);
}


function getCoins(amount, signingKeyPair, receiverAddress) {
  // create transaction
  const transaction = new Transaction(amount, receiverAddress, receiverAddress);
  // sign transaction
  transaction.signTransaction(receiverAddress, signingKeyPair);

  // verify signature validity
  if (!transaction.isSigatureValid(signingKeyPair.publicKey)) {
    throw new Error("Invalid transaction.");
  }
  
  // add transaction to the decentralized database
  transacsRef.set(transaction);
}


function getMerkleHash(transactions) {
  return;
}


function mineBlock(transactions, miningRewardAddress) {
  // verify transactions

  // confirm transactions
  transactions.map(tx => {
    // update those transactions' status as confirmed
    return gun.get(tx["_"]["#"]).put({ isConfirmed: true })
  })

  // build merkle tree
  const merkleTree = getMerkleHash(transactions);

  // create and mine a block

  // verify block

  // add block to the blockchain

  // send reward to the miner

  return;
}


export { getWalletBalance, sendCoins, getCoins, mineBlock };