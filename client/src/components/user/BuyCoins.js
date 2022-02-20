import { Component } from "react";
import { getCoins } from "../../services/user-service";
import Gun from "gun";
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckout from "react-stripe-checkout";
import { ElementsConsumer, PaymentElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51KUuGeD6SFhoou9AcyixNXVznOHeqWkOKkF7UNusiugaRIVhOq9eyYUkBYZ7HXOYgMIjhkPqSWMycsfLV2bzAzVz00ZWHLNjlA');


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

  handleSubmit = async (event) => {
    event.preventDefault();

    return;
  }

  // process user's purchase of Quartz coins
  processTransfer = (token) => {
    const amount = this.state.amount;

    getCoins(amount, token)
      .then(response => {

        console.log("stripe", response)

        // reset state
        this.setState({
          amount: "",
          error: "",
          success: `${amount} Quartz coins have been added to your wallet.`
        })
      })
      .catch(err => {
        if (err.response.data.err) {
          console.log("PROMISE ERROR:", err);

          this.setState({
            error: err.response.data.err
          });
        } else {
          this.setState({
            error: err
          });
        }
      })
  }

  render() {
    return (
      <div className="inner-container">
        <h1 className="title">Add QRTZ</h1>
        <h2 className="subtitle">to account:
        <br />{this.props.match.params.walletId}</h2>

        <form className="auth-container" onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Amount</label>
            <div className="control">
              <input name="amount" value={this.state.amount} className="input" type="number" placeholder="300" onChange={this.handleChange} />
            </div>
          </div>

          
          <StripeCheckout 
            stripeKey="pk_test_51KUuGeD6SFhoou9AcyixNXVznOHeqWkOKkF7UNusiugaRIVhOq9eyYUkBYZ7HXOYgMIjhkPqSWMycsfLV2bzAzVz00ZWHLNjlA" 
            token={this.processTransfer}
            amount={this.state.amount * 100}>
            
            <button className="signup-btn">TOP UP ACCOUNT</button>
          
          </StripeCheckout>
        </form>

        {this.state.error && <div className="error">{this.state.error}</div>}

        {this.state.success && <div className="success">{this.state.success}</div>}
    </div>
    )
  ;}
}


export default BuyCoins;