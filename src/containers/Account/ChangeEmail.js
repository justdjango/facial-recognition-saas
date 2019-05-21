import React from "react";
import { Form, Input, Message, Header, Button } from "semantic-ui-react";
import Shell from "./Shell";
import { authAxios } from "../../utils";
import { changeEmailURL, emailURL } from "../../constants";

class ChangeEmail extends React.Component {
  state = {
    currentEmail: "",
    email: "",
    confirmEmail: "",
    error: null,
    loading: false
  };

  componentDidMount() {
    this.handleUserDetails();
  }

  handleUserDetails = () => {
    this.setState({
      loading: true
    });
    authAxios
      .get(emailURL)
      .then(res => {
        this.setState({
          loading: false,
          currentEmail: res.data.email
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err.response.data.message
        });
      });
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
    const { email, confirmEmail } = this.state;
    if (email === "" || confirmEmail === "") {
      this.setState({
        error: "Please fill in all the fields"
      });
    } else {
      if (email === confirmEmail) {
        authAxios
          .post(changeEmailURL, {
            email,
            confirm_email: confirmEmail
          })
          .then(res => {
            this.setState({
              loading: false,
              email: "",
              confirmEmail: "",
              currentEmail: email
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
          error: "Your emails do not match"
        });
      }
    }
  };

  render() {
    const { currentEmail, email, confirmEmail, error, loading } = this.state;
    return (
      <Shell>
        <Header as="h4">Change email</Header>
        <Form onSubmit={this.handleSubmit} error={error !== null}>
          <Form.Field>
            <label>Current email</label>
            <Input value={currentEmail} disabled />
          </Form.Field>
          <Form.Field required>
            <label>New email</label>
            <Input
              value={email}
              placeholder="New email"
              type="email"
              name="email"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field required>
            <label>Confirm email</label>
            <Input
              value={confirmEmail}
              placeholder="Confirm email"
              type="email"
              name="confirmEmail"
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
export default ChangeEmail;
