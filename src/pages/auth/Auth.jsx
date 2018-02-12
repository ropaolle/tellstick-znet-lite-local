import React, { Component } from 'react';
import { Container, Button, Alert } from 'reactstrap';
import telldusCommand from '../../utils';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      requestToken: '',
      authUrl: '',
    };
  }

  handleRequestToken = () => {
    this.tc({ command: 'requestToken' }).then((result) => {
      this.setState({ step: 1, authUrl: result.authUrl, requestToken: result.token });
    });
  }

  handleRefreshToken = () => {
    this.tc({ command: 'refreshToken' }).then((result) => {
      this.updateAlert(result, true);
    });
  }

  handleAuthentication = () => {
    const win = window.open(this.state.authUrl, '_blank');
    win.focus();
    this.setState({ step: 2 });
  }

  handleAccessToken = () => {
    this.tc({ command: 'accessToken', requestToken: this.state.requestToken }).then((result) => {
      this.updateAlert(result, false);
    });
  }

  updateAlert=(result, refresh = false) => {
    const date = new Date(result.expires * 1000);
    const alert = (<div>
      {!refresh && <div>
        <div>Token stored on server.</div>
        <div>Allow renew: {result.allowRenew ? 'True' : 'False'}</div>
      </div>}
      {refresh && <div>Token renewed and stored on server.</div>}
      <div>Expires: {date.toDateString()}</div>
    </div>);

    this.setState({ step: 3, alert });
  }

  tc = command => telldusCommand(command, this.props.setAlert);

  render() {
    const { step, authUrl, alert } = this.state;

    return (
      <Container fluid className="page-content auth-page">
        <h1>Authentication</h1>

        <h4>{step > 0 && <span className="text-success">&#x2714;</span>} Step 1. Request token</h4>
        {step === 0 && <div>
          <div className="mb-2"><Button onClick={this.handleRequestToken} color="warning">Request new token</Button></div>{' '}
          <div className="mb-2"><Button onClick={this.handleRefreshToken} color="warning">Refresh token</Button></div>
        </div>}

        <h4>{step > 1 && <span className="text-success">&#x2714;</span>} Step 2. Authenticate</h4>
        {step === 1 && <div>Go to<Button color="link" onClick={this.handleAuthentication}>{authUrl}</Button>and authenticate the app.</div>}

        <h4>{step > 2 && <span className="text-success">&#x2714;</span>} Step 3. Access token</h4>
        <div>
          {step === 2 && <Button onClick={this.handleAccessToken} color="warning">Save access token...</Button>}
          {step > 2 && <Alert color="success">{alert}</Alert>}
        </div>

      </Container>
    );
  }
}

export default Auth;
