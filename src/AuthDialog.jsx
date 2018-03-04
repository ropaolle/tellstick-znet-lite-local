import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import telldusCommand from './utils/tellstick-znet-lite';

class AuthDialog extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    allowRenew: PropTypes.bool.isRequired,
    expires: PropTypes.number.isRequired,
  };

  state = {
    step: 0,
    authUrl: '?',
  };

  handleRequestToken = () => {
    this.tc({ type: 'token', command: 'new' })
      .then(result =>
        this.setState({
          step: 1,
          authUrl: result.message.authUrl,
        }),
      )
      .catch();
  };

  handleRefreshToken = () => {
    this.tc({ type: 'token', command: 'refresh' })
      .then(result => this.updateAlert(result, true))
      .catch();
  };

  handleAuthentication = () => {
    const win = window.open(this.state.authUrl, '_blank');
    win.focus();
    this.setState({ step: 2 });
  };

  handleAccessToken = () => {
    this.tc({ type: 'token', command: 'access' })
      .then(result => this.updateAlert(result, false))
      .catch();
  };

  updateAlert = (result, refresh = false) => {
    const date = new Date(result.expires);
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

  date = (expires) => {
    const date = new Date(expires);
    return date.toLocaleString();
  };

  render() {
    const { step, authUrl, alert } = this.state;
    const { expires, allowRenew, show, close } = this.props;

    const checked = <span className="text-success">&#x2714;</span>;

    const button = (onClick, color, text) => (
      <Button onClick={onClick} color={color}>
        {text}
      </Button>
    );

    return (
      <div className="dialog">
        <Modal isOpen={show} toggle={close}>
          <ModalHeader toggle={close}>Authentication</ModalHeader>

          <ModalBody>
            <div>
              <div>
                Expires: {this.date(expires)}, Allow renew: {Boolean(allowRenew).toString()}
              </div>

              <h4 className="mt-4">{step > 0 && checked} Step 1. Request/renew token</h4>
              {step === 0 && (
                <div>
                  {button(this.handleRequestToken, 'warning', 'Request new token')}{' '}
                  {button(this.handleRefreshToken, 'warning', 'Refresh token')}
                </div>
              )}

              <h4 className="mt-4">{step > 1 && checked} Step 2. Authenticate</h4>
              {step === 1 && (
                <div>
                  Go to{button(this.handleAuthentication, 'link', authUrl)}and authenticate the app.
                </div>
              )}

              <h4 className="mt-4">{step > 2 && checked} Step 3. Access token</h4>
              <div>
                {step === 2 && button(this.handleAccessToken, 'warning', 'Save access token...')}
                {step > 2 && <Alert color="success">{alert}</Alert>}
              </div>
            </div>
          </ModalBody>

          <ModalFooter>{button(close, 'secondary', 'Cancel')}</ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AuthDialog;
