import React from "react";
import {
  Segment,
  Header,
  Icon,
  Dimmer,
  Loader,
  Image,
  Button,
  Modal,
  Divider
} from "semantic-ui-react";
import Shell from "./Shell";
import SubscribeForm from "./SubscribeForm";
import ShortParagraphIMG from "../../assets/images/short_paragraph.png";
import { authAxios } from "../../utils";
import { billingURL, cancelSubscriptionURL } from "../../constants";

class Billing extends React.Component {
  state = {
    error: null,
    loading: false,
    billingDetails: {},
    open: false
  };

  componentDidMount() {
    this.handleUserDetails();
  }

  show = size => () => this.setState({ size, open: true });

  close = () => this.setState({ open: false });

  handleUnsubscribe = () => {
    this.setState({
      error: null,
      loading: true
    });
    authAxios
      .post(cancelSubscriptionURL)
      .then(res => {
        this.setState({
          loading: false
        });
        this.close();
        this.handleUserDetails();
      })
      .catch(err => {
        this.setState({
          error: err.response.data.message,
          loading: false
        });
      });
  };

  handleUserDetails = () => {
    this.setState({
      loading: true
    });
    authAxios
      .get(billingURL)
      .then(res => {
        this.setState({
          loading: false,
          billingDetails: res.data
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err.response.data.message
        });
      });
  };

  renderBillingDetails(details) {
    const free_trial = "free_trial";
    const member = "member";
    const not_member = "not_member";
    return (
      <Segment>
        <Header as="h3">Monthly summary</Header>
        {details.membershipType === free_trial ? (
          <React.Fragment>
            <p>
              Your free trial ends on{" "}
              {new Date(details.free_trial_end_date).toDateString()}
            </p>
            <p>API requests this month: {details.api_request_count}</p>
            <SubscribeForm handleUserDetails={this.handleUserDetails} />
          </React.Fragment>
        ) : details.membershipType === member ? (
          <React.Fragment>
            <p>Next billing date: {details.next_billing_date}</p>
            <p>API requests this month: {details.api_request_count}</p>
            <p>Amount due: ${details.amount_due}</p>
            <Divider />
            <Button onClick={this.show("mini")}>Cancel subscription</Button>
          </React.Fragment>
        ) : details.membershipType === not_member ? (
          <React.Fragment>
            <p>Your free trial has ended</p>
            <SubscribeForm handleUserDetails={this.handleUserDetails} />
          </React.Fragment>
        ) : null}
      </Segment>
    );
  }

  render() {
    const { loading, error, billingDetails, open, size } = this.state;
    return (
      <React.Fragment>
        <Shell>
          {error && (
            <Segment placeholder>
              <Header icon>
                <Icon name="rocket" />
                Could not fetch your account details. Try reloading the page
              </Header>
              <a href="/account/billing/">
                <Button primary>Reload</Button>
              </a>
            </Segment>
          )}
          {loading && (
            <Segment>
              <Dimmer active inverted>
                <Loader inverted>Detecting faces...</Loader>
              </Dimmer>
              <Image src={ShortParagraphIMG} />
            </Segment>
          )}
          {billingDetails && this.renderBillingDetails(billingDetails)}
        </Shell>

        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>Cancel Your Subscription</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to cancel your subscription?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Yes"
              onClick={this.handleUnsubscribe}
            />
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Billing;
