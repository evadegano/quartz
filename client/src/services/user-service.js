import axios from "axios";
import SHA256 from "crypto-js/sha256";


const service = axios.create({
  baseURL: "http://localhost:5005/api",
  withCredentials: true
})

function getWallets() {
  return service.get("/wallets", {}).then(response => response.data);
}

function postWallets(userId, walletAddress) {
  return service.post("/wallets", { userId, walletAddress }).then(response => response.data);
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

function getCoins(amount, token, publicKey, privateKey) {
  return service.post("/coins", { amount, token, publicKey, privateKey }).then(response => response.data);
}

function generateWallet() {

  window.crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-384"
    },
    true,
    ["sign", "verify"]
    )
    .then((keyPair) => {
      const walletAddress = SHA256(keyPair.publicKey.toString()).toString();

      return [ walletAddress, keyPair.publicKey, keyPair.privateKey ];
    });

    throw new Error("Something went wrong when creating your wallet.")
}


export { getWallets, postWallets, putWallet, generateWallet, updateUser, deleteUser, getCoins };