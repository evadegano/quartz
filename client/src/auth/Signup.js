import { Component } from "react";
import { signup } from "../services/auth-service";


class Signup extends Component {
  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    error: ""
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    // prevent page from reloading
    event.preventDefault();

    // post data
    const { email, password, passwordConfirm } = this.state;

    signup(email, password, passwordConfirm)
      .then(response => {
        // reset state
        this.setState({
          email: "",
          password: "",
          passwordConfirm: "",
          error: ""
        });

        console.log("response ==>", response);

        // update global user state
        this.props.updateUser(response.newUser);

        // store wallet signing keys in local storage
        localStorage.setItem(response.walletAddress, {
          publicKey: response.publicKey,
          privateKey: response.privateKey
        });

        // redirect user to their dashboard
        this.props.history.push(`/user/${response.walletAddress}`);
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  render() {
    return (
      <div>
        <div className="centered-col-container">
          <h1 className="title">Sign up</h1>

          <form className="box s-container" onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input name="email" value={this.state.email} className="input" type="email" placeholder="e.g. alex@example.com" onChange={this.handleChange} />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input name="password" value={this.state.password} className="input" type="password" placeholder="********" onChange={this.handleChange} />
              </div>
              <p>Your password must contain at least 8 characters, including one cap letter, one number and one special character.</p>
            </div>

            <div className="field">
              <label className="label">Confirm password</label>
              <div className="control">
                <input name="passwordConfirm" value={this.state.passwordConfirm} className="input" type="password" placeholder="********" onChange={this.handleChange} />
              </div>
            </div>

            <button className="button is-primary">Sign up</button>
          </form>

          {this.state.error && (
            <div className="error">{this.state.error}</div>
          )}

        </div>
      </div>
    );
  }
}


export default Signup;