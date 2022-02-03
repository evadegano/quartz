import { UilSetting, UilBell, UilUser, UilSignout } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";


function Header(props) {
  return (
    <div className="row-container">
      <div>
        <h1 className="title">{props.title}</h1>
        <h2 className="subtitle">{props.subtitle}</h2>
      </div>
      
      <div>
        <button><UilSetting size="30" color="#000" /></button>
        <div id="setting-menu">
          <Link to="/user/userId"><UilUser size="30" color="#000" />Profile</Link>
          <Link to="/logout"><UilSignout size="30" color="#000" />Log out</Link>
        </div>
        
        <button><UilBell size="30" color="#000" /></button>
      </div>
    </div>
  );
}


export default Header;