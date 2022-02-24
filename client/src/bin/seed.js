// packages
import { Component } from "react";
import Gun from  "gun";
import EC from "elliptic";

// helpers
import { createWallets, topUpWallet } from "./helpers";
import { createPurchaseTx } from "../services/blockchain-service";

// jsons
import users from "./users.json";
import wallets from "./wallets.json";
import { SHA256 } from "crypto-js";

// init variables
const ec = new EC.ec('secp256k1');
const gun = Gun(["http://localhost:5005/gun"]); // add heroku url once in prod
window.gun = gun; //To have access to gun object in browser console



class Seed extends Component {
  state = {
    tempWallets: []
  }

  run = async (event) => {
    let walletAddresses = wallets.map(wallet => wallet.address);

  }

  test = (event) => {
    const amount = Math.round(Math.random() * (25000 - 1000) + 1000);

    const walletAddresses = wallets.map(wallet => wallet.address);
    const receiverAddress = walletAddresses[0]

    const keypair = ec.genKeyPair();
    const publicKey = keypair.getPublic("hex");
    const privateKey = keypair.getPrivate("he");

    createPurchaseTx(amount, receiverAddress, keypair, publicKey, privateKey);    
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