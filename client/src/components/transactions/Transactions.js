import { Component } from "react";
import { UilSearch } from "@iconscout/react-unicons";
import Transaction from "./Transaction";


class Transactions extends Component {
  state = {
    query: ""
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  filterTx = () => {
    const filteredTx = this.props.transactions.filter(tx => tx.hash.includes(this.state.query) || tx.fromAddress.includes(this.state.query) || tx.toAddress.includes(this.state.query));

    return filteredTx;
  }

  render() {
    //const filteredTx = this.filterTx();
    const filteredTx = this.props.transactions;

    return (
      <div className="inner-container hollow-table">
        <div className="row-container">
          <h2>All transactions</h2>

          <div className="search-container">
            <UilSearch className="search-icon" />
            <input className="search-bar" name="query" format="text" value={this.state.query} placeholder="Search..." onChange={this.handleChange} />
          </div>
        </div>
        
        {filteredTx.map((tx, idx) => {
          return <Transaction 
                    key={idx} 
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