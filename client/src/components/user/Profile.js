import { Component } from "react";
import { Link } from "react-router-dom";
import { updateUser, deleteUser } from "../../services/user-service";
import { UilInfoCircle } from '@iconscout/react-unicons'


class Profile extends Component {
  state = {
    email: this.props.user.email,
    password: "",
    passwordConfirm: "",
    success: "",
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

    updateUser(this.props.user._id, email, password, passwordConfirm)
      .then(response => {
        // reset state
        this.setState({
          email: "",
          password: "",
          passwordConfirm: "",
          success: "Your profile was updated successfully.",
          error: ""
        });

        // store user data
        const userData = response.user;
        userData["activeWallet"] = this.props.match.params.walletId;

        // update global logged in user state
        this.props.updateUser(userData);
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

  render() {
    return (
      <div className="inner-container inner-page">
        <div className="centered-col-container">
          <h1 className="title">Update profile</h1>

          <div className="profile-container">
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
                  
                  {this.state.displayInfo && <span className="tooltiptext">Your new password must contain at least 8 characters, including one cap letter, one number and one special character.</span>}
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

              <button className="signup-btn" type="submit">SAVE</button>
            </form>

            {this.state.error && <div className="error">{this.state.error}</div>}
            {this.state.success && <div className="success">{this.state.success}</div>}
          </div>
        </div>
      </div>
    );
  }
}


export default Profile;