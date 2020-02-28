import React from "react";

import "./MobileToggle.css";

const mobileToggle = props => (
  <div
    //className="mobile-button open"
    className={["mobile-button", props.open ? "open" : ""].join(" ")}
    onClick={props.onOpen}
  >
    <div className="mobile-burger"></div>
  </div>
);

export default mobileToggle;
