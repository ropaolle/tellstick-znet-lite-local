import React, { Component } from 'react';
import map from 'lodash.map';
import { Container, Button, Table } from 'reactstrap';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { auth } = this.state;

    return (
      <Container fluid className="page-content auth-page">
        <h1>Authentication</h1>
        <Button onClick={this.onClickDeviceDim} color="warning">
          Auth
        </Button>
      </Container>
    );
  }
}

export default Auth;
