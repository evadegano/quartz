import { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth-service";
import { UilSetting, UilBell, UilUser, UilSignout } from "@iconscout/react-unicons";


// make settings menu only appear if user is loggedin
class Header extends Component {
  constructor({ gun }) {
    super()
    this.gun = gun;
    this.notifsRef = this.gun.get("notifications");
  }


  state = {
    viewSettings: false,
    viewNotifs: false,
    newNotifs: false,
  };

  logUserOut = () => {
    logout()
      .then(response => console.log("User logged out"))
  }

  updateNotifs = () => {
    if (this.state.viewNotifs) {
      // update local state
      this.setState({
        viewSettings: false, 
        viewNotifs: false,
        newNotifs: false
      });

      // update notifs from unread to read
      for (let notif of this.props.notifs) {
        if (!notif.isRead) {
          this.notifsRef.get(notif["_"]["#"]).put({ isRead: true });
        }
      }
      
      // update global notifs state
      this.props.fetchNotifs();

    } else {
      // update local state
      this.setState({
        viewSettings: false, 
        viewNotifs: true, 
        newNotifs: false
      });
    }
  }

  render() {
    return (
      <div className="header-container">
        <div>
          <h1 className="title">{this.props.title}</h1>
        </div>
        
        <div className="settings-container">
          <button 
            className={
              `settings-btn 
              ${this.state.viewSettings ? "active" : "" }`} 
            onClick={() => this.setState({ viewSettings: !this.state.viewSettings, viewNotifs: false })}>

            <UilSetting/>
          </button>

          <button 
            className={`settings-btn ${this.state.viewNotifs ? "active" : "" }`}
            onClick={this.updateNotifs}>

            <UilBell size="27"/>

            {this.state.newNotifs && <div className="notif-alert">!</div>}
          </button>
        </div>

        {
          this.state.viewSettings && 
          <div className="toggle-menu">
            <ul>
              <li><Link to={`/user/${this.props.activeWallet}/profile`}><UilUser size="30"/>Profile</Link></li>
              <li><Link to="/" onClick={this.logUserOut}><UilSignout size="30"/>Log out</Link></li>
            </ul>
          </div>
        }

        {
          this.state.viewNotifs && 
          <div className="toggle-menu">
            <ul>
              {
                this.props.notifs.length === 0
                ? <li><p>Nothing new going on here...</p></li>
                : this.props.notifs.map((notif, idx) => 
                  <li key={idx}>
                    <p>{notif.message}</p>
                    <div className={`${!notif.isRead ? "unread-notif" : ""}`}></div>
                  </li>
                )
              }
            </ul>
          </div>
        }
      </div>
    )
  ;}
}


export default Header;