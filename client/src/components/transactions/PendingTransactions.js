import { Component } from "react";
import { processTx } from "../../services/transaction-service";
import Transaction from "./Transaction";


class Transactions extends Component {
  constructor({ gun }) {
    super()
    this.gun = gun;
    this.blockchainRef = this.gun.get("blockchain");
    this.blocksRef = this.blockchainRef.get("ledger");
    this.transacsRef = this.gun.get("transactions");
    this.notifsRef = this.gun.get("notifications");
    
    this.state = {
      error: "",
      success: "",
      isMining: false
    }
  }

  /*
    Process pending transactions
  */
  processTx = async (event) => {
    // set state to mining
    this.setState({ isMining: true });

    // delete once in prod
    // const walletAddress = wallets[Math.round(Math.random() * wallets.length)].address;
    const walletAddress = this.props.user.activeWallet;

    try {
      const [ confirmedTx, rejectedTx, rejectionErrors, rewardTx ] = await processTx(this.gun, this.props.blockchain, this.props.pendingTx, walletAddress, this.props.transactions);

      // reset state
      this.setState({ isMining: false });

      // loop through confirmed transactions and generate notifications
      for (let tx of confirmedTx) {
        
        if (!tx.fromAddress.includes("null")) {
          const newNotif1 = {
            message: `Your outgoing transaction of ${tx.amount} QRTZ was confirmed.`,
            user: tx.fromAddress,
            isRead: false,
            timestamps: new Date().getTime()
          };

          const newNotif2 = {
            message: `You have received ${tx.amount} QRTZ.`,
            user: tx.toAddress,
            isRead: false,
            timestamps: new Date().getTime()
          };

          // add notifications to Gun and user the user address and timestamps as a unique ID
          this.notifsRef.set(this.gun.get(newNotif1.user + newNotif1.timestamps).put(newNotif1));
          this.notifsRef.set(this.gun.get(newNotif2.user + newNotif2.timestamps).put(newNotif2));

        } else {
          const newNotif = {
            message: `${tx.amount} QRTZ were added to your account.`,
            user: tx.toAddress,
            isRead: false,
            timestamps: new Date().getTime()
          };

          console.log("newNotif", newNotif);
          
          // add notification to Gun and user the user address and timestamps as a unique ID
          this.notifsRef.set(this.gun.get(newNotif.user + newNotif.timestamps).put(newNotif));
        }
      }
      
      for (let tx of rejectedTx) {

        if (!tx.fromAddress.includes("null")) {
          const newNotif1 = {
            message: `Your outgoing transaction of ${tx.amount} QRTZ was rejected for ${rejectionErrors[tx.hash]}.`,
            user: tx.fromAddress,
            isRead: false,
            timestamps: new Date().getTime()
          };

          const newNotif2 = {
            message: `Your incoming transaction of ${tx.amount} QRTZ was rejected for ${rejectionErrors[tx.hash]}.`,
            user: tx.toAddress,
            isRead: false,
            timestamps: new Date().getTime()
          };

          // add notifications to Gun and user the user address and timestamps as a unique ID
          this.notifsRef.set(this.gun.get(newNotif1.user + newNotif1.timestamps).put(newNotif1));
          this.notifsRef.set(this.gun.get(newNotif2.user + newNotif2.timestamps).put(newNotif2));

        } else {
          const newNotif = {
            message: `Your purschase of ${tx.amount} QRTZ was rejected for ${rejectionErrors[tx.hash]}.`,
            user: tx.toAddress,
            isRead: false,
            timestamps: new Date().getTime()
          };
          
          this.notifsRef.set(newNotif);
        }        
      }

      // send a notification to the user who receives the reward
      const newRwrdNotif = {
        message: `${rewardTx.amount} QRTZ have been issued for you as a reward for mining a block.`,
          user: rewardTx.toAddress,
          isRead: false,
          timestamps: new Date().getTime()
        };

      // add notification to Gun and user the user address and timestamps as a unique ID
      this.notifsRef.set(this.gun.get(newRwrdNotif.user + newRwrdNotif.timestamps).put(newRwrdNotif));

      // update the transactions global state 
      this.props.fetchTx();

      // update the notifs global state
      this.props.fetchNotifs();
    }
    catch(err) {
      console.log(err);

      this.setState({ error: err });
    }
  };

  componentDidMount() {
    this.setState({ isMining: false });
  }

  render() {
    const pendingTx = this.props.pendingTx.sort((a, b) => b.timestamps - a.timestamps);

    return (
      <div className="pending-tx">
        <h2>Pending transactions</h2>

        <div className="inner-container filled-table">
          {
            this.state.isMining
            ? <h3>Mining in progress</h3>
            : <h3>{this.props.pendingTx.length} pending { this.props.pendingTx.length > 1 ? "transactions" : "transaction"}</h3>
          }
          
          <div className="no-overflow-container">

            {!this.state.isMining && pendingTx.map((tx, idx) => {
              return <Transaction 
                        key={idx} 
                        hash={tx.hash} 
                        from={tx.fromAddress} 
                        to={tx.toAddress}
                        amount={tx.amount} 
                        date={tx.timestamps}
                        status={tx.status} />
            })}

            {
              this.state.isMining && 
              <div className="center-row-container">
                <div className="dot-collision"></div>
              </div>
            }
          </div>
          
          {
            this.props.pendingTx.length > 0 && !this.state.isMining
            && <button className="main-btn" onClick={this.processTx}>VERIFY & MINE</button>
          }
          {
            this.state.isMining
            && <button className="main-btn" disabled={true}>VERIFY & MINE</button>
          }
          
        </div>
      </div>
    );
  }
}


export default Transactions;