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
        onLogout={props.onLogout}
      />

      <NavigationItems
        mobile
        onChoose={props.onChooseItem}
        isAuth={props.isAuth}
        purpose="user"
        onLogout={props.onLogout}
      />
    </ul>
  </nav>
);

export default mobileNavigation;
