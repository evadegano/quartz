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


class App extends Component {
  constructor() {
    super();
      this.gun = Gun(["http://localhost:5005/gun"]); // add heroku url once in prod
      window.gun = this.gun; //To have access to gun object in browser console
      this.blockchain = Blockchain.instance;
      this.blockchainRef = this.gun.get(this.blockchain); // is it the right way to do it?
      this.blocksRef = this.blockchainRef.get("ledger").set(this.blockchain.ledger);
      this.transacsRef = this.gun.get("transactions");
  }

  state = {
    loggedInUser: "",
    blockchain: "",
    wallets: [],
    transactions: [],
    blocks: [],
    error: ""
  }

  updateLoggedInUser = (userObj) => {
    this.setState({ loggedInUser: userObj })
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
    const blockchainData = _.pick(this.blockchainRef["_"]["lex"], ["difficulty", "miningReward", "ledger"]);
    
    this.setState({ blockchain: blockchainData });
  }

  fetchWallets() {
    getWallets()
      .then(response => this.setState({ wallets: response}))
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

  fetchTransactions() {
    let transactionsCopy = [];

    this.transacsRef.map().once(function(transac) {
      let data = _.pick(transac, ["_.#", "amount", "header"]);
      transactionsCopy.push(data);
    });

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

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Homepage />} />
          <Route path="/auth" render={(routerProps) => <Auth {...routerProps} updateUser={this.updateLoggedInUser} />} />
          <Route path="/user" render={() => <UserPages  updateUser={this.updateLoggedInUser} user={this.state.loggedInUser} transactions={this.state.transactions} wallets={this.state.wallets} blocks={this.state.blocks} />} />
          <Route path="/transactions" render={() => <TxPages user={this.state.loggedInUser} transactions={this.state.transactions} />} />
          <Route path="/blocks" render={(routerProps) => <BlockPages {...routerProps} user={this.state.loggedInUser} blockchain={this.state.blockchain} blocks={this.state.blocks} />} />
          <Route path="/wallets" render={(routerProps) => <WalletPages {...routerProps} user={this.state.loggedInUser} wallets={this.state.wallets} />} />
          <Route path="/request-reset" component={ResetRequest} />
          <Route path="/reset-password/:userId" component={ResetPwd} />
        </Switch>
      </div>
  );}
}


export default App;
