import axios from "axios";

const service = axios.create({
  baseURL: `${process.env.API_URL}`,
  withCredentials: true
});

function getTransactions() {
  return service.get("/transactions", {}).then(response => response.data);
}

function getBlocks() {
  return service.get("/blocks", {}).then(response => response.data);
}

function getWallets() {
  return service.get("/wallets", {}).then(response => response.data);
}


export { getTransactions, getBlocks, getWallets };