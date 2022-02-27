import { Component } from "react";
import { UilSearch } from "@iconscout/react-unicons";
import Wallet from "./Wallet";
import Header from "../user/Header"; 


class Wallets extends Component {
  state = {
    query: ""
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  filterWallets = () => {
    const filteredWallets = this.props.wallets.filter(wallet => wallet.address.includes(this.state.query) || wallet.name.includes(this.state.query));

    return filteredWallets;
  }

  render() {
    const filteredWallets = this.filterWallets();

    return (
    <div className="inner-container inner-page">
      <Header userId={this.props.userId} title="Wallets" subtitle="" />
      
      <div className="inner-container hollow-table">
        <div className="search-container">
          <UilSearch className="search-icon" />
          <input className="search-bar" name="query" format="text" value={this.state.query} placeholder="Search..." onChange={this.handleChange} />
        </div>

        {filteredWallets.map(wallet => {
          return <Wallet 
            transactions={this.props.transactions}
            blocks={this.props.blocks} 
            key={wallet.address}
            address={wallet.address}
            name={wallet.name}
            active={wallet.active}
            lastSeen={wallet.lastSeen} />
        })}
      </div>
    </div>
    );
  }
}


export default Wallets;