// packages
import { Component } from "react";
import gun from "gun";
import Blockchain from "../services/classes/blockchain";
import {
  RewardTransaction,
  PurchaseTransaction,
} from "../services/classes/transaction";
import _ from "lodash";


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
    verifTx(this.gun, this.blockchainRef, this.blocksRef);
  };

  genTx = (event) => {
    genDebitTx(this.gun, wallets);
  };

  sendNotif = () => {
    const newNotif = {
      message: "this is a test notif",
      user: this.props.user.activeWallet,
      isRead: false,
      timestamps: new Date().getTime(),
    };

    console.log(newNotif);

    this.notifsRef.set(newNotif);

    // update notifs global state
    this.props.fetchNotifs();
  };

  fetchNotifs() {
    console.log("fetching notifs");
    const lastThreeDays = Math.round(new Date().getTime() / 1000) - 72 * 3600;

    // store user data
    const userWallet = this.props.user.activeWallet;
    console.log("userWallet", userWallet);

    // notif => notif.user === userWallet && (notif.timestamps > lastThreeDays || notif.isRead === false) ? notif : undefined
    // get user's notifs that haven't been seen yet or are younger than three days old
    this.gun
      .get("notifications")
      .map()
      .once(notif => {
        console.log("yo");
        const notifsCopy = [...this.state.notifs];

        notifsCopy.push(notif);
        console.log("notifsCopy", notifsCopy);

        this.setState({ notifs: notifsCopy });
      });

    console.log("ya");
    //this.setState({ notifs: notifsCopy });
  }

  componentDidMount() {
    console.log("did mount");
    this.fetchNotifs();
  }

  render() {
    if (this.state.notifs.length === 0) return "loading";

    return (
      <div className="seed">
        <button onClick={this.initBlockchain}>init blockchain</button>
        <button onClick={this.topUpWallets}>top up wallets</button>
        <button onClick={this.mineBlock}>
          verif pending transac
          <br /> & mine block
        </button>
        <button onClick={this.genTx}>gen transactions</button>
        <button onClick={this.sendNotif}>send notif</button>

        {this.state.notifs.map((notif, idx) => {
          console.log("hey");
          return <p key={idx}>{notif.message}</p>;
        })}
      </div>
    );
  }
}

export default Seed;
