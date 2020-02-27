import React from "react";

import NavigationItems from "../NavigationItems/NavigationItems";
import "./MobileNavigation.css";

const mobileNavigation = props => (
  <nav class="mobile-navigation open">
    <ul class="mobile-navigation__items">
      <NavigationItems />
    </ul>
  </nav>
);

export default mobileNavigation;
