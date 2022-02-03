import { Component } from "react";
import Header from "../global/Header";
import TransferBtns from "./TransferBtns";
import Transactions from "../transactions/Transactions";
import Balance from "./Balance";
import MiningStats from "./MiningStats";


class Overview extends Component {
  render() {
    return (
      <main>
        <Header title="Good morning!" subtitle={`Account: `} />

        <div className="columns centered-row-container">
          <div className="column">
            <Balance />
            <Transactions />
          </div>

          <div className="column">
            <TransferBtns />
            <MiningStats />
          </div>
        </div>
      </main>
    );
  }
}


export default Overview;