import { Component } from "react";
import Header from "../user/Header";
import Blocks from "./Blocks";
import TxVolumes from "./TxVolumes";
import BlockchainStats from "./BlockchainStats";


class Blockchain extends Component {
  render() {
    return (
      <div className="inner-container inner-page">
        <Header title="Quartz blockchain" subtitle="" />

        <div className="row-container">
          <TxVolumes />
          <BlockchainStats blockchain={this.props.blockchain} blocks={this.props.blocks.length}/>
        </div>

        <Blocks blocks={this.props.blocks} />
      </div>
    );
  }
}


export default Blockchain;
