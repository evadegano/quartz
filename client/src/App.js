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
import ProtectedRoute from './components/auth/ProtectedRoutes';
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
    // clear console on every page update
    console.clear();

    // init gun pointers
    this.gun = Gun([`${process.env.REACT_APP_GUN_URL}`]);
    window.gun = this.gun; //To have access to gun object in browser console
    this.blockchainRef = this.gun.get("blockchain");
    this.blocksRef = this.blockchainRef.get("ledger");
    this.transacsRef = this.gun.get("transactions");
    this.notifsRef = this.gun.get("notifications");

    this.state = {
      loggedInUser: "",
      fetchingUser: false,
      blockchain: "",
      wallets: [],
      transactions: [],
      blocks: [],
      notifs: [],
      error: ""
    }
  }
  
  /*
    Update user state on authentication
  */
  updateLoggedInUser = (userObj) => {
    this.setState({ loggedInUser: userObj });
  }

  /*
    Delete this
  */
  getUserWallets = () => {
    const userWallets = this.state.wallets.filter(wallet => wallet.user_id === this.state.loggedInUser._id);
    return userWallets;
  }

  /*
    Fetch user data from database
  */
  fetchUser() {
    // exit if user data has been or is being fetched
    if (this.state.loggedInUser._id || this.state.fetchingUser) return;

    // update state
    this.setState({ fetchingUser: true });

    // fetch data from database
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

  /*
    Fetch wallets from database
  */
  fetchWallets() {
    // query database for wallets
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

        // update state
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

  /*
    Fetch blockchain data from Gun
  */
  fetchBlockchainData() {
    const blockchainCopy = {};

    // loop through the blockchain object in Gun
    this.blockchainRef
      .map()
      .once((val, key) => {
        // skip the ledger key
        if (key !== "ledger") {
          // add key and values to the blockchain state
          blockchainCopy[key] = val;

          // update state
          this.setState({ blockchain: blockchainCopy });
        }
      })
  }

  /*
    Fetch blocks from Gun
  */
  fetchBlocks() {
    const blocksCopy = [];

    // loop through the blocks collection in Gun
    this.blocksRef
      .map()
      .once(block => {
        blocksCopy.push(block);

        // update state
        this.setState({ blocks: blocksCopy });
    });
  }

  /* 
    Fetch transactions from Gun
  */
  fetchTransactions = () => {
    const transactionsCopy = [];

    // loop through the transactions collection in Gun
    this.transacsRef
      .map()
      .once(tx => {
        transactionsCopy.push(tx);

        // update state
        this.setState({ transactions: transactionsCopy });
      })
  }

  /* 
    Fetch notifications from Gun
  */
  fetchNotifs() {
    const lastThreeDays = Math.round(new Date().getTime() / 1000) - 72 * 3600;
    let userWallet;

    // get user's active wallet address
    if (this.state.loggedInUser.activeWallet) {
      userWallet = this.state.loggedInUser.activeWallet;

    } else {
      // fetch data from database
      loggedIn()
        .then(response => {
          // store user data
          userWallet = response.walletAddress;
        })
        .catch((err) => this.setState({ loggedInUser: false }))
    }


    // init empty notifs array
    const notifsCopy = [];

    // loop through the notifications collection in Gun 
    this.gun
      .get("notifications")
      // only keep user's notifs that haven't been seen yet or are younger than three days old
      .map(notif => notif.user === userWallet && (notif.timestamps > lastThreeDays || notif.isRead === false) ? notif : undefined)
      .once(notif => {
        notifsCopy.push(notif);

        this.setState({ notifs: notifsCopy });
      });
  }

  componentDidMount() {
    this.fetchUser();
    this.fetchWallets();
    this.fetchBlockchainData();
    this.fetchBlocks();
    this.fetchTransactions();
    this.fetchNotifs();
    
    console.log("App.js did mount");
  }

  render() {
    if (!this.state.wallets) return <div>Loading...</div>

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Homepage user={this.state.loggedInUser} />} />
          <Route path="/auth" render={(routerProps) => <Auth {...routerProps} updateUser={this.updateLoggedInUser} />} />
          
          <ProtectedRoute  
            path="/user" 
            loggedin={this.state.loggedInUser._id}
            pending={this.state.fetchingUser}
            render={routerProps => 
              <UserPages  {...routerProps} 
                gun={this.gun}
                user={this.state.loggedInUser}
                transactions={this.state.transactions}
                notifs={this.state.notifs}
                updateUser={this.updateLoggedInUser} 
                fetchTx={this.fetchTransactions}
                fetchNotifs={this.fetchNotifs} />} />

          <ProtectedRoute 
            path="/transactions"
            loggedin={this.state.loggedInUser._id}
            pending={this.state.fetchingUser}
            render={routerProps => 
              <TxPages {...routerProps}
                gun={this.gun}
                user={this.state.loggedInUser} 
                blockchain={this.state.blockchain} 
                transactions={this.state.transactions}
                notifs={this.state.notifs}
                updateUser={this.updateLoggedInUser}
                fetchTx={this.fetchTransactions}
                fetchNotifs={this.fetchNotifs} />} />

          <ProtectedRoute 
            path="/blocks"
            loggedin={this.state.loggedInUser._id}
            pending={this.state.fetchingUser}
            render={routerProps => 
              <BlockPages {...routerProps} 
                gun={this.gun}
                user={this.state.loggedInUser} 
                blockchain={this.state.blockchain} 
                blocks={this.state.blocks}
                transactions={this.state.transactions}
                notifs={this.state.notifs}
                updateUser={this.updateLoggedInUser}
                wallets={this.state.wallets}
                fetchNotifs={this.fetchNotifs} />} />

          <ProtectedRoute 
            path="/wallets"
            loggedin={this.state.loggedInUser._id}
            pending={this.state.fetchingUser}
            render={routerProps => 
              <WalletPages {...routerProps}
                gun={this.gun}
                user={this.state.loggedInUser}
                blocks={this.state.blocks}
                transactions={this.state.transactions}
                notifs={this.state.notifs}
                updateUser={this.updateLoggedInUser}
                wallets={this.state.wallets}
                fetchNotifs={this.fetchNotifs} />} />

          <Route path="/recovery" render={() => <RecoveryPages /> } />
          
          <Route path="/seed" render={(routerProps) => 
            <Seed {...routerProps}
            user={this.state.loggedInUser} 
            gun={this.gun} 
            blockchain={this.state.blockchain}
            transactions={this.state.transactions}
            notifs={this.state.notifs}
            fetchNotifs={this.fetchNotifs} /> } />
        </Switch>
      </div>
  );}
}


export default App;
