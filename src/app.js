import React, { Component } from "react";
import NavBar from "./components/navbar";
import Period from "./components/period";

class App extends Component {
  state = {};

  // constructor() {
  //   super();
  //   //console.log("App - Constructior");
  // }

  componentDidMount() {
    //console.log("App - Mounted");
  }

  render() {
    //console.log("App - Render");

    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Period />
        </main>
        <div className="frame">
          <img
            className="move"
            src={require("./components/img/cloud.png")}
            alt="Moln"
          />
        </div>
        {this.renderPoweredBy()}
      </React.Fragment>
    );
  }

  renderPoweredBy() {
    return (
      <div className="power">
        <b>Powered by:</b>&nbsp;
        <span>
          jQuery&nbsp;
          <a href="https://jquery.com/">
            <span role="img" aria-label="link">
              🔗
            </span>
          </a>,&nbsp;
        </span>
        <span>
          Bootstrapy&nbsp;
          <a href="https://getbootstrap.com/">
            <span role="img" aria-label="link">
              🔗
            </span>
          </a>,&nbsp;
        </span>
        <span>
          Node.js&nbsp;
          <a href="https://nodejs.org/en/">
            <span role="img" aria-label="link">
              🔗
            </span>
          </a>,&nbsp;
        </span>
        <span>
          React&nbsp;
          <a href="https://reactjs.org/">
            <span role="img" aria-label="link">
              🔗
            </span>
          </a>,&nbsp;
        </span>
        <span>
          SMHI Open Data API&nbsp;
          <a href="http://opendata.smhi.se/apidocs/metfcst/">
            <span role="img" aria-label="link">
              🔗
            </span>
          </a>,&nbsp;
        </span>
        <span>
          Sunrise and Sunset API&nbsp;
          <a href="https://sunrise-sunset.org/api">
            <span role="img" aria-label="link">
              🔗
            </span>
          </a>,&nbsp;
        </span>
        <span>
          Nominatim API&nbsp;
          <a href="https://nominatim.openstreetmap.org/">
            <span role="img" aria-label="link">
              🔗
            </span>
          </a>,&nbsp;
        </span>
        <span>
          Leaflet&nbsp;
          <a href="https://leafletjs.com/">
            <span role="img" aria-label="link">
              🔗
            </span>
          </a>&nbsp;
        </span>
        <span>
          React Leaflet&nbsp;
          <a href="https://react-leaflet.js.org/">
            <span role="img" aria-label="link">
              🔗
            </span>
          </a>&nbsp;
        </span>
      </div>
    );
  }
}

export default App;
