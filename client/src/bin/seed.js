// packages
import { Component } from "react";
import gun from "gun"
import Blockchain from "../services/classes/blockchain";

// helpers
import { genDebitTx, genCreditTx, verifTx } from "./helpers";

// jsons
import users from "./users.json";
import wallets from "./wallets.json";

// init variables
const blockchain = Blockchain.instance;
const blockchainData = {
  lastBlock: blockchain.lastBlock,
  difficulty: blockchain.difficulty,
  miningReward: blockchain.miningReward
}


class Seed extends Component {
  constructor({ gun }) {
    super()
    this.gun = gun;
    this.blockchainRef = this.props.blockchainRef;
    this.blocksRef = this.blockchainRef.get("ledger");
    this.transacsRef = this.gun.get("transactions");
    
    this.state = {
      tempWallets: []
    };
  }

  initBlockchain = () => {
    // add blockchain to gun
    this.blockchainRef.put(blockchainData);

    // add genesis block to gun
    blockchain.ledger[0].transactions = ""
    this.blocksRef.set(blockchain.ledger[0]);
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
        <button onClick={this.initBlockchain}>init blockchain</button>
        <button onClick={this.topUpWallets}>top up wallets</button>
        <button onClick={this.mineBlock}>verif pending transac
          <br/> & mine block
        </button>
        <button>init blockchain</button>
      </div>
    );
  }
}


export default Seed;