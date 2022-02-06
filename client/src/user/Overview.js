import { Component } from "react";
import Header from "../global/Header";
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
    const userTransactions = this.filterTransactions(this.props.userWallet.publicKey);

    return (
      <main>
        <Header title="Good morning!" subtitle={`Account: ${this.props.userWallet.publicKey}`} />

        <div className="columns centered-row-container">
          <div className="column">
            <Balance />
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