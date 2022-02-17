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
import Transactions from './components/transactions/Transactions';
import Legal from "./components/legal/Legal";


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

  fetchUser() {
    if (this.state.loggedInUser === "") {
      loggedIn()
        .then(response => this.setState({ loggedInUser: response }))
        .catch(() => this.setState({ loggedInUser: false }))
    }
  }

  fetchBlockchainData() {
    const blockchainData = _.pick(this.blockchainRef["_"]["lex"], ["difficulty", "miningReward", "ledger"]);
    
    this.setState({ blockchain: blockchainData });
  }

  fetchWallets() {
    getWallets()
      .then(response => this.setState({ wallets: response}))
      .catch(err => this.setState({ error: err.response.data.message }) )
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
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Homepage />} />
          <Route path="/legal" component={Legal} />
          <Route path="/auth" render={(routerProps) => <Auth {...routerProps} updateUser={this.updateLoggedInUser} />} />
          <Route path="/user" render={() => <UserPages  user={this.state.loggedInUser} transactions={this.state.transactions} wallets={this.state.wallets} blocks={this.state.blocks} />} />
          <Route path="/transactions" render={() => <Transactions transactions={this.props.transactions} />} />
          <Route path="/blocks" render={(routerProps) => <BlockPages {...routerProps} blockchain={this.state.blockchain} blocks={this.state.blocks} />} />
          <Route path="/wallets" render={(routerProps) => <WalletPages {...routerProps} wallets={this.state.wallets} />} />
        </Switch>
      </div>
  );}
}


export default App;
