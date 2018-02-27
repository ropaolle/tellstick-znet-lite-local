import React, { Component } from 'react';
import { UncontrolledAlert } from 'reactstrap';
import './App.css';
import AppNavbar from './AppNavbar';
import AuthDialog from './AuthDialog';
import Devices from './components/Devices';
import telldusCommand from './tellstick-znet-lite';

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
    telldusCommand({ command: 'deviceList' }, this.setAlert).then((response) => {
      const indexedById = response.device.reduce((acc, val) => {
        acc[val.id] = val;
        return acc;
      }, {});

      this.setState({ devices: indexedById });
    });
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
