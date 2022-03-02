// packages
import { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import Gun from  "gun";


// styles
import './styles/App.css';
import "./mystyles.css";

// services
import { loggedIn } from './services/auth-service';
import { getWallets } from "./services/user-service";

// components
import Homepage from './components/homepage/Homepage';
import Auth from './components/auth/Auth';
import UserPages from './UserPages';
import BlockPages from './BlockPages';
import WalletPages from "./WalletPages";
import TxPages from './TxPages';
import RecoveryPages from './RecoveryPages';
import Seed from './bin/seed';



class App extends Component {
  constructor() {
    super();
      this.gun = Gun([`${process.env.REACT_APP_GUN_URL}`]);
      window.gun = this.gun; //To have access to gun object in browser console
      this.blockchainRef = this.gun.get("blockchain");
      this.blocksRef = this.blockchainRef.get("ledger");
      this.transacsRef = this.gun.get("transactions");
      this.notifsRef = this.gun.get("notifications");

      this.state = {
        loggedInUser: "",
        blockchain: "",
        wallets: [],
        transactions: [],
        blocks: [],
        notifs: [],
        error: ""
      }
  }

  updateLoggedInUser = (userObj) => {
    this.setState({ loggedInUser: userObj });
  }

  getUserWallets = () => {
    const userWallets = this.state.wallets.filter(wallet => wallet.user_id === this.state.loggedInUser._id);
    return userWallets;
  }

  fetchUser() {
    if (this.state.loggedInUser === "") {
      loggedIn()
        .then(response => {
          // store user data
          const userData = response.user;
          userData["activeWallet"] = response.walletAddress;

          // update state
          this.setState({ loggedInUser: userData })
        })
        .catch((err) => this.setState({ loggedInUser: false }))
    }
  }

  fetchBlockchainData() {
    let blockchainData = {};

    this.blockchainRef.map().once(function(val, key) {

      if (key !== "ledger") {
        blockchainData[key] = val;
      }
    });

    this.setState({ blockchain: blockchainData });
  }

  fetchNotifs() {
    let notifs = [];
    const last2Days = Math.round(new Date().getTime() / 1000) - (72 * 3600);

    // get user's notifs that haven't been seen yet or are less than two days old
    this.notifsRef.map().once(function(notif) {
      if (notif.user === this.state.loggedInUser.activeWallet && (notif.timestamps < last2Days || notif.isRead === true)) {
        notifs.push(notif);
      }
    })

    this.setState({ notifs });
  }

  updateBlockchain(block) {
    this.blockchainRef.get("ledger").set(block);
  }

  fetchWallets() {

    getWallets()
      .then(response => {
        let wallets = []

        for (let wallet of response.walletsFromDB) {
          wallets.push({
            address: wallet.address,
            name: wallet.name,
            active: wallet.active,
            lastConnection: wallet.lastConnection
          })
        }

        this.setState({ wallets })
      })
      .catch(err => {
        console.log(err);

        if (err.response.data.message) {
          this.setState({ error: err.response.data.message });
        } else {
          this.setState({ error: err.message });
      }})
  }

  fetchBlocks() {
    let blocksCopy = [];

    this.blockchainRef.get("ledger").map().once(function(block) {
      blocksCopy.push(block);
    });

    // this.blockchain.ledger.map(block => blocksCopy.push(block));

    this.setState({ blocks: blocksCopy });
  }

  async fetchTransactions() {
    let transactionsCopy = [];

    // loop through transactions and add them to the global state
    this.transacsRef.map().once(function(transac) {
      // only add non-null transactions
      if (transac) {
        transactionsCopy.push(transac);
      }
    });

    this.setState({ transactions: transactionsCopy });
  }

  componentDidMount() {
    this.fetchUser();
    this.fetchWallets();
    this.fetchBlockchainData();
    this.fetchBlocks();
    this.fetchTransactions();
    this.fetchNotifs();
  }

  render() {
    if (!this.state.blockchain || !this.state.wallets || !this.state.transactions || !this.state.blocks) return <div>Loading...</div>

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Homepage />} />
          <Route path="/auth" render={(routerProps) => <Auth {...routerProps} updateUser={this.updateLoggedInUser} />} />
          
          <Route  path="/user" render={(routerProps) => 
            <UserPages  {...routerProps} 
              gun={this.gun}
              updateUser={this.updateLoggedInUser} 
              user={this.state.loggedInUser} 
              transactions={this.state.transactions} 
              wallets={this.state.wallets} 
              blocks={this.state.blocks}
              notifs={this.state.notifs}
              fetchNotifs={this.fetchNotifs} />} />

          <Route path="/transactions" render={(routerProps) => 
            <TxPages {...routerProps}
              gun={this.gun}
              user={this.state.loggedInUser} 
              blockchain={this.state.blockchain} 
              transactions={this.state.transactions}
              notifs={this.state.notifs}
              fetchNotifs={this.fetchNotifs}
              fetchTx={this.fetchTransactions} />} />

          <Route path="/blocks" render={(routerProps) => 
            <BlockPages {...routerProps} 
              gun={this.gun}
              user={this.state.loggedInUser} 
              blockchain={this.state.blockchain} 
              blocks={this.state.blocks}
              transactions={this.state.transactions}
              notifs={this.state.notifs}
              fetchNotifs={this.fetchNotifs} />} />

          <Route path="/wallets" render={(routerProps) => 
            <WalletPages {...routerProps}
              gun={this.gun}
              transactions={this.state.transactions}
              blocks={this.state.blocks} 
              user={this.state.loggedInUser} 
              wallets={this.state.wallets}
              notifs={this.state.notifs}
              fetchNotifs={this.fetchNotifs} />} />

          
          <Route path="/recovery" render={() => <RecoveryPages /> } />
          <Route path="/seed" render={() => <Seed gun={this.gun} /> } />
        </Switch>
      </div>
  );}
}


export default App;
