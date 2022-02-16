import { Link, Switch, Route } from "react-router-dom";
import { Component } from "react";
import { UilSearch } from "@iconscout/react-unicons";
import Header from "../user/Header";
import Block from "./Block";
import TxVolumes from "./TxVolumes";
import BlockchainStats from "./BlockchainStats";


class Blockchain extends Component {
  render() {
    return (
      <div className="inner-container">
        <Header title="Quartz blockchain" subtitle="" />

        <div className="columns centered-row-container">
          <div className="column">
            <TxVolumes />
          </div>

          <div className="column">
            <BlockchainStats />
          </div>
        </div>

        <div className="inner-container hollow-table">
          <div className="search-container">
            <UilSearch className="search-icon" />
            <input className="search-bar" name="query" format="text" value={this.state.query} placeholder="Search..." onChange={this.handleChange} />
          </div>

          <table>
            <thead>
              <tr>
                <th>Hash</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {this.props.blocks.map(wallet => {
                return <Block key={wallet.address} address={wallet.address} name={wallet.name} />
              })}
            </tbody>
          </table>
        </div>

      </div>
    );
  }
}


export default Blockchain;
