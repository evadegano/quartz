import { Link, Switch, Route } from "react-router-dom";
import { Component } from "react";
import Header from "../user/Header";
import Blocks from "./Blocks";
import TxVolumes from "./TxVolumes";
import BlockchainStats from "./BlockchainStats";


class Blockchain extends Component {
  state = {
    query: ""
  }

  render() {
    

    return (
      <div className="inner-container">
        <Header title="Quartz blockchain" subtitle="" />

        <div className="row-container">
          <TxVolumes />
          <BlockchainStats blockchain={this.props.blockchain}/>
        </div>

        <Blocks blocks={this.props.blocks} />
      </div>
    );
  }
}


export default Blockchain;
