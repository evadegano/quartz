import React, { Component } from "react";
import { Link } from "react-router-dom";
import { login } from "../../services/auth-service";


class Login extends Component {
  state = {
    email: "",
    password: "",
    error: ""
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
    const { email, password } = this.state;

    login(email, password)
      .then(response => {
        // reset state
        this.setState({
          email: "",
          password: "",
          error: ""
        });

        // store user data
        const userData = response.user;
        userData["activeWallet"] = response.walletAddress;

        // update global logged in user state
        this.props.updateUser(userData);

        // redirect user to their dashboard
        this.props.history.push(`/user/${userData.activeWallet}`);
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  render() {
    return (
      <div>
        <div className="centered-col-container">
          <h1 className="title">Log in</h1>

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
            </div>

            <button className="button is-primary">Log in</button>
          </form>

          <Link to="" >I forgot my password</Link>
        </div>
      </div>
    );
  }
}


export default Login;