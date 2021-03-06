import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationItems.css";

const navItems = [
  {
    id: "products",
    text: "Products",
    link: "/products",
    auth: false,
    navfor: "product"
  },
  {
    id: "my products",
    text: "My Products",
    link: "/my-products",
    auth: true,
    navfor: "product"
  },
  {
    id: "add product",
    text: "Add Product",
    link: "/add-product",
    auth: true,
    navfor: "product"
  },
  {
    id: "signup ",
    text: "Sign Up",
    link: "/signup",
    auth: false,
    navfor: "user"
  },
  { id: "login ", text: "Log In", link: "/login", auth: false, navfor: "user" },
  {
    id: "logout ",
    text: "Log Out",
    link: "",
    auth: true,
    navfor: "user"
  }
];

const navigationItems = props => {
  let navs;
  if (props.purpose === "product") {
    navs = [
      ...navItems
        .filter(item => item.navfor === props.purpose)
        .filter(item => item.auth === props.isAuth)
        .map(item => (
          <li
            key={item.id}
            className={["navigation__link", props.mobile ? "mobile" : ""].join(
              " "
            )}
          >
            <NavLink
              to={item.link}
              exact
              onClick={
                item.text === "Log Out" ? props.onLogout : props.onChoose
              }
            >
              {item.text}
            </NavLink>
          </li>
        ))
    ];
  } else {
    navs = [
      ...navItems
        .filter(item => item.navfor === props.purpose)
        .filter(item => item.auth === props.isAuth)
        .map(item => (
          <li
            key={item.id}
            className={["navigation__link", props.mobile ? "mobile" : ""].join(
              " "
            )}
          >
            <NavLink
              to={item.link}
              exact
              onClick={
                item.text === "Log Out" ? props.onLogout : props.onChoose
              }
            >
              {item.text}
            </NavLink>
          </li>
        ))
    ];
  }

  return navs;
};

export default navigationItems;
