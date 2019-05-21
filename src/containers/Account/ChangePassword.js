import React from "react";
import { Form, Input, Message, Header, Button } from "semantic-ui-react";
import Shell from "./Shell";
import { authAxios } from "../../utils";
import { changePasswordURL } from "../../constants";

class ChangePassword extends React.Component {
  state = {
    currentPassword: "",
    password: "",
    confirmPassword: "",
    error: null,
    loading: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      error: null
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const { password, confirmPassword, currentPassword } = this.state;
    if (password === "" || confirmPassword === "") {
      this.setState({
        error: "Please fill in all the fields",
        loading: false
      });
    } else {
      if (password === confirmPassword) {
        authAxios
          .post(changePasswordURL, {
            current_password: currentPassword,
            password,
            confirm_password: confirmPassword
          })
          .then(res => {
            this.setState({
              loading: false,
              password: "",
              confirmPassword: "",
              currentPassword: ""
            });
          })
          .catch(err => {
            this.setState({
              loading: false,
              error: err.response.data.message
            });
          });
      } else {
        this.setState({
          loading: false,
          error: "Your passwords do not match"
        });
      }
    }
  };

  render() {
    const {
      currentPassword,
      password,
      confirmPassword,
      error,
      loading
    } = this.state;
    return (
      <Shell>
        <Header as="h4">Change password</Header>
        <Form onSubmit={this.handleSubmit} error={error !== null}>
          <Form.Field required>
            <label>Current password</label>
            <Input
              value={currentPassword}
              placeholder="Current password"
              type="password"
              name="currentPassword"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field required>
            <label>New password</label>
            <Input
              value={password}
              placeholder="New password"
              type="password"
              name="password"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field required>
            <label>Confirm password</label>
            <Input
              value={confirmPassword}
              placeholder="Confirm password"
              type="password"
              name="confirmPassword"
              onChange={this.handleChange}
            />
          </Form.Field>
          {error && <Message error header="Error" content={error} />}
          <Button primary type="submit" loading={loading} disabled={loading}>
            Submit
          </Button>
        </Form>
      </Shell>
    );
  }
}
export default ChangePassword;
