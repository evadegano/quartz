// packages
import { Component } from "react";
import gun from "gun"
import Blockchain from "../services/classes/blockchain";
import { RewardTransaction, PurchaseTransaction } from "../services/classes/transaction";

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
    this.blockchainRef = this.gun.get("blockchain");
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
    genCreditTx(this.gun, wallets);
  }

  mineBlock = (event) => {
    verifTx(this.gun, this.blockchainRef, this.blocksRef);
  }

  genTx = (event) => {
    genDebitTx(this.gun, wallets);
  }

  test = (event) => {
    const rewardTx = new RewardTransaction(100, "eva", new Date().getTime(), "newBlock.hash");

    console.log(rewardTx);
  }

  render() {
    return (
      <div>
        <button onClick={this.initBlockchain}>init blockchain</button>
        <button onClick={this.topUpWallets}>top up wallets</button>
        <button onClick={this.mineBlock}>verif pending transac
          <br/> & mine block
        </button>
        <button onClick={this.genTx}>gen transactions</button>
        <button onClick={this.test}>test</button>
      </div>
    );
  }
}


export default Seed;