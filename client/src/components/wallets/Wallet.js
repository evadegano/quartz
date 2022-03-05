import { Component } from "react";
import { Link } from "react-router-dom";
import { UilCopy } from '@iconscout/react-unicons';
import { getBalance, getMinedBlocks, timestampsToDate } from "../../services/helpers";


class Wallet extends Component {
  state = {
    displayInfo: false,
    balance: 0,
    minedBlocks: 0,
    date: "",
    tooltipTxt: "Copy to clipboard"
  }

  copyTxt = () => {
    navigator.clipboard.writeText(this.props.address);
    this.setState({
      tooltipTxt: "Address copied to  clipboard!"
    })
  };

  componentDidMount() {
    const balance = getBalance(this.props.transactions, this.props.address);
    const minedBlocks = getMinedBlocks(this.props.blocks, this.props.address);
    const date = timestampsToDate(this.props.lastSeen);

    this.setState({
      balance,
      minedBlocks,
      date
    })
  }

  render() {
    return (
      <div className="table-row">

        <div className="table-col">
          <div className="small-row-container tooltip">
            <div className="trunc-txt">
              <span className="emph-txt">Address: </span>
              <Link to={`/wallets/${this.props.address}`}>{this.props.address}</Link>
            </div>

            <button 
              className="copy-btn" 
              onClick={this.copyTxt}
              onMouseEnter={() => this.setState({ 
                tooltipTxt: "Copy to clipboard",
                displayInfo: true 
              })}
              onMouseLeave={() => this.setState({ displayInfo: false })}>
              <UilCopy size="20" color="#AAAAAA" />
            </button>
            
            {this.state.displayInfo && <span className="tooltiptext">{this.state.tooltipTxt}</span>}
          </div>

          <div className="trunc-txt">
            <span className="emph-txt">Name: </span>
            <Link to={`/wallets/${this.props.address}`}>{this.props.name}</Link>
          </div>
        </div>

        <div className="table-col">
          <div><span className="emph-txt">Balance: </span>{this.state.balance} QRTZ</div>
          <div><span className="emph-txt">Blocks mined: </span>{this.state.minedBlocks}</div>
        </div>

        <div className="table-col desktop-only">
          <div><span className="emph-txt">Active: </span>{this.props.active ? "true" : "false"}</div>
          <div><span className="emph-txt">Last seen: </span>{this.state.date}</div>
        </div>

      </div>
    );
  }
}


export default Wallet;