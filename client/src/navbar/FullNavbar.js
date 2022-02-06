import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function FullNavbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-item">
          <img src={logo} alt="Logo" /> Quartz
        </NavLink>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <NavLink to="/auth/login" className="button is-light">
                Log in
              </NavLink>

              <NavLink to="/auth/signup" className="button is-primary">
                <strong>Sign up</strong>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}


export default FullNavbar;