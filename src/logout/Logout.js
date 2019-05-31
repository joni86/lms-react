import React from "react";
import * as LogoutAPI from "./LogoutApi";
import { redirect } from "../common/helper";
import classnames from "classnames";
import axios from "axios";
import MainContent from "../common/MainContent";

class Logout extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLogout: true,
      error: ""
    };
  }

  handleLogout = () => {
    this.setState({ isLogout: true });
  };

  handleCancelLogout = () => {
    this.setState({ isLogout: false });
  };

  handleContinueLogout = async () => {
    try {
      const response = await LogoutAPI.logout();

      // Update bearer token
      axios.defaults.headers.common.Authorization = null;
      localStorage.setItem("access_token", response.access_token);
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
      <MainContent>
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
      </MainContent>
    );
  }
}
export default Logout;
