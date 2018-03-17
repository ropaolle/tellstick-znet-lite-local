import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import telldusCommand from './utils/tellstick-znet-lite';

class AuthDialog extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    allowRenew: PropTypes.bool.isRequired,
    expires: PropTypes.number.isRequired,
    setExpiresAndAllowRenew: PropTypes.func.isRequired,
  };

  state = {
    step: 0,
    authUrl: '',
  };

  handleRequestToken = () =>
    telldusCommand('token', { command: 'new' })
      .then(result =>
        this.setState({
          step: 1,
          authUrl: result.message && result.message.authUrl,
        }),
      );

  handleRefreshToken = () =>
    telldusCommand('token', { command: 'refresh' })
      .then(result => this.showAlert(result, true));

  handleAuthentication = () => {
    const win = window.open(this.state.authUrl, '_blank');
    if (win) { win.focus(); }
    this.setState({ step: 2 });
  };

  handleAccessToken = () =>
    telldusCommand('token', { command: 'access' })
      .then(result => this.showAlert(result, false));

  showAlert = (result, renew) => {
    const alert = (<div>{(renew) ? 'Token renewed' : 'New token received' }</div>);

    if (result.success && result.message.newAccessToken) {
      this.props.setExpiresAndAllowRenew(result.message);
    }

    this.setState({ step: 3, alert });
  };

  handleClose = () => {
    this.setState({ step: 0, alert: '' });
    this.props.close();
  }

  date = (expires) => {
    const date = new Date(expires);
    return date.toLocaleString();
  };

  render() {
    const { step, alert, authUrl } = this.state;
    const { expires, allowRenew, show } = this.props;

    const checked = <span className="text-success">&#x2714;</span>;

    const button = (onClick, color, text) => (
      <Button onClick={onClick} color={color}>{text}</Button>);

    return (
      <div className="dialog">
        <Modal isOpen={show} toggle={this.handleClose}>
          <ModalHeader toggle={this.handleClose}>Authentication</ModalHeader>

          <ModalBody>
            <div>
              <Alert color="success">{alert}</Alert>

              <h4>{step > 0 && checked} Step 1. Request or renew token</h4>
              {step === 0 && (
                <div>
                  {button(this.handleRequestToken, 'warning', 'Request new token')}{' '}
                  {allowRenew && button(this.handleRefreshToken, 'warning', 'Renew token')}
                </div>
              )}

              <h4 className="mt-4">{step > 1 && checked} Step 2. Authenticate</h4>
              {(step === 1 || step === 2) && (
                <div>Use this link <a href={authUrl} onClick={this.handleAuthentication} target="_blank">{authUrl}</a>{' '}
                to authenticate the app, you will be redirected <i>login.telldus.com</i>.</div>
              )}

              <h4 className="mt-4">{step > 2 && checked} Step 3. Access token</h4>
              <div>
                {step === 2 && button(this.handleAccessToken, 'warning', 'Save access token...')}
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <div className="footer-text">Expires: {this.date(expires)}</div>
            {button(this.handleClose, 'secondary', 'Close')}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AuthDialog;
