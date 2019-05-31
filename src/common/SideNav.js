import React from "react";
import { NavLink } from "react-router-dom";
import "./SideNav.css";
/* import classnames from "classnames";
import axios from "axios";
import { redirect } from "../common/helper";

class SideNav extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLogout: false,
      error: ""
    };
  }

  handleLogout = () => {
    this.setState({ isLogout: true });
  };

  handleCancelLogout = () => {
    this.setState({ isLogout: false });
  };

  handleContinueLogout = () => {
    try {
      // Update bearer token
      axios.defaults.headers.common.Authorization = null;
      localStorage.removeItem("access_token");
      this.setState({ isLogout: false });
      redirect("/login");
    } catch (err) {
      this.setState({
        error: "error occured while logout",
        isLogout: false
      });
    }
  };

  render() {
    return (
      <aside className="sidenav">
        <ul className="sidenav__menu">
          <li className="sidenav__menu-list">
            <NavLink className="sidenav__menu-list--white" to="/dashboard">
              <div>
                <div>
                  <span className="icon">
                    <i className="fas fa-home fa-2x" />
                  </span>
                </div>
              </div>
              <div>Dashboard</div>
            </NavLink>
          </li>
          <li className="sidenav__menu-list">
            <NavLink className="sidenav__menu-list--white" to="/courses">
              <div>
                <div>
                  <span className="icon">
                    <i className="fas fa-book fa-2x" />
                  </span>
                </div>
              </div>
              <div>Courses</div>
            </NavLink>
          </li>
          <li className="sidenav__menu-list">
            <NavLink className="sidenav__menu-list--white" to="/students">
              <div>
                <div>
                  <span className="icon">
                    <i className="fas fa-graduation-cap fa-2x" />
                  </span>
                </div>
              </div>
              <div>Students</div>
            </NavLink>
          </li>
          <li className="sidenav__menu-list">
            <NavLink className="sidenav__menu-list--white" to="/lecturers">
              <div>
                <div>
                  <span className="icon">
                    <i className="fas fa-feather-alt fa-2x" />
                  </span>
                </div>
              </div>
              <div>Lecturers</div>
            </NavLink>
          </li>
          <li className="sidenav__menu-list">
            <NavLink
              className="button sidenav__menu-list--white"
              onClick={this.handleLogout}
            >
              <div>
                <div>
                  <span className="icon">
                    <i className="fas fa-user fa-2x" />
                  </span>
                </div>
              </div>
              <div>Logout</div>
            </NavLink>
          </li>
        </ul>
        <div
          className={classnames("modal", {
            "is-active": this.state.isLogout
          })}
        >
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Are you sure to continue?</p>
              <button
                className="delete"
                aria-label="close"
                onClick={this.handleCancelLogout}
              />
            </header>
            <section className="modal-card-body">
              <p>Are you sure you want to Logout?</p>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-success"
                onClick={this.handleContinueLogout}
              >
                Yes
              </button>
              <button className="button" onClick={this.handleCancelLogout}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </aside>
    );
  }
} */
function SideNav() {
  return (
    <aside className="sidenav">
      <ul className="sidenav__menu">
        <li className="sidenav__menu-list">
          <NavLink className="sidenav__menu-list--white" to="/dashboard">
            <div>
              <div>
                <span className="icon">
                  <i className="fas fa-home fa-2x" />
                </span>
              </div>
            </div>
            <div>Dashboard</div>
          </NavLink>
        </li>
        <li className="sidenav__menu-list">
          <NavLink className="sidenav__menu-list--white" to="/courses">
            <div>
              <div>
                <span className="icon">
                  <i className="fas fa-book fa-2x" />
                </span>
              </div>
            </div>
            <div>Courses</div>
          </NavLink>
        </li>
        <li className="sidenav__menu-list">
          <NavLink className="sidenav__menu-list--white" to="/students">
            <div>
              <div>
                <span className="icon">
                  <i className="fas fa-graduation-cap fa-2x" />
                </span>
              </div>
            </div>
            <div>Students</div>
          </NavLink>
        </li>
        <li className="sidenav__menu-list">
          <NavLink className="sidenav__menu-list--white" to="/lecturers">
            <div>
              <div>
                <span className="icon">
                  <i className="fas fa-feather-alt fa-2x" />
                </span>
              </div>
            </div>
            <div>Lecturers</div>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default SideNav;
