import { Component } from "react";
import { Link } from "react-router-dom";
import { timestampsToDate } from "../../services/helpers";


class Block extends Component {
  render() {
    // convert timestamps to date
    const date = timestampsToDate(this.props.date);

    return (
      <div className="table-row">
        <div className="table-col">

            <div className="trunc-txt">
              <b>Hash: </b>
              <Link to={`/blocks/${this.props.hash}`}>{this.props.hash}</Link>
            </div>

            <div className="trunc-txt">
              <b>Prev block: </b>
              { 
                this.props.prevBlock === "null - genesis block"
                ? <span>{this.props.prevBlock}</span>
                : <Link to={`/blocks/${this.props.prevBlock}`}>{this.props.prevBlock}</Link>
              }
            </div>

            <div><b>Date:</b> {date}</div>
        </div>

        <div className="table-col">
          <div className="trunc-txt">
            <b>Miner: </b>
              { 
                !this.props.miner
                ? <span>null</span>
                : <Link to={`/wallets/${this.props.miner}`}>{this.props.miner}</Link>
              }
          </div>
          <div><b>Reward:</b> {this.props.reward} QRTZ</div>
          <div><b>Height:</b> {this.props.height}</div>
        </div>
      </div>
    );
  }
}


export default Block;