import React from "react";
import axios from "axios";
import * as yup from "yup";
import * as LoginAPI from "./LoginApi";
import { pick } from "lodash/object";
import { getValidationErrors, redirect } from "../common/helper";
import "./Login.css";
import classnames from "classnames";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  username: yup
    .string()
    .label("Username")
    .required(),
  password: yup
    .string()
    .label("Password")
    .required()
});

class Login extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isLogin: false,
      validationErrors: {},
      loginError: ""
    };
  }

  handleFieldChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      validationErrors: {}
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const userInput = pick(this.state, ["username", "password"]);
    try {
      await schema.validate(userInput, {
        abortEarly: false
      });
    } catch (err) {
      const validationErrors = getValidationErrors(err);
      this.setState({ validationErrors });
      return;
    }

    try {
      this.setState({ validationErrors: {}, isLogin: true });
      const response = await LoginAPI.getAccessToken(
        userInput.username,
        userInput.password
      );

      // Update bearer token
      axios.defaults.headers.common.Authorization = `Bearer ${
        response.access_token
      }`;
      localStorage.setItem("access_token", response.access_token);
      redirect("/dashboard");
    } catch (err) {
      this.setState({
        loginError:
          err.error_description || "Sorry, error occurred when logging in",
        isLogin: false
      });
    }
  };

  render() {
    return (
      <div className="login--wrapper">
        <div className="media login_title">
          <p className="image is-64x64">
            <img src={require("./logo.jpg")} />
          </p>

          <div className="media-content">
            <div className="content">
              <p className="login_title--text is-size-4">
                <strong>LMS</strong>
              </p>
            </div>
          </div>
        </div>
        <div className="login_content">
          <form onSubmit={this.handleSubmit} className="is-clearfix login_form">
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleFieldChange}
                />
                {this.state.validationErrors["username"] && (
                  <p className="help is-danger">
                    {this.state.validationErrors["username"]}
                  </p>
                )}
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  name="password"
                  value={this.state.password}
                  className="input"
                  type="password"
                  onChange={this.handleFieldChange}
                />
                {this.state.validationErrors["password"] && (
                  <p className="help is-danger">
                    {this.state.validationErrors["password"]}
                  </p>
                )}
              </div>
            </div>
            <div className="field is-pulled-left form--sign_up">
              <div className="control">
                <Link className="form--link" to="/NotFound">
                  Sign Up?
                </Link>
              </div>
            </div>
            <div className="field is-pulled-right">
              <div className="control">
                <button
                  className={classnames("button is-light", {
                    "is-loading": this.state.isLogin
                  })}
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          {this.state.loginError && (
            <p className="help is-danger form_incorrect">
              {this.state.loginError}
            </p>
          )}
          <div className="form--bottom">
            <div className="form--bottom_line">
              <a href="#" className="footer_link">
                <span>Help</span>
              </a>
              <a href="#" className="footer_link">
                <span>Privacy policy</span>
              </a>
              <a href="#" className="footer_link">
                <span>Acceptable Use Policy</span>
              </a>
              <a href="#" className="footer_link">
                <span>Facebook</span>
              </a>
              <a href="#" className="footer_link">
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
