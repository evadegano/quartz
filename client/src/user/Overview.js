import { Component } from "react";
import Header from "./Header";
import TransferBtns from "./TransferBtns";
import Transactions from "../transactions/Transactions";
import Balance from "./Balance";
import MiningStats from "./MiningStats";
import { getWalletBalance } from "../services/blockchain-service";


class Overview extends Component {
  filterTransactions = (walletKey) => {
    const userTransactions = this.props.transactions.filter(transac => transac.fromPublicKey === walletKey || transac.toPublicKey === walletKey);
    return userTransactions;
  }

  render() {
    const walletAddress = this.props.match.params.walletId;
    // get wallet key from url instead
    const userTransactions = this.filterTransactions(walletAddress);
    // modify function with output and input transactions
    //const userBalance = getWalletBalance(this.props.transactions, this.props.userWallet);

    return (
      <main>
        <Header title="Good morning!" subtitle={`Account: ${walletAddress}`} userId={this.props.user._id} />

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