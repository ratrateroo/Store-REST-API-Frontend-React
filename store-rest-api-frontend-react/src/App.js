import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Header from "./components/Header/Header";
import "./App.css";

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
        <Header></Header>
      </Fragment>
    );
  }
}

export default withRouter(App);
