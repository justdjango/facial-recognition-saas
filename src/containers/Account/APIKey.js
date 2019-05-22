import React from "react";
import {
  Segment,
  Header,
  Icon,
  Dimmer,
  Loader,
  Image,
  Button,
  Message
} from "semantic-ui-react";
import Shell from "./Shell";
import ShortParagraphIMG from "../../assets/images/short_paragraph.png";
import { authAxios } from "../../utils";
import { APIkeyURL } from "../../constants";

class APIKey extends React.Component {
  state = {
    loading: false,
    error: null,
    keys: []
  };

  componentDidMount() {
    this.handleUserDetails();
  }

  handleUserDetails = () => {
    this.setState({ loading: true });
    authAxios
      .get(APIkeyURL)
      .then(res => {
        this.setState({
          loading: false,
          keys: res.data
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err.response.data.message
        });
      });
  };

  render() {
    const { loading, error, keys } = this.state;
    return (
      <Shell>
        {error && <Message error header="There was an error" content={error} />}
        {loading && (
          <Segment>
            <Dimmer active inverted>
              <Loader inverted>Detecting faces...</Loader>
            </Dimmer>
            <Image src={ShortParagraphIMG} />
          </Segment>
        )}
        {keys && (
          <Segment>
            <Header as="h3">API Key</Header>
            {keys.map(k => {
              return <p key={k.pk}>{k.key}</p>;
            })}
          </Segment>
        )}
      </Shell>
    );
  }
}

export default APIKey;
