import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationItems.css";

const navItems = [
  {
    id: "products",
    text: "Products",
    link: "/",
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
    link: "/logout",
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
            <NavLink to={item.link} exact onClick={props.onChoose}>
              {item.text}
            </NavLink>
          </li>
        ))
      //   ,
      // props.isAuth && (
      //   <li className="navigation__link" key="logout">
      //     <button onClick={props.onLogout}>Logout</button>
      //   </li>
      // )
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
            <NavLink to={item.link} exact onClick={props.onChoose}>
              {item.text}
            </NavLink>
          </li>
        ))
      // props.isAuth && (
      //   <li className="navigation__link" key="logout">
      //     <button onClick={props.onLogout}>Logout</button>
      //   </li>
      // )
    ];
  }

  return navs;
};

export default navigationItems;
