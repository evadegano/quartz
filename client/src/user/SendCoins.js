import { Component } from "react";
import Gun from  "gun";
import _ from "lodash";


class SendCoins extends Component {
  constructor() {
    super();
      this.gun = Gun(["http://localhost:5005/gun"]); // add heroku url once in prod
      window.gun = this.gun; //To have access to gun object in browser console
      this.transacsRef = this.gun.get("transactions");
  }

  state = {
    toPublicKey: "",
    amount: "",
    privateKey: "",
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

    // post data
    const { fromPublicKey, toPublicKey, amount } = this.state;
    const { walletId } = this.props.match.params.walletId;

    const newTransaction = {
      fromPublicKey,
      toPublicKey,
      amount
    }

    // create transaction
    this.transacsRef.set(newTransaction);

    // reset state
    this.setState({
      fromPublicKey: "",
      toPublicKey: "",
      amount: "",
      error: ""
    })
  }

  render() {
    return (
      <div>
        <div className="centered-col-container">
          <h1 className="title">Send QRTZ</h1>

          <form className="box s-container" onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">From wallet</label>
              <div className="control">
                <input name="fromPublicKey" value={this.state.fromPublicKey} className="input" type="text" placeholder="your wallet address" onChange={this.handleChange} />
              </div>
            </div>

            <div className="field">
              <label className="label">To wallet</label>
              <div className="control">
                <input name="toPublicKey" value={this.state.password} className="input" type="text" placeholder="the wallet you are sending coins to" onChange={this.handleChange} />
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

        </div>
      </div>
    );
  }
}


export default SendCoins;