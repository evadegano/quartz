import { Component } from "react";
import { Link } from "react-router-dom";
import { UilArrowUpRight } from '@iconscout/react-unicons';
import { getBalance } from "../../services/helpers";
import QRCode from "qrcode";
import Header from "../navbars/Header";
import Transactions from "../transactions/Transactions";
import Balance from "../user/Balance";



class WalletDetails extends Component {
  state = {
    balance: "",
  }

  getWalletName = () => {
    const walletAddress = this.props.match.params.walletId;
    let walletName = this.props.wallets.find(wallet => wallet.address === walletAddress);
    walletName = walletName.name;

    return walletName;
  }

  // calculate wallet's balance
  fetchWalletBalance = () => {
    const walletAddress = this.props.match.params.walletId;
    const balance = getBalance(this.props.transactions, walletAddress);

    this.setState({ balance });
  }

  // get user's transactions
  filterTransactions = (walletAddress) => {
    const userTransactions = this.props.transactions.filter(transac => transac.fromAddress === walletAddress || transac.toAddress === walletAddress);
    
    return userTransactions;
  }

  componentDidMount() {
    this.fetchWalletBalance();
  }

  render() {
    const walletAddress = this.props.match.params.walletId;
    const walletName = this.getWalletName();
    const userTransactions = this.filterTransactions(walletAddress);

    if (!this.state.balance) return <div>Loading...</div>

    return (
      <div id="dashboard" className="inner-container inner-page">
        <Header 
          title={`Wallet: ${walletName}`} 
          activeWallet={this.props.activeWallet} 
          notifs={this.props.notifs} 
          fetchNotifs={this.props.fetchNotifs}
          gun={this.props.gun} />

        <div className="row-container">
          <Balance balance={this.state.balance} />
          
          <div>
            <div className="stats-header">
              <h2>Send QRTZ</h2>
            </div>

            <div className="center-row-container">
              <Link className="transfer-btn" to={`/user/${this.props.activeWallet}/send-coins?toAddress=${walletAddress}`} >
                <UilArrowUpRight size="60" color="#000" />
                Send
              </Link>
            </div>
          </div>
        </div>

        <Transactions transactions={userTransactions} />
      </div>
    );
  }
}


export default WalletDetails;