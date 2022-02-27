import { Component } from "react";
import { Link } from "react-router-dom";
import { timestampsToDate } from "../../services/helpers";


class Block extends Component {
  state = {
    date: ""
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

            <div className="trunc-txt">
              <b>Hash: </b>
              <Link to={`/blocks/${this.props.hash}`}>{this.props.hash}</Link>
            </div>

            <div className="trunc-txt">
              <b>Prev block: </b>
              <Link to={`/blocks/${this.props.prevBlock}`}>{this.props.prevBlock}</Link>
            </div>

            <div><b>Date:</b> {this.state.date}</div>
        </div>

        <div className="table-col">
          <div><b>Miner:</b> {this.props.miner}</div>
          <div><b>Reward:</b> {this.props.reward} QRTZ</div>
          <div><b>Height:</b> {this.props.height}</div>
        </div>
      </div>
    );
  }
}


export default Block;