import { Component } from "react";
import SideNavbar from "./components/navbars/SideNavbar";
import BottomNavbar from "./components/navbars/BottomNavbar";
import Header from "./components/user/Header";
import PendingTransactions from "./components/transactions/PendingTransactions";
import Transactions from "./components/transactions/Transactions";
import gun from "gun";
import Blockchain from "./services/classes/blockchain";



class TxPages extends Component {
  constructor({ gun }) {
    super()
    this.gun = gun;
    this.blockchain = Blockchain.instance;
    this.blockchainRef = gun.get(this.blockchain); // is it the right way to do it?
    this.blocksRef = this.blockchainRef.get("ledger").set(this.blockchain.ledger);
    this.transacsRef = this.gun.get("transactions");
  }

  getPendingTx = () => {
    const pendingTx = this.props.transactions.filter(tx => tx.status === "pending");

    return pendingTx;
  };

  render() {
    const pendingTx = this.getPendingTx();

    return (
      <div className="outer-container">
        <SideNavbar user={this.props.user} />

        <div className="inner-container inner-page">
          <Header userId={this.props.user._id} title="Transactions" subtitle="" />

          <PendingTransactions 
            pendingTx={pendingTx} 
            gun={this.gun}
            transactions={this.props.transactions}
            blockchain={this.props.blockchain} />

          <Transactions transactions={this.props.transactions} />
        </div>

        <BottomNavbar user={this.props.user} />
      </div>
    );
  }
}


export default TxPages;