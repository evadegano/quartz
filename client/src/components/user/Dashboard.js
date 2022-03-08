import { Component } from "react";
import { getBalance } from "../../services/helpers";
import QRCode from "qrcode";
import { postWallets, putWallet } from "../../services/user-service";
import Header from "../navbars/Header";
import TransferBtns from "./TransferBtns";
import Transactions from "../transactions/Transactions";
import Balance from "./Balance";



class Dashboard extends Component {
  state = {
    balance: "",
    error: "",
    greeting: ""
  }

  /*
    Adapt greeting message based on the time of day
  */
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

  /*
    Calculate wallet's balance
  */
  fetchWalletBalance = () => {
    const walletAddress = this.props.match.params.walletId;
    const balance = getBalance(this.props.transactions, walletAddress);

    this.setState({ balance });
  }

  /* 
   Get user's transactions
  */
  filterTransactions = (walletAddress) => {
    const userTransactions = this.props.transactions.filter(transac => transac.fromAddress === walletAddress || transac.toAddress === walletAddress);
    
    return userTransactions;
  }

  componentDidMount() {
    this.fetchWalletBalance();
    this.updateGreeting();
  }

  render() {
    const walletAddress = this.props.match.params.walletId;
    const userTransactions = this.filterTransactions(walletAddress);

    if (!this.state.balance) return <div>Loading...</div>

    return (
      <div id="dashboard" className="inner-container inner-page">
        <Header 
          title={this.state.greeting} 
          activeWallet={walletAddress} 
          notifs={this.props.notifs} 
          updateUser={this.props.updateUser}
          fetchNotifs={this.props.fetchNotifs}
          gun={this.props.gun} />

        <div className="row-container">
          <Balance balance={this.state.balance} transactions={userTransactions} />
          
          <TransferBtns walletAddress={walletAddress} />
          
        </div>

        <Transactions transactions={userTransactions} />
      </div>
    );
  }
}


export default Dashboard;