import { Component } from "react";
import Header from "../navbars/Header";
import Blocks from "./Blocks";
import TxVolumes from "./TxVolumes";
import BlockchainStats from "./BlockchainStats";


class Blockchain extends Component {
  render() {
    return (
      <div className="inner-container inner-page">
        <Header 
          activeWallet={this.props.user.activeWallet} 
          title="Quartz blockchain" 
          notifs={this.props.notifs} 
          fetchNotifs={this.props.fetchNotifs}
          gun={this.props.gun} />

        <div className="row-container">
          <TxVolumes transactions={this.props.transactions} />
          <BlockchainStats blockchain={this.props.blockchain} blocks={this.props.blocks.length}/>
        </div>

        <Blocks blocks={this.props.blocks} />
      </div>
    );
  }
}


export default Blockchain;
