import Transaction from "./blockchain/transaction";
import Gun from  "gun";


function getWalletBalance(walletAddress) {
  const gun = Gun(["http://localhost:5005/gun"]); // add heroku url once in prod
  const transacsRef = gun.get("transactions");

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


function createTransac(amount, signingKeyPair, senderAddress, receiverAddress) {
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
  
  return transaction
}


export { createTransac };