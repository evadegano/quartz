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
      <div className="auth-page">
        <div className="centered-col-container">
          <h1 className="title">Log in</h1>

          <div className="auth-container">
            <Link className="oAuth-btn" to="/auth/google">
              <img src="https://d3ptyyxy2at9ui.cloudfront.net/google-32ae27.svg" alt="Google logo"/>Log in with Google
            </Link>

            <div className="line-separator">
              <div>OR</div>
            </div>

            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input name="email" value={this.state.email} className="input" type="email" placeholder="e.g. rhendricks@piedpiper.com" onChange={this.handleChange} />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input name="password" value={this.state.password} className="input" type="password" placeholder="********" onChange={this.handleChange} />
                </div>
              </div>

              <button className="signup-btn" type="submit">LOG IN</button>
            </form>

            {this.state.error && (
              <div className="error">{this.state.error}</div>
            )}

            <Link to="/recovery/request" >I forgot my password</Link>
          </div>
        </div>
      </div>
    );
  }
}


export default Login;