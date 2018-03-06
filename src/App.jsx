import React, { Component } from 'react';
import uniqueId from 'lodash.uniqueid';
import { UncontrolledAlert } from 'reactstrap';
import './App.css';
import AppNavbar from './AppNavbar';
import AuthDialog from './AuthDialog';
import Devices from './components/Devices';
import telldusCommand from './utils/tellstick-znet-lite';

class App extends Component {
  state = {
    alerts: [],
    dialog: false,
    devices: {},
    // sensors: {},
    expires: 0,
    allowRenew: false,
  };

  componentDidMount = () => {
    if (process.env.NODE_ENV === 'test') return; // Do not load data during tests

    telldusCommand({ type: 'init' }, this.setAlert)
      .then((response) => {
        if (!response.success) {
          return this.setAlert(response.message);
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
    this.setState(prevState => ({ alerts: [...prevState.alerts, alert] }));
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
        const query = { type: 'devices', command, id: device.id };
        if (command === 'dim') {
          query.level = device.statevalue;
        }
        telldusCommand(query, this.setAlert)
          .then((response) => {
            if (!response.success) {
              this.setAlert(response.message);
            }
            return response.success;
          })
          .catch();
      }
      return { devices: { ...prevState.devices, [device.id]: device } };
    });
  };

  render() {
    const { expires, allowRenew, dialog, alerts } = this.state;

    const alertList = alerts.map(value => (
      <UncontrolledAlert key={uniqueId} color="warning">
        {value}
      </UncontrolledAlert>
    ));

    return (
      <div className="app">
        <AppNavbar showDialog={this.showDialog} />

        {alertList}

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
