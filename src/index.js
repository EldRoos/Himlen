import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "leaflet/dist/leaflet.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
