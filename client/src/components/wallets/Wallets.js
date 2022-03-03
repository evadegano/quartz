import { Component } from "react";
import { UilSearch } from "@iconscout/react-unicons";
import Wallet from "./Wallet";
import Header from "../user/Header"; 


class Wallets extends Component {
  state = {
    query: "",
    filter: "address"
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

  filterWallets = () => {
    const filteredWallets = this.props.wallets.filter(wallet => wallet[`${this.state.filter}`].includes(this.state.query));

    return filteredWallets;
  }

  render() {
    const filteredWallets = this.filterWallets();

    return (
    <div className="inner-container inner-page">
      <Header 
        activeWallet={this.props.activeWallet}
        title="Wallets"
        notifs={this.props.notifs} 
        fetchNotifs={this.props.fetchNotifs}
        gun={this.props.gun} />
      
      <div className="inner-container hollow-table">
        <div className="search-container">
          <UilSearch className="search-icon" />

          <select onChange={this.updateFilter} >
            <option name="address" value="address">Address</option>
            <option name="name" value="name">Name</option>
          </select>

          <input className="search-bar" name="query" format="text" value={this.state.query} placeholder="Search..." onChange={this.handleChange} />
        </div>

        {filteredWallets.map(wallet => {
          return <Wallet 
            key={wallet.address}
            transactions={this.props.transactions}
            blocks={this.props.blocks} 
            address={wallet.address}
            name={wallet.name}
            active={wallet.active}
            lastSeen={wallet.lastConnection} />
        })}
      </div>
    </div>
    );
  }
}


export default Wallets;