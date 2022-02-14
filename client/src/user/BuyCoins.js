import { Component } from "react";
import { getCoins } from "../services/blockchain-service";
import Gun from "gun";


class BuyCoins extends Component {
  constructor() {
    super();
    this.gun = Gun(["http://localhost:5005/gun"]); // add heroku url once in prod
    this.transacsRef = this.gun.get("transactions");
  }

  state = {
    amount: "",
    error: "",
    success: ""
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { amount } = this.state;
    const walletAddress = this.props.match.params.walletId;
    const signingKeyPair = localStorage.getItem(walletAddress);

    // create new transaction
    try {
      getCoins(amount, signingKeyPair, walletAddress);
      this.setState({
        amount: "",
        error: "",
        success: "Your transaction was sent to the blockchain for validation."
      });
    }
    catch (err) {
      this.setState({
        amount: "",
        error: err,
        success: ""
      });
    }
  }

  render() {
    return (
      <div>
        <div className="centered-col-container">
          <h1 className="title">Add QRTZ</h1>
          <h1 className="subtitle">to account:
          <br />{this.props.match.params.walletId}</h1>

          <form className="box s-container" onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Amount</label>
              <div className="control">
                <input name="amount" value={this.state.amount} className="input" type="number" placeholder="300" onChange={this.handleChange} />
              </div>
            </div>

            <button className="button is-primary">TOP UP ACCOUNT</button>
          </form>

          {this.state.error && (
            <div className="error">{this.state.error}</div>
          )}

          {this.state.success && (
            <div className="success">{this.state.success}</div>
          )}

        </div>
      </div>
    )
  ;}
}


export default BuyCoins;