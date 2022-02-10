import { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { loggedIn } from './services/auth-service';
import { getTransactions, getBlocks, getWallets } from './services/blockchain-service';
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
  }

  state = {
    loggedInUser: null,
    wallets: [],
    transactions: [],
    blocks: []
  }

  createTransac = () => {
    const newTransac = {
      amount: Math.round(Math.random() * 100),
      fromPublicKey: "Eva",
      toPublicKey: "Santa"
    };

    this.transacsRef.set(newTransac);

    const transactionsCopy = [];

    this.transacsRef.map().on(function(transac) {
      let data = _.pick(transac, ["amount", "fromPublicKey", "toPublicKey"]);
      transactionsCopy.push(data);
    })

    this.setState({
      transactions: transactionsCopy
    }) 
  } 

  updateLoggedInUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      loggedIn()
        .then(response => {
          this.setState({
            loggedInUser: response
          })
        })
        .catch((err) => {
          this.setState({
            loggedInUser: false
          })
        })
    }
  }

  fetchWallets() {
    getWallets()
      .then(response => {
        this.setState({
          wallets: response
        })
      })
      .catch(() => console.log("Something went wrong when retrieving wallets."))
  }

  fetchBlocks() {
    getBlocks()
      .then(response => {
        this.setState({
          blocks: response
        })
      })
      .catch(() => console.log("Something went wrong when retrieving blocks."))
  }

  fetchTransactions() {
    getTransactions()
      .then(response => {
        this.setState({
          transactions: response
        })
      })
      .catch(() => console.log("Something went wrong when retrieving transactions."))
  }

  componentDidMount() {
  // //   this.fetchUser();
  // //   this.fetchWallets();
  // //   this.fetchBlocks();
  // //   this.fetchTransactions();
    const transactionsCopy = [];

    this.transacsRef.map().on(function(transac) {
      let data = _.pick(transac, ["amount", "fromPublicKey", "toPublicKey"]);
      transactionsCopy.push(data);
    })

    this.setState({
      transactions: transactionsCopy
    }) 
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.createTransac}>Create transac</button>

        {this.state.transactions.map((transac, idx) => {
          return <div key={idx}>{transac.amount}, {transac.fromPublicKey}, {transac.toPublicKey}</div>
        })}
        
        <Switch>
          <Route exact path="/" render={() => <Homepage gun={this.gun} />} />
          <Route path="/auth" render={() => <Auth updateUser={this.updateLoggedInUser} />} />
          <Route path="/user" render={() => <Private user={this.state.loggedInUser} transactions={this.state.transactions} wallets={this.state.wallets} blocks={this.state.blocks} />} />
          <Route path="/legal" component={Legal} />
        </Switch>
      </div>
  );}
}


export default App;
