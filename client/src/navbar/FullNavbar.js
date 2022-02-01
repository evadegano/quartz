import React from "react";
import { NavLink } from "react-router-dom";

function FullNavbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-item">
          Quartz
        </NavLink>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <NavLink to="/login" className="button is-light">
                Log in
              </NavLink>

              <NavLink to="/signup" className="button is-primary">
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