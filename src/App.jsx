import React, { Component } from 'react';
import uniqueId from 'lodash.uniqueid';
import { UncontrolledAlert } from 'reactstrap';
import './App.css';
import AppNavbar from './AppNavbar';
import AuthDialog from './AuthDialog';
import Devices from './components/Devices';
import telldusCommand from './utils/tellstick-znet-lite';

function getDevicesIndexedById(devices, favorites) {
  return devices.reduce((acc, device) => {
    acc[device.id] = {
      ...device,
      favorite: favorites.indexOf(device.id) !== -1,
    };
    return acc;
  }, {});
}

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

    telldusCommand('init')
      .then((response) => {
        if (!response.success) {
          return this.setAlert(response.message);
        }

        return this.setState({
          devices: getDevicesIndexedById(response.message.device, response.favorites),
          allowRenew: response.allowRenew,
          expires: response.expires,
        });
      })
      .catch();
  };

  setAlert = (alert) => {
    this.setState(prevState => ({ alerts: [...prevState.alerts, alert] }));
  };

  setExpiresAndAllowRenew = (message) => {
    this.setState(() => ({ ...message }));
  };

  showDialog = (show) => {
    this.setState({ dialog: show });
  };

  updateDevice = (id, action, value) => {
    this.setState((prevState) => {
      const device = { ...prevState.devices[id] };

      const query = {};
      let type = 'devices';

      switch (action) {
        case 'updateSlider':
          device.state = 16;
          device.statevalue = value;
          type = null;
          break;
        case 'toggleState':
          device.state = device.state === 2 ? 1 : 2;
          query.command = device.state !== 2 ? 'turnOff' : 'turnOn';
          device.statevalue = 0;
          break;
        case 'dim':
          query.command = 'dim';
          query.level = device.statevalue;
          break;
        case 'toggleFavorite':
          device.favorite = !device.favorite;
          type = 'favorites';
          break;
        default:
      }

      if (type) {
        telldusCommand(type, id, query)
          .then((response) => {
            if (!response.success) {
              this.setAlert(response.message);
            }
            return response.success;
          })
          .catch();
      }

      return { devices: { ...prevState.devices, [id]: device } };
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
        <AppNavbar showDialog={() => this.showDialog(true)} />

        <div className="content">
          {alertList}

          <AuthDialog
            expires={expires}
            allowRenew={allowRenew}
            show={dialog}
            close={() => this.showDialog(false)}
            setExpiresAndAllowRenew={this.setExpiresAndAllowRenew}
          />

          <Devices devices={this.state.devices} updateDevice={this.updateDevice} />
        </div>
        <footer><div>By ropaolle, &#169; 2018 - <a href="https://github.com/ropaolle/tellstick-znet-lite-local">GitHub</a></div></footer>
      </div>
    );
  }
}

export default App;
