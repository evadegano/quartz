import { Component } from "react";
import { processTx } from "../../services/transaction-service";
import Transaction from "./Transaction";

// remove once in prod
import wallets from "../../bin/wallets.json";



class Transactions extends Component {
  constructor({ gun }) {
    super()
    this.gun = gun;
    this.blockchainRef = this.gun.get("blockchain");
    this.blocksRef = this.blockchainRef.get("ledger");
    this.transacsRef = this.gun.get("transactions");
    this.notifsRef = this.gun.get("notifications");
    
  }

  state = {
    error: "",
    success: "",
    isMining: false
  };

  processTx = (event) => {
    // update state
    this.setState({ isMining: true });

    // delete once in prod
    // const walletAddress = wallets[Math.round(Math.random() * wallets.length)].address;
    const walletAddress = this.props.user.activeWallet;

    try {
      const [ confirmedTx, rejectedTx, rewardTx ] = processTx(this.gun, this.props.blockchain, this.blockchainRef, this.blocksRef, this.props.pendingTx, walletAddress, new Date().getTime());

      console.log("confirmedTx, rejectedTx, rewardTx", confirmedTx, rejectedTx, rewardTx);

      for (let tx of confirmedTx) {

        if (!tx.fromAddress.includes("null")) {
          const newNotif1 = {
            message: `Your transaction of ${tx.amount} QRTZ has been confirmed.`,
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

          this.notifsRef.set(newNotif1);
          this.notifsRef.set(newNotif2);
        }

        const newNotif = {
          message: `${tx.amount} QRTZ were added to your account.`,
          user: tx.toAddress,
          isRead: false,
          timestamps: new Date().getTime()
        };
        
        this.notifsRef.set(newNotif);
      }

      this.setState({
        error: rejectedTx,
        success: {
          confirmedTx,
          rewardTx
        },
        isMining: false
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
          {
            this.state.isMining
            ? <h3>Mining in progress</h3>
            : <h3>{this.props.pendingTx.length} pending { this.props.pendingTx.length > 1 ? "transactions" : "transaction"}</h3>
          }
          
          <div className="no-overflow-container">

            {!this.state.isMining && this.props.pendingTx.map((tx, idx) => {
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