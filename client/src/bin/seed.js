// packages
import { Component } from "react";
import gun from "gun";
import Blockchain from "../services/classes/blockchain";
import {
  RewardTransaction,
  PurchaseTransaction,
} from "../services/classes/transaction";


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

  initBlockchain = () => {
    // add blockchain to gun
    this.blockchainRef.put(blockchainData);

    // add genesis block to gun
    blockchain.ledger[0].transactions = "";
    this.blocksRef.set(blockchain.ledger[0]);
  };

  topUpWallets = (event) => {
    genCreditTx(this.gun, wallets);
  };

  mineBlock = (event) => {
    const pendingTx = this.props.transactions.filter(tx => tx.status === "pending");
    const randWallet = Math.round(Math.random() * wallets.length);
    const miner = wallets[ randWallet ].name;
    const timestamps = new Date(2021, 11, 31).getTime();

    verifTx(this.gun, this.props.blockchain, pendingTx, miner, this.props.transactions, timestamps);
  };

  genTx = (event) => {
    genDebitTx(this.gun, wallets);
  };

  sendNotif = () => {
    const newNotif = {
      message: "let's try this shit",
      user: "test",
      isRead: false,
      timestamps: new Date().getTime(),
    };

    console.log(newNotif);

    this.notifsRef.set(newNotif);

    // update notifs global state
    this.props.fetchNotifs();
  };

  render() {
    return (
      <div className="inner-container inner-page">
        <div className="centered-col-container seed">
          <h1>Admin panel</h1>
          <p>Click on the buttons below to </p>

          <div className="profile-container">
            <button onClick={this.initBlockchain}>Init blockchain instance</button>
            <button onClick={this.topUpWallets}>Top up wallets</button>
            <button onClick={this.mineBlock}>
              Verify pending transactions
              <br /> & mine block
            </button>
            <button onClick={this.genTx}>Generate random transactions</button>
            <button onClick={this.sendNotif}>Test notifications</button>
          </div>

        </div>
      </div>
    );
  }
}

export default Seed;
