import { Component } from "react";
import { SHA256 } from "crypto-js";
import axios from "axios";
import Gun from  "gun";
import { getCoins } from "../services/user-service";
import { createPurchaseTx } from "../services/blockchain-service";
import users from "./users.json";
import EC from "elliptic";
var ec = new EC.ec('secp256k1');


// service to connect to the API
const service = axios.create({
  baseURL: "http://localhost:5005/api",
  withCredentials: true
})

const gun = Gun(["http://localhost:5005/gun"]); // add heroku url once in prod
window.gun = gun; //To have access to gun object in browser console

// token for Stripe transactions
const token = {
  id: 'tok_1KWFWqD6SFhoou9ANbH8Ltsf',
  object: 'token',
  card: {
    id: 'card_1KWFWpD6SFhoou9AeZZ3fasw',
    object: 'card',
    address_city: null,
    address_country: null,
    address_line1: null,
    address_line1_check: null,
    address_line2: null,
    address_state: null,
    address_zip: null,
    address_zip_check: null,
    brand: 'Visa',
    country: 'US',
    cvc_check: 'unchecked',
    dynamic_last4: null,
    exp_month: 12,
    exp_year: 2022,
    funding: 'credit',
    last4: '4242',
    name: 'eva.degano@gmail.com',
    tokenization_method: null
  },
  client_ip: '92.170.27.52',
  created: 1645602292,
  email: 'eva.degano@gmail.com',
  livemode: false,
  type: 'card',
  used: false
}


// create wallets for users
async function createWallets(users) {
  // generate a rand amount of wallets for each user
  const rand = Math.round(Math.random() * 6);

  for (let userID of users) {
    let keypair = ec.genKeyPair();
    let publicKey = keypair.getPublic("hex");
    let privateKey = keypair.getPrivate("hex");
    let walletAddress = SHA256(publicKey).toString();

    await service.post("/wallets", { userID, walletAddress, keypair, publicKey, privateKey }).then(response => response.data)
  }
}

function topUpWallet(walletAddress) {
  // random amount
  const randAmount = Math.round(Math.random() * (25000 - 1000) + 1000);

  // create one-time signing key pair
  let keypair = ec.genKeyPair();
  const publicKey = keypair.getPublic("hex");
  const privateKey = keypair.getPrivate("hex");

  getCoins(randAmount, token, publicKey, privateKey);
  createPurchaseTx(randAmount, walletAddress, keypair.publicKey, keypair.privateKey);

 console.log("wallet toped up");
}



class Seed extends Component {
  state = {
    tempWallets: []
  }

  run = (event) => {
    let userIDs = users.userIDs;

    console.log(createWallets(userIDs));

  }

  test = (event) => {
    const userID = users[2];

    let keypair = ec.genKeyPair();
    let walletAddress = SHA256(keypair.toString()).toString();

    service.post("/wallets", { userID, walletAddress, keypair, publicKey: keypair.getPublic("hex"), privateKey: keypair.getPrivate("hex") }).then(response => response.data)
  }

  render() {
    return (
      <div>
        <button onClick={(this.test)}>Test</button>
        <button onClick={this.run}>Seed</button>
      </div>
    );
  }
}


export default Seed;