import { Component } from "react";
import Header from "../navbars/Header";
import Transactions from "../transactions/Transaction";



class BlockDetails extends Component {
  filterBlock = () => {
    return this.props.blocks.find(block => block.hash === this.props.match.params.blockId);
  }

  filterTx = () => {
    return this.props.transactions.filter(tx => tx.block === this.props.match.params.blockId);
  }

  render() {
    const filteredBlock = this.filterBlock();
    const filteredTx = this.filterTx();

    return (
      <div className="inner-container inner-page">
        <Header userId={this.props.userId} title="Block details" subtitle="" />

        <Transactions transactions={filteredTx} />
      </div>
    );
  }
}


export default BlockDetails;