import { Component } from "react";
import { Link } from "react-router-dom";


class Transaction extends Component {
  render() {
    return (
      <div className="table-row">
        <div className="table-col">
            <div className="trunc-txt"><b>Hash: </b> {this.props.hash}</div>
            
            <div className="trunc-txt">
              <b>From: </b>
              <Link to={`/wallets/${this.props.from}`}>{this.props.from}</Link>
            </div>

            <div className="trunc-txt">
              <b>To: </b>
              <Link to={`/wallets/${this.props.to}`}>{this.props.to}</Link>
            </div>
        </div>

        <div className="table-col">
          <div><b>Date:</b> {this.props.date}</div>
          <div><b>Amount:</b> {this.props.amount} QRTZ</div>
          <div><b>Status:</b> {this.props.status}</div>
        </div>
      </div>
    );
  }
}


export default Transaction;