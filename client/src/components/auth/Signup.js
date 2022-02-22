import { Component } from "react";
import { Link } from "react-router-dom";
import { signup } from "../../services/auth-service";
import { postWallets, generateWallet } from "../../services/user-service";
import { UilInfoCircle } from '@iconscout/react-unicons'


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
      })
      .then(() => {
        // generate a new wallet
        const [ walletAddress, publicKey, privateKey ] = generateWallet();

        // store wallet signing keys in local storage
        localStorage.setItem(walletAddress, {
          publicKey,
          privateKey
        });

        // set new wallet as user's active wallet
        userData["activeWallet"] = walletAddress;

        // add wallet to the database
        return postWallets(userData._id, walletAddress);
      })
      .then(() => {
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
        }})
  }

  render() {
    return (
      <div className="auth-page">
        <div className="centered-col-container">
          <h1 className="title">Sign up</h1>

          <div className="auth-container">
            <Link className="oAuth-btn" to="/auth/google">
              <img src="https://d3ptyyxy2at9ui.cloudfront.net/google-32ae27.svg" alt="Google logo"/>Sign up with Google
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