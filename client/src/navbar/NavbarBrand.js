import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";


function NavbarBrand() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-item">
          <img src={logo} alt="Logo" /> Quartz
        </NavLink>
      </div>
    </nav>
  );
}


export default NavbarBrand;