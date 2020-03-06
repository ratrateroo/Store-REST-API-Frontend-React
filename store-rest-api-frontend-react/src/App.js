import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Backdrop from "./components/Backdrop/Backdrop";
import Header from "./components/Header/Header";
import MainNavigation from "./components/Navigation/MainNavigation/MainNavigation";
import MobileNavigation from "./components/Navigation/MobileNavigation/MobileNavigation";
import ErrorHandler from "./components/ErrorHandler/ErrorHandler";
import FeedPage from "./pages/Feed/Feed";

import ProductsPage from "./pages/Products/Products";
import MyProducts from "./pages/Shop/MyProducts/MyProducts";
import AddProduct from "./pages/Shop/MyProducts/AddProduct";

import SinglePostPage from "./pages/Feed/SinglePost/SinglePost";
import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/Signup";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: false,
      showBackdrop: false,
      showMobileNav: false,
      isAuth: false,
      authLoading: false,
      token: null,
      userId: null,
      error: null
    };
  }

  // state = {
  //   scrolled: false,
  //   showBackdrop: false,
  //   showMobileNav: false
  // };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScrollToElement);

    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId });
    this.setAutoLogout(remainingMilliseconds);
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

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    console.log("Logout Clicked.");
  };

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  errorHandler = () => {
    this.setState({ error: null });
  };

  loginHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({
          isAuth: true,
          token: resData.token,
          authLoading: false,
          userId: resData.userId
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        const remainingMilliseconds = 60 * 60 * 1000;

        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        this.setAutoLogout(remainingMilliseconds);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err
        });
      });
  };

  signupHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    fetch("http://localhost:8080/auth/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: authData.signupForm.email.value,
        password: authData.signupForm.password.value,
        firstname: authData.signupForm.firstname.value,
        middlename: authData.signupForm.middlename.value,
        lastname: authData.signupForm.lastname.value
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Creating a user failed!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({ isAuth: false, authLoading: false });
        this.props.history.replace("/");
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err
        });
      });
  };

  render() {
    let routes = (
      <Switch>
        <Route
          path="/"
          exact
          render={props => (
            <LoginPage
              {...props}
              onLogin={this.loginHandler}
              loading={this.state.authLoading}
            />
          )}
        />
        <Route
          path="/signup"
          exact
          render={props => (
            <SignupPage
              {...props}
              onSignup={this.signupHandler}
              loading={this.state.authLoading}
            />
          )}
        />

        <Route
          path="/products"
          exact
          render={props => <ProductsPage {...props} />}
        />

        <Redirect to="/" />
      </Switch>
    );

    if (this.state.isAuth) {
      routes = (
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <FeedPage userId={this.state.userId} token={this.state.token} />
            )}
          />

          <Route
            path="/my-products"
            exact
            render={props => (
              <MyProducts userId={this.state.userId} token={this.state.token} />
            )}
          />

          <Route
            path="/add-products"
            exact
            render={props => (
              <AddProduct userId={this.state.userId} token={this.state.token} />
            )}
          />

          <Route
            path="/:postId"
            render={props => (
              <SinglePostPage
                {...props}
                userId={this.state.userId}
                token={this.state.token}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <Fragment>
        {this.state.showBackdrop && (
          <Backdrop onClick={this.backdropClickHandler} />
        )}
        <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
        <Layout
          header={
            <Header sticky={this.state.scrolled}>
              <MainNavigation
                onOpenMobileNav={this.mobileNavHandler.bind(this, true)}
                open={this.state.showMobileNav}
                onLogout={this.logoutHandler}
                isAuth={this.state.isAuth}
              />
            </Header>
          }
          mobileNav={
            <MobileNavigation
              open={this.state.showMobileNav}
              mobile
              onChooseItem={this.mobileNavHandler.bind(this, false)}
              isAuth={this.state.isAuth}
              onLogout={this.logoutHandler}
            />
          }
          routes={routes}
        />
      </Fragment>
    );
  }
}

export default withRouter(App);
