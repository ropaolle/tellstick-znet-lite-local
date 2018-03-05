import React, { Component } from 'react';
import { UncontrolledAlert } from 'reactstrap';
import './App.css';
import AppNavbar from './AppNavbar';
import AuthDialog from './AuthDialog';
import Devices from './components/Devices';
// import telldusCommand from './utils/tellstick-znet-lite-request';
import telldusCommand from './utils/tellstick-znet-lite-wreck';

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
    if (process.env.NODE_ENV === 'test') return; // Do not load data during tests

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

  updateDevice = (device, command) => {
    this.setState((prevState) => {
      if (command) {
        const level = (command === 'dim') ? device.statevalue : undefined;
        telldusCommand({ type: 'devices', command, id: device.id, level });
      }
      return { devices: { ...prevState.devices, [device.id]: device } };
    });
  }

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

        <Devices
          devices={this.state.devices}
          updateDevice={this.updateDevice}
          setAlert={this.setAlert}
        />
      </div>
    );
  }
}

export default App;
