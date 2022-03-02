import { Component } from "react";
import SideNavbar from "./components/navbars/SideNavbar";
import BottomNavbar from "./components/navbars/BottomNavbar";
import Header from "./components/user/Header";
import PendingTransactions from "./components/transactions/PendingTransactions";
import Transactions from "./components/transactions/Transactions";


class TxPages extends Component {
  getPendingTx = () => {
    const pendingTx = this.props.transactions.filter(tx => tx.status === "pending");

    return pendingTx;
  }

  render() {
    const pendingTx = this.getPendingTx();

    return (
      <div className="outer-container">
        <SideNavbar user={this.props.user} />

        <div className="inner-container inner-page">
          <Header userId={this.props.user._id} notifs={this.props.notifs} title="Transactions" />

          <PendingTransactions 
            pendingTx={pendingTx} 
            gun={this.gun}
            transactions={this.props.transactions}
            blockchain={this.props.blockchain}
            fetchNotifs={this.props.fetchNotifs} />

          <Transactions transactions={this.props.transactions} />
        </div>

        <BottomNavbar user={this.props.user} />
      </div>
    );
  }
}


export default TxPages;