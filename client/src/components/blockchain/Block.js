import { Component } from "react";
import { Link } from "react-router-dom";
import { timestampsToDate } from "../../services/helpers";


class Block extends Component {
  render() {
    // convert timestamps to date
    const date = timestampsToDate(this.props.date);

    // get miner's wallet name
    let minerWalletName;

    if (this.props.wallets) {
      minerWalletName = this.props.wallets.find(wallet => wallet.address === this.props.miner).name;
    } else {
      minerWalletName = this.props.miner;
    }

    return (
      <div className="table-row">
        <div className="table-col">

            <div className="trunc-txt">
              <span className="emph-txt">Hash: </span>
              <Link to="">{this.props.hash}</Link>
            </div>

            <div className="trunc-txt">
              <span className="emph-txt">Prev block: </span>
              { 
                this.props.prevBlock === "null - genesis block"
                ? <span>{this.props.prevBlock}</span>
                : <Link to="">{this.props.prevBlock}</Link>
              }
            </div>

            <div><span className="emph-txt">Date:</span> {date}</div>
        </div>

        <div className="table-col">
          <div className="trunc-txt">
            <span className="emph-txt">Miner: </span>
              { 
                !this.props.miner
                ? <span>null</span>
                : <Link to={`/wallets/${this.props.miner}`}>{minerWalletName}</Link>
              }
          </div>
          <div><span className="emph-txt">Reward:</span> {this.props.reward} QRTZ</div>
          <div><span className="emph-txt">Height:</span> {this.props.height}</div>
        </div>
      </div>
    );
  }
}


export default Block;