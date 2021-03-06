import { Component } from "react";
import { getCoins } from "../../services/user-service";
import { createPurchaseTx } from "../../services/transaction-service";
import EC from "elliptic";
import StripeCheckout from "react-stripe-checkout";

// init variables
const ec = new EC.ec('secp256k1');


class BuyCoins extends Component {
  constructor({ gun }) {
    super();
    // init gun pointers
    this.gun = gun;

    this.state = {
      amount: "",
      error: "",
      success: ""
    }
  }

  /*
    Update state on form change
  */
  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  /*
    Prevent page from refreshing on form submit
  */
  handleSubmit = async (event) => {
    event.preventDefault();
    return;
  }

  /*
    Process user's purchase of QRTZ coins
  */
  processTransfer = (token) => {
    const amount = this.state.amount;

    // generate one-time signing keypair
    const keypair = ec.genKeyPair();
    const publicKey = keypair.getPublic("hex");

    // send data to server
    getCoins(amount, token, keypair, publicKey)
      .then(() => {
        const walletAddress = this.props.match.params.walletId;

        // add transaction to the blockchain
        createPurchaseTx(this.gun, amount, walletAddress, keypair, publicKey);

        // update global transaction state
        this.props.fetchTx();

        // reset state
        this.setState({
          amount: "",
          error: "",
          success: `Your transaction was sent to the network for validation.`
        });
      })
      .catch(err => {
        console.log(err);

        if (err.response) {
          this.setState({ error: err.response.data.message });
        } else {
          this.setState({ error: err.message });
        }
      })
  }

  render() {
    return (
      <div className="inner-container">
        <h1 className="title">Buy QRTZ Coins</h1>
        <h2 className="subtitle">Wallet: {this.props.userWalletName}</h2>

        <form className="auth-container" onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Amount</label>
            <div className="control">
              <input name="amount" value={this.state.amount} className="input" type="number" placeholder="15,000" onChange={this.handleChange} />
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