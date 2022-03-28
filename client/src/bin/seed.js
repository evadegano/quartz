// packages
import { Component } from "react";
import Blockchain from "../services/classes/blockchain";

// helpers
import { genDebitTx, genCreditTx, verifTx } from "./helpers";

// jsons
import wallets from "./wallets.json";

// init variables
const blockchain = Blockchain.instance;
const blockchainData = {
  lastBlock: blockchain.lastBlock,
  difficulty: blockchain.difficulty,
  miningReward: blockchain.miningReward,
};

class Seed extends Component {
  constructor({ gun }) {
    super();
    this.gun = gun;
    this.blockchainRef = this.gun.get("blockchain");
    this.blocksRef = this.blockchainRef.get("ledger");
    this.transacsRef = this.gun.get("transactions");
    this.notifsRef = this.gun.get("notifications");

    this.state = {
      tempWallets: [],
      notifs: [],
    };
  }

  /*
    Create an instance of the singleton blockchain class in GunJS
  */
  initBlockchain = () => {
    // add blockchain to gun
    this.blockchainRef.put(blockchainData);

    // add genesis block to gun
    blockchain.ledger[0].transactions = "";
    this.blocksRef.set(blockchain.ledger[0]);

    console.log("A Blockchain instance was successfully created.");
  };


  /*
    Generate random transactions to top wallets up and store them on GunJS
  */
  topUpWallets = async () => {
    try {
      await genCreditTx(this.gun, wallets);
      console.log("Wallets were successfully topped up.");

    } catch (err) {
      console.log(err);
    }
  };


  /* 
    Select a random wallet to verify current pending transactions and mine them into a block
  */
  mineBlock = async () => {
    const pendingTx = this.props.transactions.filter(tx => tx.status === "pending");
    const randWallet = Math.round(Math.random() * wallets.length);
    const miner = wallets[ randWallet ].name;
    const timestamps = new Date(2021, 11, 31).getTime();

    try {
      await verifTx(this.gun, this.props.blockchain, pendingTx, miner, this.props.transactions, timestamps);
      console.log("Transactions were successfully verified.");

    } catch (err) {
      console.log(err);
    }
  };


  /*
    Generate random transactions between wallets and store them on GunJS
  */
  genTx = async () => {

    try {
      await genDebitTx(this.gun, wallets, this.props.transactions);
      console.log("Fake transactions were successfully generated between wallets.");

    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="inner-container inner-page">
        <div className="centered-col-container seed">
          <h1 className="title">Admin panel</h1>
          <p>Click on the buttons below to populate GunJs with dummy data</p>

          <div className="profile-container">
            <button onClick={this.initBlockchain} className="signup-btn">Init blockchain instance</button>
            <button onClick={this.topUpWallets} className="signup-btn">Top up wallets</button>
            <button onClick={this.mineBlock} className="signup-btn">
              Verify pending transactions
              <br /> & mine block
            </button>
            <button onClick={this.genTx} className="signup-btn">Generate random transactions</button>
          </div>

        </div>
      </div>
    );
  }
}

export default Seed;
