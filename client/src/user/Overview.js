import { Component } from "react";
import Header from "./Header";
import TransferBtns from "./TransferBtns";
import Transactions from "../transactions/Transactions";
import Balance from "./Balance";
import MiningStats from "./MiningStats";


class Overview extends Component {
  filterTransactions = (walletKey) => {
    const userTransactions = this.props.transactions.filter(transac => transac.fromPublicKey === walletKey || transac.toPublicKey === walletKey);
    return userTransactions;
  }

  render() {
    const walletAddress = this.props.match.params.walletId;
    const userTransactions = this.filterTransactions(walletAddress);
    // modify function with output and input transactions
    //const userBalance = getWalletBalance(this.props.transactions, this.props.userWallet);

    return (
      <main>
        <Header title="Good morning!" userId={this.props.user._id} />
        <div>
          <h2 className="subtitle">Wallet: {walletAddress}</h2>
          <select name="wallets">
            {this.props.userWallets.map(wallet => <option key={wallet} value={wallet}>{wallet}</option>)}
          </select>
          <button>ADD WALLET</button>
        </div>

        <div className="columns centered-row-container">
          <div className="column">
            <Balance balance="" />
            <Transactions transactions={userTransactions} />
          </div>

          <div className="column">
            <TransferBtns walletAddress={walletAddress} />
            <MiningStats />
          </div>
        </div>
      </main>
    );
  }
}


export default Overview;