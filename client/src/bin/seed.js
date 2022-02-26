// packages
import { Component } from "react";
import Gun from  "gun";
import EC from "elliptic";

// helpers
import { createPurchaseTx } from "../services/transaction-service";
import { genRandomDate, genDebitTx } from "./helpers";

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
    genDebitTx(wallets);
  }

  test = async (event) => {
    return;
    
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