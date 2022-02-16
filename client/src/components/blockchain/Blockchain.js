import { Link, Switch, Route } from "react-router-dom";
import { Component } from "react";
import Header from "../user/Header";
import Block from "./Block";
import TxVolumes from "./TxVolumes";
import BlockchainStats from "./BlockchainStats";


class Blockchain extends Component {
  render() {
    return (
      <div>
        <Header title="Quartz blockchain" subtitle="" />

        <div className="columns centered-row-container">
          <div className="column">
            <TxVolumes />
          </div>

          <div className="column">
            <BlockchainStats />
          </div>
        </div>

        {this.props.blocks.map(block => {
          <Block key={block.hash} block={block} />
        })}
      </div>
    );
  }
}


export default Blockchain;
