import React from "react";

import "./MobileToggle.css";

const mobileToggle = props => (
  <div className="mobile-button" onClick={props.onOpen}>
    <div className="mobile-burger"></div>
  </div>
);

export default mobileToggle;
