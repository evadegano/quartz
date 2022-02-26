import { Component } from "react";
import LineChart from "./LineChart";

class TxVolumes extends Component {
  state = {
    timePeriod: "Year"
  }

  render() {
    return (
      <div className="chart-container">
        <div>
          <h2>Transactions</h2>

          <div>
            <button>Week</button>
            <button>Month</button>
            <button>Year</button>
          </div>

          <LineChart />
        </div>
        


      </div>
    );
  }
}


export default TxVolumes;