// packages
import { Component } from "react";
import gun from "gun"

// helpers
import { genDebitTx, genCreditTx, verifTx } from "./helpers";

// jsons
import users from "./users.json";
import wallets from "./wallets.json";


class Seed extends Component {
  constructor({ gun }) {
    super()
    this.gun = gun;
    this.blockchainRef = this.props.blockchainRef;
    this.blocksRef = this.blockchainRef.get("ledger").set(this.props.blockchainInstance.ledger);
    this.transacsRef = this.gun.get("transactions");
    
    this.state = {
      tempWallets: []
    };
  }


  topUpWallets = (event) => {
    genCreditTx(wallets);
  }

  mineBlock = (event) => {
    verifTx(this.gun, this.blockchainRef, this.blocksRef);
  }

  render() {
    return (
      <div>
        <button onClick={this.topUpWallets}>top up wallets</button>
        <button onClick={this.mineBlock}>verif pending transac
          <br/> & mine block</button>
      </div>
    );
  }
}


export default Seed;