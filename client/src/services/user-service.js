import axios from "axios";


const service = axios.create({
  baseURL: "http://localhost:5005/api",
  withCredentials: true
})

function getWallets() {
  return service.get("/wallets", {}).then(response => response.data);
}

function postWallets(userId) {
  return service.post("/wallets", { userId }).then(response => response.data);
}

function putWallet(walletId) {
  return service.put(`/${walletId}`, {}).then(response => response.data);
}

function updateUser(userId, email, password, passwordConfirm) {
  return service.put(`/${userId}`, { email, password, passwordConfirm }).then(response => response.data);
}

function deleteUser(userId) {
  return service.delete(`/${userId}`, {}).then(response => response.data);
}

function getCoins(amount, token) {
  return service.post("/coins", {amount, token}).then(response => response.data);
}


export { getWallets, postWallets, putWallet, updateUser, deleteUser, getCoins };