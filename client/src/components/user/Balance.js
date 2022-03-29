import { Component } from "react";
import LineChart from "../blockchain/LineChart";

class Balance extends Component {
  state = {
    timePeriod: "month"
  }

  render() {
    return (
      <div className="chart-container">
        <div className="chart-header">
          <div>
            <h2>Balance: {this.props.balance.toLocaleString('en-US')} QRTZ</h2>
            <h3 className="subtitle left-align">Wallet: {this.props.userWalletName}</h3>
          </div>

          <div>
            <button className={`time-btn ${this.state.timePeriod === "day" ? "active" : ""}`} onClick={() => this.setState({ timePeriod: "day"})}>Week</button>
            <button className={`time-btn ${this.state.timePeriod === "week" ? "active" : ""}`} onClick={() => this.setState({ timePeriod: "week"})}>Month</button>
            <button className={`time-btn ${this.state.timePeriod === "month" ? "active" : ""}`} onClick={() => this.setState({ timePeriod: "month"})}>Year</button>
          </div>
        </div>
        
        <LineChart timePeriod={this.state.timePeriod} transactions={this.props.transactions} />
      </div>
    );
  }
}


export default Balance;