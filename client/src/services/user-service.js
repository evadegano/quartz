import axios from "axios";
import SHA256 from "crypto-js/sha256";
import EC from "elliptic";
var ec = new EC.ec('secp256k1');

const service = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL || ""}`,
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

function getCoins(amount, token, keypair, publicKey) {
  return service.post("/coins", { amount, token, keypair, publicKey }).then(response => response.data);
}


export { getWallets, postWallets, putWallet, updateUser, deleteUser, getCoins };