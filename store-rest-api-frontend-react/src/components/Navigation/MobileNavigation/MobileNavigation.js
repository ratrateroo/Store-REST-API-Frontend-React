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
      <NavigationItems
        mobile
        onChoose={props.onChooseItem}
        isAuth={props.isAuth}
        purpose="product"
      />

      <NavigationItems
        mobile
        onChoose={props.onChooseItem}
        isAuth={props.isAuth}
        purpose="user"
      />
    </ul>
  </nav>
);

export default mobileNavigation;
