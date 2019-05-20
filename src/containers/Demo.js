import React from "react";
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  List,
  Form,
  Icon,
  Segment,
  Divider,
  Message
} from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";

class Demo extends React.Component {
  state = {
    fileName: "",
    file: null,
    error: null,
    loading: false,
    statusCode: null
  };

  handleFileChange = e => {
    this.setState({
      fileName: e.target.files[0].name,
      file: e.target.files[0],
      error: null
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.file) {
      this.handleFileUpload(this.state.file);
    } else {
      this.setState({
        error: "No file selected"
      });
    }
  };

  handleFileUpload = async file => {
    const formData = new FormData();
    formData.append("file", file);
    this.setState({ loading: true });
    const config = {
      onUploadProgress: function(progressEvent) {
        const progress = progressEvent;
        console.log(progress);
      }
    };
    axios
      .post("/api/demo", formData, config)
      .then(res => {
        this.setState({
          data: res.data,
          statusCode: res.status,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          error: err.message,
          loading: false
        });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <Container style={{ padding: "1em" }}>
        <Segment vertical>
          <Divider horizontal>Try uploading an image</Divider>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>File input & upload</label>
              <Button as="label" htmlFor="file" type="button" animated="fade">
                <Button.Content visible>
                  <Icon name="file" />
                </Button.Content>
                <Button.Content hidden>Choose a File (Max 2MB)</Button.Content>
              </Button>
              <input
                id="file"
                type="file"
                hidden
                onChange={this.handleFileChange}
              />
              <Form.Input
                fluid
                label="File Chosen: "
                placeholder="Use the above bar to browse your file system"
                readOnly
                value={this.state.fileName}
              />
              <Button primary type="submit">
                Upload
              </Button>
            </Form.Field>
          </Form>
          {error && (
            <Message error header="There was an error" content={error} />
          )}
        </Segment>
      </Container>
    );
  }
}

export default Demo;
