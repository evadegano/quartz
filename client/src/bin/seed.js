// packages
import { Component } from "react";
import Gun from  "gun";
import EC from "elliptic";

// helpers
import { createPurchaseTx } from "../services/transaction-service";
import { genDebitTx, genCreditTx } from "./helpers";

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

  topUpWallets = (event) => {
    genCreditTx(wallets);
  }

  render() {
    return (
      <div>
        <button onClick={this.topUpWallets}>top up wallets</button>
        <button>verif pending transac
          <br/> & mine block</button>
      </div>
    );
  }
}


export default Seed;