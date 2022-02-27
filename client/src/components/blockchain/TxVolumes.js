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
            <button onClick={() => this.setState({ timePeriod: "week"})}>Week</button>
            <button onClick={() => this.setState({ timePeriod: "month"})}>Month</button>
            <button onClick={() => this.setState({ timePeriod: "year"})}>Year</button>
          </div>
        </div>
        
        <LineChart timePeriod={this.state.timePeriod} />
      </div>
    );
  }
}


export default TxVolumes;