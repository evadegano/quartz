// packages
import { Component } from "react";
import Gun from  "gun";
import EC from "elliptic";

// helpers
import { createWallets, topUpWallet } from "./helpers";

// jsons
import users from "./users.json";
import wallets from "./wallets.json";

// init variables
const gun = Gun(["http://localhost:5005/gun"]); // add heroku url once in prod
window.gun = gun; //To have access to gun object in browser console



class Seed extends Component {
  state = {
    tempWallets: []
  }

  run = async (event) => {
    let walletAddresses = wallets.map(wallet => wallet.address);

    await topUpWallet(walletAddresses[0]);
  }

  test = (event) => {
    console.log("test");
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