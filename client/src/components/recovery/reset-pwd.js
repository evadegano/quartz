import { Component } from "react";
import { Link } from "react-router-dom";
import { UilInfoCircle } from '@iconscout/react-unicons'
import { resetPwd } from "../../services/recovery-service";


class ResetPwd extends Component {
  state = {
    password: "",
    passwordConfirm: "",
    displayInfo: false,
    error: "",
    success: ""
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const userId = this.props.match.params.userId;
    const { password, passwordConfirm } = this.state;

    resetPwd(userId, password, passwordConfirm)
      .then(response => this.setState({ success: response.message }))
      .catch(err => this.setState({ error: err.response.data.message }))
  };

  render() {
    return (
      <section className="auth-page">
        <div className="centered-col-container">
          <h1 className="title">Reset password</h1>

          <form onSubmit={this.handleSubmit} >
            <div className="field">
              <label className="label tooltip">
                <span>New password</span> 

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

            <button className="signup-btn" type="submit">RESET</button>
          </form>

          {this.state.error && <div className="error">{this.state.error}</div>}
          {this.state.success && (
            <div>
              <div className="success">{this.state.success}</div>
              <Link to="/auth/login">LOG IN</Link>
            </div>
          )}
        </div>
      </section>
    );
  }
}


export default ResetPwd;