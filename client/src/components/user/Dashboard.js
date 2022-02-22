import { Component } from "react";
import { getWalletBalance } from "../../services/blockchain-service";
import { postWallets, putWallet, generateWallet } from "../../services/user-service";
import Header from "./Header";
import TransferBtns from "./TransferBtns";
import Transactions from "../transactions/Transactions";
import Balance from "./Balance";
import MiningStats from "./MiningStats";


class Dashboard extends Component {
  state = {
    balance: "",
    error: "",
    greeting: ""
  }

  // adapt greeting message depending on the time of day
  updateGreeting = () => {
    const date = new Date();
    const hours = date.getHours();

    if (hours > 2 && hours < 12) {
      this.setState({ greeting: "Good morning!"});
    } else if (hours < 18) {
      this.setState({ greeting: "Good afternoon!"});
    } else {
      this.setState({ greeting: "Good evening!"});
    }
  }

  // calculate wallet's balance
  fetchWalletBalance = () => {
    const walletAddress = this.props.match.params.walletId;
    const balance = getWalletBalance(walletAddress);

    this.setState({ balance });
  }

  // get user's transactions
  filterTransactions = (walletKey) => {
    const userTransactions = this.props.transactions.filter(transac => transac.fromPublicKey === walletKey || transac.toPublicKey === walletKey);
    return userTransactions;
  }

  // create a new wallet for the user
  createNewWallet = (event) => {
    const [ walletAddress, publicKey, privateKey ] = generateWallet();
    const userId = this.props.user._id;
    let loggedInUserCopy = this.props.user;

    // store wallet signing keys in local storage
    localStorage.setItem(walletAddress, {
      publicKey,
      privateKey
    });

    // set new wallet as user's active wallet
    loggedInUserCopy["activeWallet"] = walletAddress;

    postWallets(userId, walletAddress)
      .then(response => {
        // update active wallet in logged in user global state
        this.props.updateUser(loggedInUserCopy);

        // redirect to wallet's dashboard
        this.props.history.push(`/user/${response.walletAddress}`);
      })
      .catch((err) => this.setState({ error: err.response.data.message }))
  }

  // update the user's active wallet
  updateWallet = (event) => {
    const { value } = event.target;

    putWallet(value)
      .then(response => {
        // update active wallet in logged in user global state
        const loggedInUserCopy = this.props.user;
        loggedInUserCopy["activeWallet"] = response;
        this.props.updateUser(loggedInUserCopy);

        // redirect to the selected wallet's dashboard
        this.props.history.push(`/user/${response}`);
      })
      .catch(err => this.setState({error: err.response.data.message}))
  }

  // update component's state on mounting
  componentDidMount() {
    this.fetchWalletBalance();
    this.updateGreeting();
  }

  render() {
    const walletAddress = this.props.match.params.walletId;
    const userTransactions = this.filterTransactions(walletAddress);
    //const userBalance = getWalletBalance(this.props.transactions, this.props.userWallet);

    return (
      <div className="inner-container">
        <Header title={this.state.greeting} userId={this.props.user._id} />

        <div>
          <h2 className="subtitle">Wallet: {walletAddress}</h2>

          <select name="wallets" onChange={this.updateWallet}>
            {this.props.userWallets.map(wallet => <option key={wallet.address} value={wallet.address}>{wallet.address}</option>)}
          </select>

          <button onClick={this.createNewWallet}>ADD WALLET</button>
        </div>

        <div className="columns centered-row-container">
          <div className="column">
            <Balance balance={this.state.balance} />
            <Transactions transactions={userTransactions} />
          </div>

          <div className="column">
            <TransferBtns walletAddress={walletAddress} />
            <MiningStats />
          </div>
        </div>
      </div>
    );
  }
}


export default Dashboard;