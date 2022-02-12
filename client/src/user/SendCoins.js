import { Component } from "react";
import Gun from  "gun";
import { createTransac } from "../services/blockchain-service";


class SendCoins extends Component {
  constructor() {
    super();
      this.gun = Gun(["http://localhost:5005/gun"]); // add heroku url once in prod
      window.gun = this.gun; //To have access to gun object in browser console
      this.transacsRef = this.gun.get("transactions");
  }

  state = {
    toAddress: "",
    amount: "",
    error: "",
    success: ""
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    // prevent page from reloading
    event.preventDefault();

    // get data
    const { toAddress, amount } = this.state;
    const { walletAddress } = this.props.match.params.walletId;
    const signingKeyPair = localStorage.getItem(walletAddress);

    // create new transaction
    // how can I get the error message?
    const newTransaction = createTransac(amount, signingKeyPair, walletAddress, toAddress);

    // add transaction to the decentralized database
    if (newTransaction) {
      this.transacsRef.set(newTransaction);
    }
    
    // reset state
    this.setState({
      toAddress: "",
      amount: "",
      error: "",
      success: "Your transaction was sent to the blockchain for validation."
    })
  }

  render() {
    return (
      <div>
        <div className="centered-col-container">
          <h1 className="title">Send QRTZ</h1>

          <form className="box s-container" onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">To wallet</label>
              <div className="control">
                <input name="toAddress" value={this.state.password} className="input" type="text" placeholder="the wallet you are sending coins to" onChange={this.handleChange} />
              </div>
            </div>

            <div className="field">
              <label className="label">Amount</label>
              <div className="control">
                <input name="amount" value={this.state.amount} className="input" type="number" placeholder="300" onChange={this.handleChange} />
              </div>
            </div>

            <button className="button is-primary">Send</button>
          </form>

          {this.state.error && (
            <div className="error">{this.state.error}</div>
          )}

          {this.state.success && (
            <div className="success">{this.state.success}</div>
          )}

        </div>
      </div>
    );
  }
}


export default SendCoins;