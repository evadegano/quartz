import { Component } from "react";
import { SHA256 } from "crypto-js";
import axios from "axios";
import Gun from  "gun";
import { generateWallet, postWallets, getCoins } from "../services/user-service";
import { createPurchaseTx } from "../services/blockchain-service";
import users from "./users.json";

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
  let tempWallets = [];
  let wallets = [];

  // generate a rand amount of wallets for each user
  const rand = Math.round(Math.random() * 6);

  for (let userID of users) {
    for (let i = 0; i < rand; i++) {
      let walletAddress, publicKey, privateKey;

      window.crypto.subtle.generateKey(
        {
          name: "ECDSA",
          namedCurve: "P-384"
        },
        true,
        ["sign", "verify"]
        )
        .then((keyPair) => {
          walletAddress = SHA256(keyPair.publicKey.toString()).toString();
          publicKey = keyPair.publicKey;
          privateKey = keyPair.privateKey;

          tempWallets.push({ 
            address: walletAddress,
            publicKey,
            privateKey
          });

          wallets.push({
            userID,
            walletAddress
          });

          //gun.get(wallets).get(walletAddress).put({ userID, publicKey, privateKey });
        })
    }
  }

}

function topUpWallet(walletAddress) {
  // random amount
  const randAmount = Math.round(Math.random() * (25000 - 1000) + 1000);

  // create one-time signing key pair
  window.crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-384"
    },
    true,
    ["sign", "verify"]
    )
    .then((keyPair) => {
      const publicKey = keyPair.publicKey;
      const privateKey = keyPair.privateKey;

      return  getCoins(randAmount, token, publicKey, privateKey);
    })
    .then(response => {
      // add transaction to the blockchain
      const { amount, keypair } = response;
      createPurchaseTx(amount, walletAddress, keypair.publicKey, keypair.privateKey);

      console.log("wallet toped up");
    })
    .catch(err => console.log(err))
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
    let walletAddress, publicKey, privateKey;

    window.crypto.subtle.generateKey(
      {
        name: "ECDSA",
        namedCurve: "P-384"
      },
      true,
      ["sign", "verify"]
      )
      .then((keyPair) => {
        walletAddress = SHA256(keyPair.publicKey.toString()).toString();
        
        
      })

      
  }

  render() {
    return (
      <div>
        <button>Test</button>
        <button onClick={this.run}>Seed</button>
      </div>
    );
  }
}


export default Seed;