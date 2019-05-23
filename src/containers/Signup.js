import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import { authSignup as signup } from "../store/actions/auth";

class RegistrationForm extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    formError: null
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = this.state;
    if (
      username !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      this.comparePasswords() === true &&
      this.comparePasswordLengths() === true
    )
      this.props.signup(username, email, password, confirmPassword);
  };

  comparePasswords = () => {
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({ formError: "Your passwords do not match" });
      return false;
    } else {
      return true;
    }
  };

  comparePasswordLengths = () => {
    const { password, confirmPassword } = this.state;
    if (password.length >= 6 && confirmPassword.length >= 6) {
      return true;
    } else {
      this.setState({
        formError: "Your password must be a minimum of 6 characters"
      });
      return false;
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      formError: null
    });
  };

  render() {
    const { formError } = this.state;
    const { loading, error, authenticated } = this.props;
    if (authenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div style={{ marginTop: "100px" }}>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Image src={Logo} /> Create an account
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  name="username"
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail address"
                  name="email"
                  type="email"
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  onChange={this.handleChange}
                />
                <Button
                  color="teal"
                  fluid
                  size="large"
                  disabled={loading}
                  loading={loading}
                >
                  Signup
                </Button>
              </Segment>
            </Form>
            {formError && (
              <Message negative>
                <Message.Header>There was an error</Message.Header>
                <p>{formError}</p>
              </Message>
            )}
            {error && (
              <Message negative>
                <Message.Header>There was an error</Message.Header>
                <p>{error}</p>
              </Message>
            )}
            <Message>
              Already have an account? <Link to="/login">Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    authenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (username, email, password1, password2) =>
      dispatch(signup(username, email, password1, password2))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm);
