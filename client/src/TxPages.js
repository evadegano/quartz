import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import SideNavbar from "./components/navbars/SideNavbar";
import Header from "./components/user/Header";
import PendingTransactions from "./components/transactions/PendingTransactions";
import Transactions from "./components/transactions/Transactions";


class TxPages extends Component {
  getPendingTx = () => {
    const pendingTx = this.props.transactions.filter(tx => tx.status === "pending");

    return pendingTx;
  };

  render() {
    const pendingTx = this.getPendingTx();

    return (
      <div className="outer-container">
        <SideNavbar user={this.props.loggedInUser} />

        <div className="inner-container">
          <Header title="Transactions" subtitle="" />

          <PendingTransactions pendingTx={pendingTx} />
          <Transactions transactions={this.props.transactions} />
        </div>
      </div>
    );
  }
}


export default TxPages;