import { Component } from "react";


class Profile extends Component {
  render() {
    return (
      <div>
        <div className="centered-col-container">
          <h1 className="title">Profil</h1>

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
              <p>Your password must contain at least 8 characters, including one cap letter, one number and one special character.</p>
            </div>

            <div className="field">
              <label className="label">Confirm password</label>
              <div className="control">
                <input name="passwordConfirm" value={this.state.passwordConfirm} className="input" type="password" placeholder="********" onChange={this.handleChange} />
              </div>
            </div>

            <button className="button is-primary">Sign up</button>
          </form>
        </div>
      </div>
    );
  }
}


export default Profile;