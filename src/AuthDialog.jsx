/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import telldusCommand from './utils';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      requestToken: '',
      authUrl: '?',
    };
  }

  handleRequestToken = () => {
    this.tc({ command: 'requestToken' }).then((result) => {
      this.setState({ step: 1, authUrl: result.authUrl, requestToken: result.token });
    });
  };

  handleRefreshToken = () => {
    this.tc({ command: 'refreshToken' }).then((result) => {
      this.updateAlert(result, true);
    });
  };

  handleAuthentication = () => {
    const win = window.open(this.state.authUrl, '_blank');
    win.focus();
    this.setState({ step: 2 });
  };

  handleAccessToken = () => {
    this.tc({ command: 'accessToken', requestToken: this.state.requestToken }).then((result) => {
      this.updateAlert(result, false);
    });
  };

  updateAlert = (result, refresh = false) => {
    const date = new Date(result.expires * 1000);
    const alert = (
      <div>
        {!refresh && (
          <div>
            <div>Token stored on server.</div>
            <div>Allow renew: {result.allowRenew ? 'True' : 'False'}</div>
          </div>
        )}
        {refresh && <div>Token renewed and stored on server.</div>}
        <div>Expires: {date.toDateString()}</div>
      </div>
    );

    this.setState({ step: 3, alert });
  };

  tc = command => telldusCommand(command, this.props.setAlert);

  render() {
    const { step, authUrl, alert } = this.state;
    const { expires, allowRenew, show, close } = this.props;
    const date = new Date(expires * 1000);

    return (
      <div className="dialog">
        <Modal isOpen={show} toggle={close} className={this.props.className}>
          <ModalHeader toggle={close}>Authentication</ModalHeader>

          <ModalBody>
            <div>
              <div>
                Expires: {date.toLocaleString()}, Allow renew: {Boolean(allowRenew).toString()}
              </div>
              <h4 className="mt-4">
                {step > 0 && <span className="text-success">&#x2714;</span>} Step 1. Request/renew
                token
              </h4>
              {step === 0 && (
                <div>
                  <Button onClick={this.handleRequestToken} color="warning">
                    Request new token
                  </Button>{' '}
                  <Button onClick={this.handleRefreshToken} color="warning">
                    Refresh token
                  </Button>
                </div>
              )}

              <h4 className="mt-4">
                {step > 1 && <span className="text-success">&#x2714;</span>} Step 2. Authenticate
              </h4>
              {step === 1 && (
                <div>
                  Go to<Button color="link" onClick={this.handleAuthentication}>
                    {authUrl}
                  </Button>and authenticate the app.
                </div>
              )}

              <h4 className="mt-4">
                {step > 2 && <span className="text-success">&#x2714;</span>} Step 3. Access token
              </h4>
              <div>
                {step === 2 && (
                  <Button onClick={this.handleAccessToken} color="warning">
                    Save access token...
                  </Button>
                )}
                {step > 2 && <Alert color="success">{alert}</Alert>}
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color="secondary" onClick={close}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;
