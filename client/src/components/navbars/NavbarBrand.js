import { NavLink } from "react-router-dom";


function NavbarBrand() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-item">
          <img src="/logo.png" alt="Logo" /> Quartz
        </NavLink>
      </div>
    </nav>
  );
}


export default NavbarBrand;