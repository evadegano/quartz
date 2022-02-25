// packages
import { Component } from "react";
import Gun from  "gun";
import EC, { rand } from "elliptic";

// helpers
import { createPurchaseTx } from "../services/blockchain-service";
import { hexToArray, genRandomDate, deleteTx } from "./helpers";

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
    return;
  }

  test = async (event) => {
    const walletAddress = wallets[0].address;

    const randDate = genRandomDate(new Date(2021, 10, 1), new Date());
    const timestamps = randDate.getTime();

    console.log("timestamps", timestamps);
      const amount = Math.round(Math.random() * (250000 - 1000) + 1000);

 

      const keypair = ec.genKeyPair();
      const publicKey = keypair.getPublic("hex");

      createPurchaseTx(amount, walletAddress, keypair, publicKey, timestamps);

    // for (let wallet in wallets) {

    //   const timestamps = genRandomDate(new Date(2021, 10, 1), new Date());
    //   const amount = Math.round(Math.random() * (250000 - 1000) + 1000);

    //   const walletAddress = wallet.address;

    //   const keypair = ec.genKeyPair();
    //   const publicKey = keypair.getPublic("hex");

    //   createPurchaseTx(amount, walletAddress, keypair, publicKey, timestamps);    
    // }
    
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