import { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { loggedIn } from './auth/auth-service';
import Homepage from './homepage/Homepage';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Dashboard from './user/Dashboard';
import './styles/App.css';
import "./mystyles.css";

class App extends Component {
  state = {
    loggedInUser: null
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
          <Route path="/signup" render={() => <Signup updateUser={this.updateLoggedInUser} />} />
          <Route path="/login" render={() => <Login  updateUser={this.updateLoggedInUser} />} />
          <Route path="/dashboard" render={() => <Dashboard />} />
        </Switch>
      </div>
  );}
}


export default App;
