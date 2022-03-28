import { Component } from "react";
import { Link } from "react-router-dom";
import { timestampsToDate } from "../../services/helpers";


class Transaction extends Component {
  state = {
    date: "",
  }

  componentDidMount() {
    const date = timestampsToDate(this.props.date);

    this.setState({
      date
    })
  }

  render() {
    let fromWalletName, toWalletName;

    if (this.props.wallets) {
      // get sender's wallet name only if it's not a null sender address
      !this.props.from.includes("null") ? fromWalletName = this.props.wallets.find(wallet => wallet.address === this.props.from).name : fromWalletName = this.props.from;
      // get receiver's wallet name
      toWalletName = this.props.wallets.find(wallet => wallet.address === this.props.to).name;
    } else {
      fromWalletName = this.props.from;
      toWalletName = this.props.to;
    }
    
    return (
      <div className="table-row">
        <div className="table-col">
            <div className="trunc-txt">
              <span className="emph-txt"><b>Hash: </b></span> {this.props.hash}</div>
            
            <div className="trunc-txt">
              <span className="emph-txt">From: </span>
              { 
                this.props.from.includes("null")
                ? <span>{this.props.from}</span>
                : <Link to={`/wallets/${this.props.from}`}>{fromWalletName}</Link>
              }
            </div>

            <div className="trunc-txt">
              <span className="emph-txt">To: </span>
              <Link to={`/wallets/${this.props.to}`}>{toWalletName}</Link>
            </div>
        </div>

        <div className="table-col">
          <div><span className="emph-txt">Date:</span> {this.state.date}</div>
          <div><span className="emph-txt">Amount:</span> {Number(this.props.amount).toLocaleString('en-US')} QRTZ</div>
          <div><span className="emph-txt">Status:</span> {this.props.status}</div>
        </div>
      </div>
    );
  }
}


export default Transaction;