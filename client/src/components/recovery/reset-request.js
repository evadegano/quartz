import { Component } from "react";
import { requestReset } from "../../services/recovery-service";


class ResetRequest extends Component {
  state = {
    email: "",
    error: "",
    success: ""
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();

    requestReset(this.state.email)
      .then(response => this.setState({ success: response.message }))
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  render() {
    return (
      <section className="auth-page">
        <div className="centered-col-container">
          <h1 className="title">Password recovery</h1>

          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">What is your email address?</label>
              <div className="control">
                <input name="email" value={this.state.email} className="input" type="email" placeholder="e.g. rhendricks@piedpiper.com" onChange={this.handleChange} />
              </div>
            </div>

            <button className="signup-btn" type="submit">SEND</button>
          </form>

          {this.state.error && <div className="error">{this.state.error}</div>}
          {this.state.success && <div className="success">{this.state.success}</div>}
        </div>
      </section>
    );
  }
}


export default ResetRequest;