import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import NavbarBrand from "../navbars/NavbarBrand";
import Login from "./Login";
import Signup from "./Signup";


class Auth extends Component {
  render() {
    return (
      <div>
        <NavbarBrand />

        <Switch>
          <Route path="/auth/login" render={(routerProps) => <Login {...routerProps} updateUser={this.props.updateUser} />} />
          <Route path="/auth/signup" render={(routerProps) => <Signup {...routerProps} updateUser={this.props.updateUser} />} />
        </Switch>
      </div>
  );}
}


export default Auth;