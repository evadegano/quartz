import { Component } from "react";
import Transaction from "./Transaction";
import { mineBlock } from "../services/blockchain-service";


class Transactions extends Component {
  filterPendingTxs = () => {
    return this.props.transactions.filter(tx => !tx.isConfirmed);
  }

  handleClick = () => {
    const pendingTxs = this.filterPendingTxs();

    try {
      mineBlock(pendingTxs);
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    const pendingTxs = this.filterPendingTxs();

    return (
      <div>
        {pendingTxs.map(tx => {
          return <Transaction 
                    key={tx["_"]["#"]} 
                    amount={tx.header.amount} 
                    from={tx.header.fromAddress} 
                    to={tx.header.toAddress} 
                    date={tx.header.timestamps} />
        })}
        <button onClick={this.handleClick}>MINE</button>

        <Transaction />
      </div>
    )
  ;}
}


export default Transactions;