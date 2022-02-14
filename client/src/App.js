import { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { loggedIn } from './services/auth-service';
import { getWallets } from "./services/user-service";
import Gun from  "gun";
import _ from "lodash";
import Homepage from './homepage/Homepage';
import Auth from './auth/Auth';
import Private from './private';
import Legal from "./legal/Legal";
import './styles/App.css';
import "./mystyles.css";


class App extends Component {
  constructor() {
    super();
      this.gun = Gun(["http://localhost:5005/gun"]); // add heroku url once in prod
      window.gun = this.gun; //To have access to gun object in browser console
      this.transacsRef = this.gun.get("transactions");
      this.blocksRef = this.gun.get("blocks");
      this.walletsRef = this.gun.get("wallets");
  }

  state = {
    loggedInUser: "",
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

  fetchWallets() {
    getWallets()
      .then(response => this.setState({ wallets: response.data}))
      .catch(err => this.setState({ error: err.response.data.message }) )
  }

  fetchBlocks() {
    let blocksCopy = [];

    this.blocksRef.map().once(function(block) {
      let data = _.pick(block, ["#", "header", "transactionCounter", "miner", "miningReward", "hash"]);
      blocksCopy.push(data);
    });

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
    this.fetchBlocks();
    this.fetchTransactions();
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Homepage />} />
          <Route path="/auth" render={(routerProps) => <Auth {...routerProps} updateUser={this.updateLoggedInUser} />} />
          <Route path="/user" render={() => <Private user={this.state.loggedInUser} transactions={this.state.transactions} wallets={this.state.wallets} blocks={this.state.blocks} />} />
          <Route path="/legal" component={Legal} />
        </Switch>
      </div>
  );}
}


export default App;
