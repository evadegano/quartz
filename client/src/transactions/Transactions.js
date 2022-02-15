import { Component } from "react";
import Transaction from "./Transaction";
import { processTx } from "../services/blockchain-service";


class Transactions extends Component {
  state = {
    message: ""
  }

  filterPendingTxs = () => {
    return this.props.transactions.filter(tx => tx.status === "pending");
  }

  handleClick = () => {
    const pendingTxs = this.filterPendingTxs();

    try {
      processTx(pendingTxs);
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

        {this.props.transactions.map(tx => {
          return <Transaction
                    key={tx["_"]["#"]}
                    amount={tx.header.amount} 
                    from={tx.header.fromAddress} 
                    to={tx.header.toAddress}
                    date={tx.header.timestamps}
                    status={tx.status} />
        })}
      </div>
    )
  ;}
}


export default Transactions;