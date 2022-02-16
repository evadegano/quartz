import { Component } from "react";
import Wallet from "./Wallet";
import { UilSearch } from "@iconscout/react-unicons";


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
    <div className="inner-container">
      
      <div className="inner-container hollow-table">
        <div className="search-container">
          <UilSearch className="search-icon" />
          <input className="search-bar" name="query" format="text" value={this.state.query} placeholder="Search..." onChange={this.handleChange} />
        </div>

        <table>
          <thead>
            <tr>
              <th>Address</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredWallets.map(wallet => {
              return <Wallet key={wallet.address} address={wallet.address} name={wallet.name} />
            })}
          </tbody>
        </table>
      </div>
    </div>
    );
  }
}


export default Wallets;