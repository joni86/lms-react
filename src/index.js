import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import axios from "axios";
import App from "./app/App";
import { redirect, getApiUrl } from "./common/helper";

/* axios.defaults.baseURL = "https://lms-syd2018.azurewebsites.net/";
axios.defaults.headers.common.Authorization =
  "Bearer 6caadWJVbiGh3Hyg88AH_bqAe8Vf_4VBe6pBrBog14kl8Q1gdIBMKl-IPEBdxZXycalo7hwdc11OgUjUH29OxKoAhUSjwiTx94YYkNTy9yPsYjHbJ1FibppB1Q88qmDGwLHZxXJoUaTjZ5ouoR7wpoA1cPvldSfZPyczlqW_zJ5tbYq6Ck4prmAg2S9YlQWmWqVuvO1spzmEV3tkqOxv6mMQ6yI-0xNMDDHF7l21qQ_qwtFOtQB6Ho5dO9nA5JFi"; */

axios.defaults.baseURL = getApiUrl();
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  "access_token"
)}`;

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401 || error.response.status === 403) {
      redirect("/login");
    }
    return error;
  }
);

ReactDOM.render(<App />, document.getElementById("index"));
