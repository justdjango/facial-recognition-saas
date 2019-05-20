import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import LandingPage from "./containers/LandingPage";
import Demo from "./containers/Demo";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
    <Route exact path="/demo/" component={Demo} />
    <Route exact path="/" component={LandingPage} />
  </Hoc>
);

export default BaseRouter;
