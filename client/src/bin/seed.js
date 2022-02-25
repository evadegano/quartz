// packages
import { Component } from "react";
import Gun from  "gun";
import EC from "elliptic";

// helpers
import { createPurchaseTx } from "../services/blockchain-service";
import { hexToArray } from "./helpers";

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

    const keypair = ec.genKeyPair();

    const signature = keypair.sign(walletAddresses);
    //console.log("signature", signature);

    const derSign = signature.toDER();
    console.log("derSign", derSign);

    let hexSign = "";

    for (let int of derSign) {
      let hex = int.toString(16);

      if (hex.length === 1) {
        hex = "0" + hex;
      }

      hexSign += hex;
    }
    
    console.log("hexSign", hexSign);
    console.log("hexSign length", hexSign.length);

    const derSign2 = hexToArray(hexSign);
    console.log("derSign2", derSign2);
  }

  test = (event) => {
    const amount = Math.round(Math.random() * (25000 - 1000) + 1000);

    const walletAddresses = wallets.map(wallet => wallet.address);
    const receiverAddress = walletAddresses[0]

    const keypair = ec.genKeyPair();
    const publicKey = keypair.getPublic("hex");

    createPurchaseTx(amount, receiverAddress, keypair, publicKey);    
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