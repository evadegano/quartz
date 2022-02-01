import React, { Component } from "react";
import { login } from "./auth-service";
import NavbarBrand from "../navbar/NavbarBrand";


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
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;

    login(email, password)
      .then(response => {
        this.setState({
          email: null,
          password: null
        });

        this.props.updateUser(response);
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <NavbarBrand />
        
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