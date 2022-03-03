import { Component } from "react";
import { UilSearch } from "@iconscout/react-unicons";
import Transaction from "./Transaction";


class Transactions extends Component {
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

  filterTx = () => {
    const filteredTx = this.props.transactions.filter(tx => String(tx[`${this.state.filter}`]).includes(this.state.query));

    return filteredTx;
  }

  render() {
    const filteredTx = this.filterTx().reverse();

    return (
      <div className="inner-container hollow-table">
        <div className="row-container">
          <h2>All transactions</h2>

          <div className="search-container">
            <UilSearch className="search-icon" />

            <select onChange={this.updateFilter} >
              <option name="hash" value="hash">Hash</option>
              <option name="from" value="fromAddress">From</option>
              <option name="toAddress" value="toAddress">To</option>
              <option name="date" value="timestamps">Date</option>
              <option name="amount" value="amount">Amount</option>
              <option name="status" value="status">Status</option>
            </select>

            <input className="search-bar" name="query" format="text" value={this.state.query} placeholder="Search..." onChange={this.handleChange} />
          </div>
        </div>
        
        {filteredTx.map(tx => {
          return <Transaction 
                    key={tx.hash} 
                    hash={tx.hash} 
                    from={tx.fromAddress} 
                    to={tx.toAddress}
                    amount={tx.amount} 
                    date={tx.timestamps}
                    status={tx.status} />
        })}
      </div>
    );
  }
}


export default Transactions;