import { Component } from "react";
import LineChart from "./LineChart";

class TxVolumes extends Component {
  state = {
    timePeriod: "month"
  }

  render() {
    return (
      <div className="chart-container">
        <div className="chart-header">
          <h2>Transactions</h2>

          <div>
            <button className={`time-btn ${this.state.timePeriod === "day" ? "active" : ""}`} onClick={() => this.setState({ timePeriod: "day"})}>Week</button>
            <button className={`time-btn ${this.state.timePeriod === "week" ? "active" : ""}`} onClick={() => this.setState({ timePeriod: "week"})}>Month</button>
            <button className={`time-btn ${this.state.timePeriod === "month" ? "active" : ""}`} onClick={() => this.setState({ timePeriod: "month"})}>Year</button>
          </div>
        </div>
        
        <LineChart transactions={this.props.transactions} timePeriod={this.state.timePeriod} />
      </div>
    );
  }
}


export default TxVolumes;