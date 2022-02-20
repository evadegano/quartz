import { Component } from "react";
import { Link } from "react-router-dom";
import { UilSetting, UilBell, UilUser, UilSignout } from "@iconscout/react-unicons";


// make settings menu only appear if user is loggedin
class Header extends Component {
  state = {
    viewSettings: false
  };

  render() {
    return (
      <div className="header-container">
        <div>
          <h1 className="title">{this.props.title}</h1>
        </div>
        
        <div className="settings-container">
          <button 
            className={`settings-btn ${this.state.viewSettings ? "active" : "" }`} 
            onClick={() => this.setState({ viewSettings: !this.state.viewSettings })}>
            <UilSetting/>
          </button>

          <button className="settings-btn"><UilBell size="27"/></button>
        </div>

        {this.state.viewSettings && 
          <div className="toggle-menu">
            <ul>
              <li><Link to={`/user/${this.props.userId}`}><UilUser size="30"/>Profile</Link></li>
              <li><Link to="/logout"><UilSignout size="30"/>Log out</Link></li>
            </ul>
          </div>
        }
      </div>
    )
  ;}
}


export default Header;