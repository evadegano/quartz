import Transaction from "./blockchain/transaction";
import Gun from  "gun";
const gun = Gun(["http://localhost:5005/gun"]); // add heroku url once in prod
let transacsRef = gun.get("transactions");


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

function mineBlock(transactions) {
  // see what to do in blockchain class

  
  transactions.map(tx => {
    // search for transaction in the database and update status
    gun.get(tx["_"]["#"]).put({ isConfirmed: true })
  })

  return;
}


export { getWalletBalance, sendCoins, getCoins, mineBlock };