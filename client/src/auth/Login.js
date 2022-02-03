import React, { Component } from "react";
import { login } from "./auth-service";


class Login extends Component {
  state = {
    email: "",
    password: ""
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
          password: ""
        });

        this.props.updateUser(response);
      })
      .catch(err => console.log(err))
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
        </div>
      </div>
    );
  }
}


export default Login;