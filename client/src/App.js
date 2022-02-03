import { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { loggedIn } from './auth/auth-service';
import Homepage from './homepage/Homepage';
import Auth from './auth/Auth';
import UserSpace from './UserSpace';
import Legal from "./legal/Legal";
import './styles/App.css';
import "./mystyles.css";


class App extends Component {
  state = {
    loggedInUser: null,
  }

  updateLoggedInUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      loggedIn()
        .then(response => {
          this.setState({
            loggedInUser: response
          })
        })
        .catch((err) => {
          this.setState({
            loggedInUser: false
          })
        })
    }
  }

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/auth" render={() => <Auth updateUser={this.updateLoggedInUser} />} />
          <Route path="/user" component={UserSpace} />
          <Route path="/legal" component={Legal} />
        </Switch>
      </div>
  );}
}


export default App;
