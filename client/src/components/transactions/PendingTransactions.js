import { Component } from "react";
import { processTx } from "../../services/blockchain-service";
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

          <button className="main-btn" onClick={this.processTx}>VERIFY & MINE</button>
        </div>
        
      </div>
    );
  }
}

// add error, success message
// display something when no pending tx

export default Transactions;