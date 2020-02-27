import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import Header from "./components/Header/Header";
import "./App.css";
import MainNavigation from "./components/Navigation/MainNavigation/MainNavigation";
import MobileNavigation from "./components/Navigation/MobileNavigation/MobileNavigation";

class App extends React.Component {
  componentDidMount() {
    window.addEventListener("scroll", this.handleScrollToElement);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScrollToElement);
  }

  handleScrollToElement(event) {
    console.log("Fired " + event);
    const header = document.querySelector(".header");
    header.classList.toggle("sticky", window.scrollY > 0);
  }
  render() {
    return (
      <Fragment>
        <Layout
          header={
            <Header>
              <MainNavigation />
            </Header>
          }
          mobileNav={<MobileNavigation />}
        />
      </Fragment>
    );
  }
}

export default withRouter(App);
