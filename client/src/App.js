// packages
import { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import Gun from  "gun";
import _ from "lodash";


// styles
import './styles/App.css';
import "./mystyles.css";

// services
import { loggedIn } from './services/auth-service';
import { getWallets } from "./services/user-service";
import Blockchain from "./services/classes/blockchain";

// components
import Homepage from './components/homepage/Homepage';
import Auth from './components/auth/Auth';
import UserPages from './UserPages';
import BlockPages from './BlockPages';
import WalletPages from "./WalletPages";
import TxPages from './TxPages';
import ResetRequest from "./components/recovery/reset-request";
import ResetPwd from "./components/recovery/reset-pwd";
import Seed from './bin/seed';


class App extends Component {
  constructor() {
    super();
      this.gun = Gun([`${process.env.REACT_APP_GUN_URL}`]);
      window.gun = this.gun; //To have access to gun object in browser console
      this.blockchain = Blockchain.instance;
      this.blockchainRef = this.gun.get(this.blockchain);
      this.blocksRef = this.blockchainRef.get("ledger").set(this.blockchain.ledger);
      this.transacsRef = this.gun.get("transactions");

      this.state = {
        loggedInUser: "",
        blockchain: "",
        wallets: [],
        transactions: [],
        blocks: [],
        newNotifs: false,
        error: ""
      }
  }

  

  updateLoggedInUser = (userObj) => {
    this.setState({ loggedInUser: userObj });
  }

  updateNotifsStatus = (bool) => {
    this.setState({ newNotifs: bool });
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
    const blockchainData = _.pick(this.blockchainRef["_"]["lex"], ["difficulty", "miningReward", "ledger", "lastBlock"]);
    
    this.setState({ blockchain: blockchainData });
  }

  updateBlockchain(blockHash) {
    this.blockchain.ledger.push()
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

    // console.log("ledger =>", this.blockchainRef.get("ledger"))

    // this.blocksRef.map().once(function(block) {
    //   let data = _.pick(block);
    //   blocksCopy.push(data);
    // });

    this.blockchain.ledger.map(block => blocksCopy.push(block));

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

    // function to fetch transaction header data
    // this.gun.get("l01f59a9Ou4iXbXdqq0n").get("header").get("fromAddress").once(function(value) {
    //   console.log("amount:", value);
    // })

    this.setState({ transactions: transactionsCopy });
  }

  componentDidMount() {
    this.fetchUser();
    this.fetchWallets();
    this.fetchBlockchainData();
    this.fetchBlocks();
    this.fetchTransactions();
  }

  render() {
    if (!this.state.blockchain || !this.state.wallets || !this.state.transactions || !this.state.blocks) return <div>Loading...</div>

    console.log("this.blockchain", this.blocksRef);
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Homepage />} />
          <Route path="/auth" render={(routerProps) => <Auth {...routerProps} updateUser={this.updateLoggedInUser} />} />
          
          <Route  path="/user" render={(routerProps) => 
            <UserPages  {...routerProps} 
              updateNotifsStatus={this.updateNotifsStatus} 
              newNotifs={this.state.newNotifs} 
              gun={this.gun}
              updateUser={this.updateLoggedInUser} 
              user={this.state.loggedInUser} 
              transactions={this.state.transactions} 
              wallets={this.state.wallets} 
              blocks={this.state.blocks} />} />

          <Route path="/transactions" render={(routerProps) => 
            <TxPages {...routerProps}
              gun={this.gun}
              updateNotifsStatus={this.updateNotifsStatus} 
              newNotifs={this.state.newNotifs} 
              user={this.state.loggedInUser} 
              blockchain={this.state.blockchain} 
              transactions={this.state.transactions} />} />

          <Route path="/blocks" render={(routerProps) => 
            <BlockPages {...routerProps} 
              gun={this.gun}
              updateNotifsStatus={this.updateNotifsStatus} 
              newNotifs={this.state.newNotifs} 
              user={this.state.loggedInUser} 
              blockchain={this.state.blockchain} 
              blocks={this.state.blocks} />} />

          <Route path="/wallets" render={(routerProps) => 
            <WalletPages {...routerProps}
              gun={this.gun}
              transactions={this.state.transactions}
              blocks={this.state.blocks} 
              updateNotifsStatus={this.updateNotifsStatus} 
              newNotifs={this.state.newNotifs} 
              user={this.state.loggedInUser} 
              wallets={this.state.wallets} />} />

          <Route path="/request-reset" component={ResetRequest} />
          <Route path="/reset-password/:userId" component={ResetPwd} />

          <Route path="/seed" render={() => <Seed gun={this.gun} /> } />
        </Switch>
      </div>
  );}
}


export default App;
