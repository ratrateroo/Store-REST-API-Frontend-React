import React from "react";

import ReactDOM from "react-dom";

import "./Backdrop.css";

const backdrop = props =>
  ReactDOM.createPortal(
    <div id="backdrop" class="backdrop"></div>,
    document.getElementById("backdrop-root")
  );
export default backdrop;
