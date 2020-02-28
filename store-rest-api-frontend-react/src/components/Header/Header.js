import React from "react";

import "./Header.css";

const header = props => (
  <header
    // className="header"
    className={["header", props.sticky ? "sticky" : ""].join(" ")}
  >
    {props.children}
  </header>
);

export default header;
