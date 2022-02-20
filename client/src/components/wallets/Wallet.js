import { Component } from "react";
import { Link } from "react-router-dom";
import { UilCopy } from '@iconscout/react-unicons'


class Wallet extends Component {
  state = {
    displayInfo: false,
    tooltipTxt: "Copy to clipboard"
  }

  copyTxt = () => {
    navigator.clipboard.writeText(this.props.address);
    this.setState({
      tooltipTxt: "Address copied to  clipboard!"
    })
  };

  render() {
    return (
      <div className="table-row">
        <div className="table-col">
          <div className="small-row-container tooltip">
            <div className="trunc-txt">
              <b>Address: </b>
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
            <b>Name: </b>
            <Link to={`/wallets/${this.props.address}`}>{this.props.name}</Link>
          </div>
        </div>

        <div className="table-col">
          <div><b>Balance:</b> QRTZ</div>
          <div><b>Blocks mined:</b> </div>
        </div>
      </div>
    );
  }
}


export default Wallet;