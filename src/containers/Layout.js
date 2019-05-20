import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import DesktopContainer from "./Layout/DesktopContainer";
import MobileContainer from "./Layout/MobileContainer";

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

class CustomLayout extends React.Component {
  render() {
    return <ResponsiveContainer>{this.props.children}</ResponsiveContainer>;
  }
}

export default withRouter(CustomLayout);
