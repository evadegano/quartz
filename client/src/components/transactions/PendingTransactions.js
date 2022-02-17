import { Component } from "react";
import Transaction from "./Transaction";


class Transactions extends Component {
  render() {
    return (
      <div className="pending-tx">
        <h2>Pending transactions</h2>

        <div className="inner-container filled-table">
          <table>
            <thead>
              <tr>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Amount</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {this.props.pendingTx.map(tx => {
                return <Transaction 
                          key={tx.hash} 
                          from={tx.header.fromAddress} 
                          to={tx.header.toAddress} 
                          amount={tx.header.amount}
                          date={tx.header.timestamps}/>
              })}
            </tbody>
          </table>

          <button className="main-btn">VERIFY & MINE</button>
        </div>
        
      </div>
    );
  }
}


export default Transactions;