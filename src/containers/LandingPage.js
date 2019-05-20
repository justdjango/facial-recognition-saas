import React from "react";
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  List,
  Segment
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import AI from "../assets/images/ai.svg";

const HomepageLayout = () => (
  <React.Fragment>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Facial recognition API
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Try out our cheap and fast facial recognition API. No credit card
              required
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image rounded size="large" src={AI} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Link to="/login">
              <Button primary size="huge">
                Get started
              </Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: "2em" }}>
          Try our API
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Test our API for free for the new two weeks. No credit card required.
        </p>
        <Link to="/login">
          <Button positive size="large">
            Start my free trial
          </Button>
        </Link>
        <Header as="h3" style={{ fontSize: "2em" }}>
          Pricing
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Pay for what you use, at $0.05 per request.
        </p>
        <Link to="/login">
          <Button primary size="large">
            Start now
          </Button>
        </Link>
      </Container>
    </Segment>
    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">Sitemap</List.Item>
                <List.Item as="a">Contact Us</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">FAQ</List.Item>
                <List.Item as="a">Pricing</List.Item>
                <List.Item as="a">API</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                Facial recognition SAAS
              </Header>
              <p>Find faces in your images</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </React.Fragment>
);

export default HomepageLayout;
