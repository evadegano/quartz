import { Component } from "react";
import { useLocation } from "react-router-dom";
import EC from "elliptic";
import { sendCoins } from "../../services/transaction-service";

// init variables
const ec = new EC.ec('secp256k1');



class SendCoins extends Component {
  constructor({ gun }) {
    super();
    this.gun = gun;
    
    this.state = {
      toAddress: "",
      amount: "",
      error: "",
      success: ""
    }
  }

  /* 
   Get user's transactions
  */
   filterTransactions = (walletAddress) => {
    const userTransactions = this.props.transactions.filter(transac => transac.fromAddress === walletAddress || transac.toAddress === walletAddress);
    
    return userTransactions;
  }
  
  /*
    Update state on form change
  */
  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  /*
    Process user's transaction
  */
  handleSubmit = (event) => {
    // prevent page from reloading
    event.preventDefault();

    // get data
    const { toAddress, amount } = this.state;
    const walletAddress = this.props.match.params.walletId;
    const userTransactions = this.filterTransactions(walletAddress);

    // generate a one-time signing keypair
    const keypair = ec.genKeyPair();
    const publicKey = keypair.getPublic("hex");

    // create new transaction
    try {
      sendCoins(this.gun, amount, keypair, publicKey, walletAddress, toAddress, userTransactions);

      // update global transaction state
      this.props.fetchTx();

      // reset state
      this.setState({
        toAddress: "",
        amount: "",
        error: "",
        success: "Your transaction was sent to the network for validation."
      });
    }
    catch (err) {
      this.setState({
        toAddress: "",
        amount: "",
        error: err,
        success: ""
      });
    }
  }

  componentDidMount() {
    const search = this.props.location.search;
    const toAddress = new URLSearchParams(search).get("toAddress");

    // update state with query params if any
    if (toAddress) {
      this.setState({ toAddress });
    }
  }

  render() {
    return (
      <div className="inner-container">
        <h1 className="title">Send QRTZ</h1>

        <form className="auth-container" onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">To wallet</label>
            <div className="control">
              <input name="toAddress" value={this.state.toAddress} className="input" type="text" placeholder="Some wallet address" onChange={this.handleChange} />
            </div>
          </div>

          <div className="field">
            <label className="label">Amount</label>
            <div className="control">
              <input name="amount" value={this.state.amount} className="input" type="number" placeholder="4,000" onChange={this.handleChange} />
            </div>
          </div>

          <button className="signup-btn">SEND</button>
        </form>

        {this.state.error && <div className="error">{this.state.error}</div>}
        {this.state.success && <div className="success">{this.state.success}</div>}
      </div>
    );
  }
}


export default SendCoins;