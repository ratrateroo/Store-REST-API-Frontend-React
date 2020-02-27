import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationItems.css";

const navigationItems = props => (
  <li class="navigation-item mobile">
    <NavLink href="#">Links</NavLink>
  </li>
);

export default navigationItems;
