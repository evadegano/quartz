import { Component } from "react";
import { processTx } from "../../services/transaction-service";
import Transaction from "./Transaction";
import Blockchain from "../../services/classes/blockchain";

// remove once in prod
import wallets from "../../bin/wallets.json";



class Transactions extends Component {
  constructor({ gun }) {
    super()
    this.gun = gun;
    this.blockchain = Blockchain.instance;
    this.blockchainRef = gun.get(this.blockchain); // is it the right way to do it?
    this.blocksRef = this.blockchainRef.get("ledger").set(this.blockchain.ledger);
    this.transacsRef = this.gun.get("transactions");
    
    this.state = {
      error: "",
      success: ""
    };
  }

  processTx = (event) => {
    const walletAddress = wallets[Math.round(Math.random() * wallets.length)].address;

    try {
      const { confirmedTx, rejectedTx, rewardTx } = processTx(this.gun, this.props.blockchain, this.blocksRef, this.props.pendingTx, walletAddress, new Date(2021, 11, 20));

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
          <h3>{this.props.pendingTx.length} transactions pending</h3>

          <div className="no-overflow-container">
            {this.props.pendingTx.map((tx, idx) => {
              return <Transaction 
                        key={idx} 
                        hash={tx.hash} 
                        from={tx.fromAddress} 
                        to={tx.toAddress}
                        amount={tx.amount} 
                        date={tx.timestamps}
                        status={tx.status} />
            })}
          </div>
          
          <button className="main-btn" onClick={this.processTx}>VERIFY & MINE</button>
        </div>
      </div>
    );
  }
}

// add error, success message
// display something when no pending tx

export default Transactions;