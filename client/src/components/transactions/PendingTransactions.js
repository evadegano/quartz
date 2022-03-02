import { Component } from "react";
import { processTx } from "../../services/transaction-service";
import Transaction from "./Transaction";

// remove once in prod
import wallets from "../../bin/wallets.json";



class Transactions extends Component {
  constructor({ gun }) {
    super()
    this.gun = gun;
    this.blockchainRef = gun.get("blockchain");
    this.blocksRef = this.blockchainRef.get("ledger");
    this.transacsRef = this.gun.get("transactions");
    this.notifsRef = this.gun.get("notifications");
    
    this.state = {
      error: "",
      success: ""
    };
  }

  processTx = (event) => {
    // delete once in prod
    const walletAddress = wallets[Math.round(Math.random() * wallets.length)].address;

    try {
      const [ confirmedTx, rejectedTx, rewardTx ] = processTx(this.gun, this.props.blockchain, this.blockchainRef, this.blocksRef, this.props.pendingTx, walletAddress, new Date().getTime());

      for (let tx of confirmedTx) {

        if (!tx.fromAddress.includes("null")) {
          const newNotif1 = {
            message: `Your transaction of ${tx.amount} QRTZ has been confirmed.`,
            user: tx.fromAddress
          };

          const newNotif2 = {
            message: `You have received ${tx.amount} QRTZ.`,
            user: tx.toAddress
          };

          this.notifsRef.set(newNotif1);
          this.notifsRef.set(newNotif2);
        }

        const newNotif = {
          message: `${tx.amount} QRTZ were added to your account.`,
          user: tx.toAddress
        };
        
        this.notifsRef.set(newNotif);
      }

      this.setState({
        error: rejectedTx,
        success: {
          confirmedTx,
          rewardTx
        }
      });

      // update notifs global state
      this.props.fetchNotifs();
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
          
          {this.props.pendingTx.length > 0 && <button className="main-btn" onClick={this.processTx}>VERIFY & MINE</button>}
        </div>
      </div>
    );
  }
}

// add error, success message
// display something when no pending tx

export default Transactions;