import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Backdrop from "./components/Backdrop/Backdrop";
import Header from "./components/Header/Header";
import "./App.css";
import MainNavigation from "./components/Navigation/MainNavigation/MainNavigation";
import MobileNavigation from "./components/Navigation/MobileNavigation/MobileNavigation";
import backdrop from "./components/Backdrop/Backdrop";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: false,
      showBackdrop: false,
      showMobileNav: false,
      isAuth: true
    };
  }

  // state = {
  //   scrolled: false,
  //   showBackdrop: false,
  //   showMobileNav: false
  // };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScrollToElement);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScrollToElement);
  }

  handleScrollToElement = () => {
    const isTop = window.scrollY > 0;
    if (isTop) {
      this.setState({ scrolled: true });
    } else {
      this.setState({ scrolled: false });
    }
    //   const header = document.querySelector(".header");
    //   header.classList.toggle("sticky", window.scrollY > 0);
  };

  mobileNavHandler = isOpen => {
    this.setState({ showMobileNav: isOpen, showBackdrop: isOpen });
  };

  backdropClickHandler = () => {
    this.setState({ showBackdrop: false, showMobileNav: false, error: null });
  };

  render() {
    return (
      <Fragment>
        {this.state.showBackdrop && (
          <Backdrop onClick={this.backdropClickHandler} />
        )}
        <Layout
          header={
            <Header sticky={this.state.scrolled}>
              <MainNavigation
                onOpenMobileNav={this.mobileNavHandler.bind(this, true)}
                open={this.state.showMobileNav}
                isAuth={this.state.isAuth}
              />
            </Header>
          }
          mobileNav={
            <MobileNavigation open={this.state.showMobileNav} mobile />
          }
        />
      </Fragment>
    );
  }
}

export default withRouter(App);
