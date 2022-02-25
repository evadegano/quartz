// packages
import axios from "axios";
import SHA256 from "crypto-js";
import EC from "elliptic";
import Gun from  "gun";

// services
import { getCoins } from "../services/user-service";
import { createPurchaseTx } from "../services/blockchain-service";

// init variables
const ec = new EC.ec('secp256k1');
const gun = Gun(["http://localhost:5005/gun"]); // add heroku url once in prod
window.gun = gun; //To have access to gun object in browser console

// service to connect to the API
const service = axios.create({
  baseURL: "http://localhost:5005/api",
  withCredentials: true
})


// delete transactions from db
function deleteTx() {
  gun.get("transactions").map().once(function(transac, idx) {
    console.log(idx);

    // delete transaction's header
    gun.get(idx).get("header").put(null);
    // delete transaction
    gun.get(idx).put(null);
  });
}


// create wallets for users
async function createWallets(users) {

  for (let userID of users) {
    // generate keypairs
    let keypair = ec.genKeyPair();

    // get public and private keys
    let publicKey = keypair.getPublic("hex");
    let privateKey = keypair.getPrivate("hex");

    // derive wallet address from public key
    let walletAddress = SHA256(publicKey).toString();

    // create new wallet in MongoDB
    await service.post("/wallets", { userID, walletAddress, keypair, publicKey, privateKey }).then(response => response.data)
  }
}


async function topUpWallet(wallets) {

  for (let wallet of wallets) {
    // generate a random amount
    const amount = Math.round(Math.random() * (105000 - 1000) + 1000);

    // get the wallet's address
    const walletAddresse = wallet.address;

    // generate a one time signing keypair
    const keypair = ec.genKeyPair();
    const publicKey = keypair.getPublic("hex");

    await createPurchaseTx(amount, walletAddresse, keypair, publicKey);
  }
}

function hexToArray(hashArray, output = []) {
  // if two elements left, hash them and return result
  if (hashArray.length === 2) {
    const int = parseInt(hashArray, 16);
    output.push(int);

    return output;
  }

  // else hash elmements and move on to the next
  const int = parseInt(`${hashArray[0]}${hashArray[1]}`, 16);
  output.push(int);

  return hexToArray(hashArray.slice(2), output);
}

function genRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


export { createWallets, topUpWallet, hexToArray, genRandomDate, deleteTx };