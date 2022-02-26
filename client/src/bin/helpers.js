// packages
import axios from "axios";
import SHA256 from "crypto-js";
import EC from "elliptic";
import Gun from  "gun";

// services
import { createPurchaseTx, sendCoins } from "../services/transaction-service";

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


async function genDebitTx(wallets) {

  for (let wallet of wallets) {
    //generate a random date
    const randDate = genRandomDate(new Date(2021, 10, 1), new Date());
    // convert date to timestamps
    const timestamps = randDate.getTime();

    // generate a random amount
    const amount = Math.round(Math.random() * (250000 - 1000) + 1000);

    // store wallet address
    const walletAddress = wallet.address;

    // generate a one-time signing keypair
    const keypair = ec.genKeyPair();
    const publicKey = keypair.getPublic("hex");

    // create transaction
    await createPurchaseTx(amount, walletAddress, keypair, publicKey, timestamps);    
  }
}

async function genCreditTx(wallets) {
  for (let wallet of wallets) {
    //generate a random date
    const randDate = genRandomDate(new Date(2021, 11, 1), new Date(2021, 11, 20));
    // convert date to timestamps
    const timestamps = randDate.getTime();

    // generate a random amount
    const amount = Math.round(Math.random() * (10000 - 150) + 150);

    // store wallet address
    const senderAddress = wallet.address;
    // get rand wallet address
    const randIdx = Math.round(Math.random() * wallets.length);
    const receiverAddress = wallets[ randIdx ].address;

    // generate a one-time signing keypair
    const keypair = ec.genKeyPair();
    const publicKey = keypair.getPublic("hex");

    // create transaction
    await sendCoins(amount, keypair, publicKey, senderAddress, receiverAddress, timestamps);    
  }
}

function genRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


export { createWallets, genDebitTx, genCreditTx, genRandomDate, deleteTx };