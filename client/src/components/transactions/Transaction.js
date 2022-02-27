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
              <b>From: </b>
              { 
                this.props.from === "null - bank transfer" 
                || this.props.from === "null - QRTZ reward" 
                ? <span>{this.props.from}</span>
                : <Link to={`/wallets/${this.props.from}`}>{this.props.from}</Link>
              }
            </div>

            <div className="trunc-txt">
              <b>To: </b>
              <Link to={`/wallets/${this.props.to}`}>{this.props.to}</Link>
            </div>
        </div>

        <div className="table-col">
          <div><b>Date:</b> {this.state.date}</div>
          <div><b>Amount:</b> {this.props.amount} QRTZ</div>
          <div><b>Status:</b> {this.props.status}</div>
        </div>
      </div>
    );
  }
}


export default Transaction;