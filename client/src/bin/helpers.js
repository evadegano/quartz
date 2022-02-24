// packages
import axios from "axios";
import SHA256 from "crypto-js";
import EC from "elliptic";

// services
import { getCoins } from "../services/user-service";
import { createPurchaseTx } from "../services/blockchain-service";

// init variables
const ec = new EC.ec('secp256k1');

// service to connect to the API
const service = axios.create({
  baseURL: "http://localhost:5005/api",
  withCredentials: true
})



// create wallets for users
async function createWallets(users) {
  for (let userID of users) {
    let keypair = ec.genKeyPair();
    let publicKey = keypair.getPublic("hex");
    let privateKey = keypair.getPrivate("hex");
    let walletAddress = SHA256(publicKey).toString();

    await service.post("/wallets", { userID, walletAddress, keypair, publicKey, privateKey }).then(response => response.data)
  }
}


async function topUpWallet(walletAddress) {
  // random amount
  const randAmount = Math.round(Math.random() * (25000 - 1000) + 1000);

  // create one-time signing key pair
  let keypair = ec.genKeyPair();
  const publicKey = keypair.getPublic("hex");
  const privateKey = keypair.getPrivate("hex");

  createPurchaseTx(randAmount, walletAddress, keypair, publicKey, privateKey);
}


export { createWallets, topUpWallet };