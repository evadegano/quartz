// packages
import { Component } from "react";
import Gun from  "gun";
import EC from "elliptic";

// helpers
import { createPurchaseTx } from "../services/transaction-service";
import { genRandomDate } from "./helpers";

// jsons
import users from "./users.json";
import wallets from "./wallets.json";


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
    for (let wallet of wallets) {

      const randDate = genRandomDate(new Date(2021, 10, 1), new Date());
      const timestamps = randDate.getTime();

      const amount = Math.round(Math.random() * (250000 - 1000) + 1000);

      const walletAddress = wallet.address;
      console.log("walletAddress", wallet.address);

      const keypair = ec.genKeyPair();
      const publicKey = keypair.getPublic("hex");

      await createPurchaseTx(amount, walletAddress, keypair, publicKey, timestamps);    
    }
    
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