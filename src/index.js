import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import UserService from "./services/UserService";

import './assets/fonts/text/Coiny-Regular.ttf';
import './assets/fonts/text/Livvic-Light.ttf';
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/buy-food.css";

const renderApp = () => ReactDOM.render(<App/>, document.getElementById("app"));

UserService.initKeycloak(renderApp);