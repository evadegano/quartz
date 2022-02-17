import { Component } from "react";
import { UilSearch } from "@iconscout/react-unicons";
import Block from "./Block";


class Blocks extends Component {
  state = {
    query: ""
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  filterBlocks = () => {
    const filteredBlocks = this.props.blocks.filter(block => block.hash.includes(this.state.query) || block.header.miner.includes(this.state.query));

    return filteredBlocks;
  }

  render() {
    const filteredBlocks = this.filterBlocks();

    return (
      <div className="inner-container hollow-table">
        <div className="row-container">
          <h2>Blocks</h2>

            <div className="search-container">
            <UilSearch className="search-icon" />
            <input className="search-bar" name="query" format="text" value={this.state.query} placeholder="Search..." onChange={this.handleChange} />
          </div>
        </div>
        

        <table>
          <thead>
            <tr>
              <th>Hash</th>
              <th>Hash of previous block</th>
              <th>Miner</th>
              <th>Height</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlocks.map(block => {
              return <Block 
                        key={block.hash} 
                        hash={block.hash} 
                        prevHash={block.header.prevHash} 
                        miner={block.header.miner} 
                        height={block.header.height} />
            })}
          </tbody>
        </table>
      </div>
    );
  }
}


export default Blocks;