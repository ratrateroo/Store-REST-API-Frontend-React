import React from "react";

import NavigationItems from "../NavigationItems/NavigationItems";
import "./MobileNavigation.css";

const mobileNavigation = props => (
  <nav className={["mobile-navigation", props.open ? "open" : ""].join(" ")}>
    <ul
      className={[
        "mobile-navigation__items",
        props.mobile ? "mobile" : ""
      ].join(" ")}
    >
      <NavigationItems mobile />
    </ul>
  </nav>
);

export default mobileNavigation;
