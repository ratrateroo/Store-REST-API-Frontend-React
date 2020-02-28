import React from "react";

import MobileToggle from "../MobileToggle/MobileToggle";
import Logo from "../../Logo/Logo";
import MobileNavigation from "../MobileNavigation/MobileNavigation";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./MainNavigation.css";

const mainNavigation = props => (
  <nav className="navigation">
    <Logo />
    <div className="navigation__nav">
      <div className="navigation__items">
        <ul className="navigation__links">
          <NavigationItems isAuth={props.isAuth} purpose="product" />
        </ul>
      </div>
      <NavigationItems isAuth={props.isAuth} purpose="user" />
    </div>
    <MobileToggle onOpen={props.onOpenMobileNav} open={props.open} />
  </nav>
);

export default mainNavigation;
