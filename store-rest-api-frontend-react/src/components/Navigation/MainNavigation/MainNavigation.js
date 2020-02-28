import React from "react";

import MobileToggle from "../MobileToggle/MobileToggle";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./MainNavigation.css";

const mainNavigation = props => (
  <nav className="navigation">
    <Logo />
    <div className="navigation__nav">
      <div className="navigation__items products">
        <ul className="navigation__links">
          <NavigationItems isAuth={props.isAuth} purpose="product" />
        </ul>
      </div>
      <div className="navigation__items user">
        <ul className="navigation__links">
          <NavigationItems isAuth={props.isAuth} purpose="user" />
        </ul>
      </div>
    </div>
    <MobileToggle onOpen={props.onOpenMobileNav} open={props.open} />
  </nav>
);

export default mainNavigation;
