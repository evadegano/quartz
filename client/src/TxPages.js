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
          <Header 
            activeWallet={this.props.user.activeWallet}  
            title="Transactions"
            notifs={this.props.notifs} 
            fetchNotifs={this.props.fetchNotifs}
            gun={this.props.gun} />

          <PendingTransactions 
            user={this.props.user}
            pendingTx={pendingTx} 
            gun={this.props.gun}
            transactions={this.props.transactions}
            blockchain={this.props.blockchain}
            fetchNotifs={this.props.fetchNotifs}
            fetchTx={this.props.fetchTx} />

          <Transactions transactions={this.props.transactions} />
        </div>

        <BottomNavbar user={this.props.user} />
      </div>
    );
  }
}


export default TxPages;