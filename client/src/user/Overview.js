import { Component } from "react";
import Header from "../global/Header";
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
    // get walle tkey from url instead
    const userTransactions = this.filterTransactions(this.props.userWallet);
    // modify function with output and input transactions
    const userBalance = getWalletBalance(this.props.transactions, this.props.userWallet);

    return (
      <main>
        <Header title="Good morning!" subtitle={`Account: ${this.props.userWallet}`} userId={this.props.user} />

        <div className="columns centered-row-container">
          <div className="column">
            <Balance balance={userBalance} />
            <Transactions transactions={userTransactions} />
          </div>

          <div className="column">
            <TransferBtns />
            <MiningStats />
          </div>
        </div>
      </main>
    );
  }
}


export default Overview;