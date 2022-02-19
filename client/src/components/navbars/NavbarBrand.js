import { NavLink } from "react-router-dom";


function NavbarBrand() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <NavLink to="/" className="navbar-brand">
        <img src="/logo.png" alt="Logo" height="70px"/>
        <span>Quartz</span>
      </NavLink>
    </nav>
  );
}


export default NavbarBrand;