import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility
} from "semantic-ui-react";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import { withRouter } from "react-router-dom";
import { getWidth } from "../../utils";

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children, isAuthenticated } = this.props;
    const { fixed } = this.state;
    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
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
                      <Button
                        inverted={!fixed}
                        onClick={() => this.props.logout()}
                      >
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
                        inverted={!fixed}
                        onClick={() => this.props.history.push("/login")}
                      >
                        Login
                      </Button>
                      <Button
                        inverted={!fixed}
                        primary={fixed}
                        style={{ marginLeft: "0.5em" }}
                        onClick={() => this.props.history.push("/signup")}
                      >
                        Signup
                      </Button>
                    </React.Fragment>
                  )}
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
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
  )(DesktopContainer)
);
