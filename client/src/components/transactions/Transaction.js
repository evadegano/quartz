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
    return (
      <div className="table-row">
        <div className="table-col">
            <div className="trunc-txt"><b>Hash: </b> {this.props.hash}</div>
            
            <div className="trunc-txt">
              <span className="emph-txt">From: </span>
              { 
                this.props.from === "null - bank transfer" 
                || this.props.from === "null - QRTZ reward" 
                ? <span>{this.props.from}</span>
                : <Link to={`/wallets/${this.props.from}`}>{this.props.from}</Link>
              }
            </div>

            <div className="trunc-txt">
              <span className="emph-txt">To: </span>
              <Link to={`/wallets/${this.props.to}`}>{this.props.to}</Link>
            </div>
        </div>

        <div className="table-col">
          <div><span className="emph-txt">Date:</span> {this.state.date}</div>
          <div><span className="emph-txt">Amount:</span> {this.props.amount} QRTZ</div>
          <div><span className="emph-txt">Status:</span> {this.props.status}</div>
        </div>
      </div>
    );
  }
}


export default Transaction;