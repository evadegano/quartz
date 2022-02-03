import { Component } from "react";


class SendCoins extends Component {
  state = {
    toPublicKey: "",
    amount: ""
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
    const { toPublicKey, amount } = this.state;

    // reset state
    this.setState({
      toPublicKey: "",
      amount: ""
    })
  }

  render() {
    return (
      <div className="modal">
        <div className="modal-background"></div>

        <div class="modal-content">
          <div className="centered-col-container">
            <h1 className="title">Send QRTZ</h1>

            <form className="box s-container" onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Send to</label>
                <div className="control">
                  <input name="toPublickKey" value={this.state.toPublicKey} className="input" type="text" placeholder="e.g. alex@example.com" onChange={this.handleChange} />
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
          </div>
        </div>

        <button className="modal-close is-large" aria-label="close"></button>
      </div>
    );
  }
}


export default SendCoins;