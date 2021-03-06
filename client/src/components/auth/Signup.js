import { Component } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { signup } from "../../services/auth-service";
import { postWallets } from "../../services/user-service";
import { UilInfoCircle } from '@iconscout/react-unicons';


class Signup extends Component {
  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    error: "",
    displayInfo: false
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
    let userData;

    signup(email, password, passwordConfirm)
      .then(response => {
        // reset state
        this.setState({
          email: "",
          password: "",
          passwordConfirm: "",
          error: ""
        });

        // store user data
        userData = response.newUser;

        console.log("userData", userData);
      })
      .then(() => {
        // add wallet to the database
        return postWallets(userData._id);
      })
      .then(response => {
        console.log("postWallets response", response);
        // set new wallet as user's active wallet
        userData["activeWallet"] = response.walletAddress;

        // update global user state
        this.props.updateUser(userData);

        // redirect user to their dashboard
        this.props.history.push(`/user/${userData.activeWallet}`);
      })
      .catch(err => {
        console.log(err);

        if (err.response) {
          this.setState({ error: err.response.data.message });
        } else {
          this.setState({ error: err.message });
        }
      })
  }

  responseGoogle = (response) => {
    console.log("Google response", response);
    console.log("Google profile resp", response.profileObj);
  }

  render() {
    return (
      <div className="auth-page">
        <div className="centered-col-container">
          <h1 className="title">Sign up</h1>

          <div className="auth-container">
            {/*<GoogleLogin 
              clientId="320266929740-ksdq1ug9o9abvl3752gfh21hpmd0elg3.apps.googleusercontent.com"
              render={renderProps => (
                <button className="oAuth-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  <img src="https://d3ptyyxy2at9ui.cloudfront.net/google-32ae27.svg" alt="Google logo"/>
                  Sign up with Google
                </button>
              )}
              buttonText="Sign up with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              isSignedIn={true}
              cookiePolicy={'single_host_origin'}
            />

            <div className="line-separator">
              <div>OR</div>
            </div>*/}

            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input name="email" value={this.state.email} className="input" type="email" placeholder="e.g. rhendricks@piedpiper.com" onChange={this.handleChange} />
                </div>
              </div>

              <div className="field">
                <label className="label tooltip">
                  <span>Password</span> 

                  <UilInfoCircle 
                    size="20" 
                    onMouseEnter={() => this.setState({ displayInfo: true })}
                    onMouseLeave={() => this.setState({ displayInfo: false })} />
                  
                  {this.state.displayInfo && <span className="tooltiptext">Your password must contain at least 8 characters, including one cap letter, one number and one special character.</span>}
                </label>
                <div className="control">
                  <input name="password" value={this.state.password} className="input" type="password" placeholder="********" onChange={this.handleChange} />
                </div>
              </div>

              <div className="field">
                <label className="label">Confirm password</label>
                <div className="control">
                  <input name="passwordConfirm" value={this.state.passwordConfirm} className="input" type="password" placeholder="********" onChange={this.handleChange} />
                </div>
              </div>

              <button className="signup-btn" type="submit">SIGN UP</button>
              <p className="secondary-txt">By signing up, you agree to our <Link to="#">Terms and Service</Link>.</p>
            </form>

            {this.state.error && <div className="error">{this.state.error}</div>}
          </div>
        </div>
      </div>
    );
  }
}


export default Signup;