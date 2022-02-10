import { Link, Switch, Route } from "react-router-dom";
import { Component } from "react";
import Header from "../user/Header";
import Blocks from "./Blocks";
import TransacVolumes from "./TransacVolumes";
import BlockchainStats from "./BlockchainStats";


class Blockchain extends Component {
  state = {
    blocks: []
  }

  render() {
    return (
      <div>
        <Header title="Quartz blockchain" subtitle="" />

        <div className="columns centered-row-container">
          <div className="column">
            <TransacVolumes />
          </div>

          <div className="column">
            <BlockchainStats />
          </div>
        </div>

        <Blocks />
      </div>
    );
  }
}


export default Blockchain;
