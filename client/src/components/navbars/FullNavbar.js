import React from "react";
import { NavLink } from "react-router-dom";

function FullNavbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
        <NavLink to="/" className="navbar-brand">
          <img src="/logo.png" alt="Logo" height="70px"/>
          <span>Quartz</span>
        </NavLink>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <NavLink to="/auth/login" className="login-btn">
                Log in
              </NavLink>

              <NavLink to="/auth/signup" className="signup-btn">
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