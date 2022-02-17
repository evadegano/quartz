import { Component } from "react";
import { Link } from "react-router-dom";
import { UilSetting, UilBell, UilUser, UilSignout } from "@iconscout/react-unicons";
const settingsMenu = document.querySelector("#settings-menu");


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
        
        <div className="settings-container ">
          <div>
            <button className="settings-btn" onClick={() => this.setState({ viewSettings: !this.state.viewSettings })}><UilSetting/></button>

            {this.state.viewSettings && 
              <div id="settings-menu">
                <Link to={`/user/${this.props.userId}`}><UilUser size="30" color="#222222" />Profile</Link>
                <Link to="/logout"><UilSignout size="30" color="#222222" />Log out</Link>
              </div>
            }
          </div>
          
          <div>
            <button className="settings-btn"><UilBell size="30" color="#222222" /></button>
          </div>
        </div>
      </div>
    )
  ;}
}


export default Header;