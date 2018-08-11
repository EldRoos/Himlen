//import React, { Component } from "react";
import React from "react";

//Stateless Functional Component
const NavBar = () => {
  //const NavBar = ({ totalCounters }) => {
  //console.log("NavBar - Render");

  return (
    <nav className="navbar navbar-light sky">
      <a className="navbar-brand font-weight-bold" href=".">
        Himlen{" "}
        <span className="badge badge-pill badge-secondary">
          {/* {totalCounters} */}
        </span>
      </a>
    </nav>
  );
};

export default NavBar;
