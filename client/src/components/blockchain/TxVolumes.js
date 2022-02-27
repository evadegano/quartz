import { Component } from "react";
import LineChart from "./LineChart";

class TxVolumes extends Component {
  state = {
    timePeriod: "year"
  }

  render() {
    return (
      <div className="chart-container">
        <div className="chart-header">
          <h2>Transactions</h2>

          <div>
            <button className={`time-btn ${this.state.timePeriod === "week" ? "active" : ""}`} onClick={() => this.setState({ timePeriod: "week"})}>Week</button>
            <button className={`time-btn ${this.state.timePeriod === "month" ? "active" : ""}`} onClick={() => this.setState({ timePeriod: "month"})}>Month</button>
            <button className={`time-btn ${this.state.timePeriod === "year" ? "active" : ""}`} onClick={() => this.setState({ timePeriod: "year"})}>Year</button>
          </div>
        </div>
        
        <LineChart timePeriod={this.state.timePeriod} />
      </div>
    );
  }
}


export default TxVolumes;