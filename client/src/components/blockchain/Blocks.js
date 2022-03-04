import { Component } from "react";
import { UilSearch } from "@iconscout/react-unicons";
import Block from "./Block";


class Blocks extends Component {
  state = {
    query: "",
    filter: "hash"
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  updateFilter = (event) => {
    const { value } = event.target;

    this.setState({
      filter: value
    })
  }

  filterBlocks = () => {
    const filteredBlocks = this.props.blocks.filter(block => String(block[`${this.state.filter}`]).includes(this.state.query));

    return filteredBlocks;
  }

  render() {
    const filteredBlocks = this.filterBlocks().sort((a, b) => b.timestamps - a.timestamps);

    return (
      <div className="inner-container hollow-table">
        <div className="row-container">
          <h2>Blocks</h2>

          <div className="search-container">

            <UilSearch className="search-icon" />

            <select onChange={this.updateFilter} >
              <option name="hash" value="hash">Hash</option>
              <option name="prevHash" value="prevHash">Prev block</option>
              <option name="miner" value="miner">Miner</option>
              <option name="miningReward" value="miningReward">Amount</option>
              <option name="status" value="status">Status</option>
              <option name="date" value="timestamps">Date</option>
            </select>

            <input className="search-bar" name="query" format="text" value={this.state.query} placeholder="Search..." onChange={this.handleChange} />
          </div>
        </div>
        

        {filteredBlocks.map((block, idx) => {
          return <Block 
                    key={idx} 
                    hash={block.hash} 
                    prevBlock={block.prevHash} 
                    miner={block.miner}
                    reward={block.miningReward} 
                    height={block.height}
                    date={block.timestamps}/>
        })}

      </div>
    );
  }
}


export default Blocks;