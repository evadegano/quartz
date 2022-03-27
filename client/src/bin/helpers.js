// packages
import axios from "axios";
import SHA256 from "crypto-js";
import EC from "elliptic";


// services
import { createPurchaseTx, sendCoins, processTx } from "../services/transaction-service";

// init variables
const ec = new EC.ec('secp256k1');

// service to connect to the API
const service = axios.create({
  baseURL: "http://localhost:5005/api",
  withCredentials: true
})

function genRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function genCreditTx(gun, wallets) {

  for (let wallet of wallets) {
    //generate a random date
    const randDate = genRandomDate(new Date(2021, 11, 1), new Date(2021, 11, 30));
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
    await createPurchaseTx(gun, amount, walletAddress, keypair, publicKey, timestamps);    
  }
}

async function genDebitTx(gun, wallets) {

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
    await sendCoins(gun, amount, keypair, publicKey, senderAddress, receiverAddress, timestamps);    
  }
}

async function verifTx(gun, blockchain, pendingTx, miner, transactions, timestamps) {
  
  await processTx(gun, blockchain, pendingTx, miner, transactions, timestamps);
}


export { genDebitTx, genCreditTx, verifTx };