import React from "react";

import Logo from "../../Logo/Logo";
import "./MainNavigation.css";

const mainNavigation = props => (
  <nav className="navigation">
    <Logo />

    <div className="navigation__items">
      <ul className="navigation__links">
        <li className="navigation__link">
          <a href="products.html">Products</a>
        </li>
        {/* <li className="navigation__link">
          <a href="myproducts.html">My Products</a>
        </li>
        <li className="navigation__link">
          <a href="add-product.html">Add Product</a>
        </li> */}
      </ul>
    </div>
    <div className="navigation__access">
      <ul className="navigation__links">
        <li className="navigation__link">
          <a href="login.html">Login</a>
        </li>
        <li className="navigation__link">
          <a href="signup.html">Signup</a>
        </li>
        <li className="navigation__link">
          <a href="logout.html">Logout</a>
        </li>
      </ul>
    </div>
    <div className="mobile-button">
      <div className="mobile-burger"></div>
    </div>
  </nav>
);

export default mainNavigation;
