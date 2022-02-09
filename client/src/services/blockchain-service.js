import axios from "axios";

const service = axios.create({
  baseURL: `${process.env.API_URL}`,
  withCredentials: true
});

function getTransactions() {
  return service.get("/transactions", {}).then(response => response.data);
}

function postTransaction(walletId, amount, fromPublicKey, fromPrivateKey, toPublicKey) {
  return service.post(`/:${walletId}/transaction`, { amount, fromPublicKey, fromPrivateKey, toPublicKey }).then(response => response.data);
}

function getBlocks() {
  return service.get("/blocks", {}).then(response => response.data);
}

function getWallets() {
  return service.get("/wallets", {}).then(response => response.data);
}

function getWalletBalance(transactions, walletPublicKey) {
  let balance = 0;

  for (let transaction of transactions) {
    if (transaction.fromPublicKey === walletPublicKey) {
      balance -= transaction.amount;
    }

    if (transaction.toPublicKey === walletPublicKey) {
      balance += transaction.amount;
    }
  }

  return balance;
}


export { getTransactions, getBlocks, getWallets, getWalletBalance, postTransaction };