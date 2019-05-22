import React from "react";
import {
  CardElement,
  injectStripe,
  Elements,
  StripeProvider
} from "react-stripe-elements";
import { Divider, Button, Message } from "semantic-ui-react";
import { authAxios } from "../../utils";
import { subscribeURL, stripePublishKey } from "../../constants";

class StripeForm extends React.Component {
  state = {
    loading: false,
    error: null
  };

  submit = ev => {
    ev.preventDefault();
    this.setState({ loading: true, error: null });
    if (this.props.stripe) {
      this.props.stripe.createToken().then(result => {
        if (result.error) {
          this.setState({
            error: result.error.message,
            loading: false
          });
        } else {
          authAxios
            .post(subscribeURL, {
              stripeToken: result.token.id
            })
            .then(res => {
              this.setState({
                loading: false
              });
              this.props.handleUserDetails();
            })
            .catch(err => {
              console.log(err);
              this.setState({
                loading: false,
                error: err.response.data.message
              });
            });
        }
      });
    } else {
      console.log("Stripe js hasn't loaded yet");
    }
  };

  render() {
    const { loading, error } = this.state;
    return (
      <React.Fragment>
        <Divider />
        {error && <Message error header="There was an error" content={error} />}
        <CardElement />
        <Button
          primary
          style={{ marginTop: "10px" }}
          loading={loading}
          disabled={loading}
          onClick={this.submit}
        >
          Go pro
        </Button>
      </React.Fragment>
    );
  }
}

const WrappedStripeForm = injectStripe(StripeForm);

class SubscribeForm extends React.Component {
  render() {
    return (
      <StripeProvider apiKey={stripePublishKey}>
        <div>
          <Elements>
            <WrappedStripeForm {...this.props} />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default SubscribeForm;
