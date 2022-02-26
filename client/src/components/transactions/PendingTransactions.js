import { Component } from "react";
import { processTx } from "../../services/transaction-service";
import Transaction from "./Transaction";


class Transactions extends Component {
  state = {
    error: "",
    success: ""
  };

  processTx = (event) => {
    try {
      const { confirmedTx, rejectedTx, rewardTx } = processTx();

      this.setState({
        error: rejectedTx,
        success: {
          confirmedTx,
          rewardTx
        }
      });
    }
    catch(error) {
      this.setState({ error });
    }
  };

  render() {
    return (
      <div className="pending-tx">
        <h2>Pending transactions</h2>

        <div className="inner-container filled-table">
          <table>
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {this.props.pendingTx.map(tx => {
                return (
                  <tr key={tx.hash}>
                    <td className="trunc-txt">{tx.header.fromAddress}</td>
                    <td className="trunc-txt">{tx.header.toAddress}</td>
                    <td>{tx.header.amount}</td>
                    <td>{tx.header.timestamps}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <button className="main-btn" onClick={this.processTx}>VERIFY & MINE</button>
        </div>
        
      </div>
    );
  }
}

// add error, success message
// display something when no pending tx

export default Transactions;