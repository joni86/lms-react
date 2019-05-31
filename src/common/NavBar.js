import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { redirect } from "./helper";
import axios from "axios";

function handleLogout() {
  axios.defaults.headers.common.Authorization = null;
  // localStorage.setItem("access_token", null);
  localStorage.clear();
  redirect("/login");
}

function NavBar() {
  return (
    <nav className="navbar navbar__container">
      <div className="navbar-brand navbar__logo">
        <Link to="/dashboard" className="is-size-3 has-text-danger">
          LMS
        </Link>
      </div>
      <div className="navbar-menu navbar__logout">
        <div className="navbar-end">
          <a className="navbar-item" onClick={handleLogout}>
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
