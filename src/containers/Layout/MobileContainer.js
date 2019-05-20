import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import { getWidth } from "../../utils";

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children, isAuthenticated } = this.props;
    const { sidebarOpened } = this.state;
    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item
            active={this.props.location.pathname === "/"}
            onClick={() => this.props.history.push("/")}
          >
            Home
          </Menu.Item>
          <Menu.Item
            active={this.props.location.pathname === "/demo"}
            onClick={() => this.props.history.push("/demo")}
          >
            Demo
          </Menu.Item>
          <Menu.Item position="right">
            {isAuthenticated ? (
              <React.Fragment>
                <Button inverted onClick={() => this.props.logout()}>
                  Logout
                </Button>
                <Button
                  primary
                  inverted
                  onClick={() =>
                    this.props.history.push("/account/change-email")
                  }
                >
                  Account
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Button
                  inverted
                  onClick={() => this.props.history.push("/login")}
                >
                  Login
                </Button>
                <Button
                  inverted
                  style={{ marginLeft: "0.5em" }}
                  onClick={() => this.props.history.push("/signup")}
                >
                  Signup
                </Button>
              </React.Fragment>
            )}
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  {isAuthenticated ? (
                    <Button inverted onClick={() => this.props.logout()}>
                      Logout
                    </Button>
                  ) : (
                    <React.Fragment>
                      <Button
                        inverted
                        onClick={() => this.props.history.push("/login")}
                      >
                        Login
                      </Button>
                      <Button
                        inverted
                        style={{ marginLeft: "0.5em" }}
                        onClick={() => this.props.history.push("/signup")}
                      >
                        Signup
                      </Button>
                    </React.Fragment>
                  )}
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MobileContainer)
);
