import React, { Component } from 'react';
import { UncontrolledAlert } from 'reactstrap';
import './App.css';
import AppNavbar from './AppNavbar';
import AuthDialog from './AuthDialog';
import Devices from './components/Devices';
import telldusCommand from './utils/tellstick-znet-lite';

class App extends Component {
  state = {
    alert: '',
    dialog: false,
    devices: {},
    // sensors: {},
    expires: 0,
    allowRenew: false,
  };

  componentDidMount = () => {
    if (process.env.NODE_ENV === 'test') return; // TODO: Better tests

    telldusCommand({ type: 'devices' }, this.setAlert)
      .then((response) => {
        if (!response.success) {
          return response.message;
        }

        const indexedById = response.message.device.reduce((acc, val) => {
          acc[val.id] = val;
          return acc;
        }, {});

        return this.setState({
          devices: indexedById,
          allowRenew: response.allowRenew,
          expires: response.expires,
        });
      })
      .catch();
  };

  setAlert = (alert) => {
    this.setState({ alert });
  };

  showDialog = () => {
    this.setState({ dialog: true });
  };

  closeDialog = () => {
    this.setState({ dialog: false });
  };

  render() {
    const { expires, allowRenew, dialog } = this.state;

    return (
      <div className="app">
        <AppNavbar showDialog={this.showDialog} />

        {this.state.alert && (
          <UncontrolledAlert color="warning">{this.state.alert}</UncontrolledAlert>
        )}

        <AuthDialog
          expires={expires}
          allowRenew={allowRenew}
          show={dialog}
          close={this.closeDialog}
          setAlert={this.setAlert}
        />

        <Devices devices={this.state.devices} setAlert={this.setAlert} />
      </div>
    );
  }
}

export default App;
