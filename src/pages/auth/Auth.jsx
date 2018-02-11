import React, { Component } from 'react';
import map from 'lodash.map';
import { Container, Button, Table } from 'reactstrap';
import telldusCommand from '../../utils';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = { token: '', authUrl: '' };
  }

  handleRequestToken = () => {
    telldusCommand({ command: 'requestToken' }).then((result) => {
      this.setState(result);
      console.log(result);
    });
  }

  handleAccessToken = () => {
    telldusCommand({ command: 'accessToken', requestToken: this.state.token }).then((result) => {
      // this.setState(result);
      console.log(result);
    });
  }

  render() {
    const { token, authUrl } = this.state;

    return (
      <Container fluid className="page-content auth-page">
        <h1>Authentication</h1>
        <h4>Step 1. Request token</h4>
        <div className="mb-2"><Button onClick={this.handleRequestToken} color="warning">Get request token</Button></div>
        <h4>Step 2. Authenticate</h4>

        <h4>Step 3. Access token</h4>
        <div><Button onClick={this.handleAccessToken} color="warning">Get access token</Button></div>
        <div>{token}</div>
        <div>{authUrl}</div>
        {authUrl && 'asd'}
      </Container>
    );
  }
}

export default Auth;
