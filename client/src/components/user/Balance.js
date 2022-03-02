import { Component } from "react";
import LineChart from "../blockchain/LineChart";

class Balance extends Component {
  state = {
    timePeriod: "year"
  }

  updateChart = () => {
    let labels, data;

    if (this.state.timePeriod === "year") {
      labels = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    }

    if (this.state.timePeriod === "month") {
      return;
    }

    if (this.state.timePeriod === "week") {
      let monday = 0;

      labels = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

      for (let tx of this.props.transactions) {
        return;
        
      }
    }

    return [ labels, data ];
  }

  componentDidMount() {
    this.updateChart();
  }

  render() {
    return (
      <div className="chart-container">
        <div className="chart-header">
          <h2>Balance: {this.props.balance} QRTZ</h2>

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


export default Balance;