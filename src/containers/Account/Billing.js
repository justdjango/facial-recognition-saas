import React from "react";
import {
  Segment,
  Header,
  Icon,
  Dimmer,
  Loader,
  Image,
  Button
} from "semantic-ui-react";
import Shell from "./Shell";
import SubscribeForm from "./SubscribeForm";
import ShortParagraphIMG from "../../assets/images/short_paragraph.png";
import { authAxios } from "../../utils";
import { billingURL } from "../../constants";

class Billing extends React.Component {
  state = {
    error: null,
    loading: false,
    billingDetails: {}
  };

  componentDidMount() {
    this.handleUserDetails();
  }

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
            <p>Your free trial ends on 19 June 2019</p>
            <p>API requests this month: 20</p>
            <SubscribeForm handleUserDetails={this.handleUserDetails} />
          </React.Fragment>
        ) : details.membershipType === member ? (
          <React.Fragment>
            <p>Next billing date: 25 June 2019</p>
            <p>API requests this month: 20</p>
            <p>Amount due: $20</p>
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
    const { loading, error, billingDetails } = this.state;
    return (
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
    );
  }
}

export default Billing;
