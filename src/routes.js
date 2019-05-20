import React from "react";
import { Route, Redirect } from "react-router-dom";
import Hoc from "./hoc/hoc";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import LandingPage from "./containers/LandingPage";
import Demo from "./containers/Demo";
import ChangeEmail from "./containers/Account/ChangeEmail";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authenticated = localStorage.getItem("token") !== null;
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={LandingPage} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/demo" component={Demo} />
    <PrivateRoute path="/account/change-email" component={ChangeEmail} />
  </Hoc>
);

export default BaseRouter;
