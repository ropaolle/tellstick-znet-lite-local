import React, { Component } from 'react';
import uniqueId from 'lodash.uniqueid';
import { UncontrolledAlert } from 'reactstrap';
import './App.css';
import Navbar from './Navbar';
import AuthDialog from './AuthDialog';
import Devices from './components/Devices';
import telldusCommand from './utils/tellstick-znet-lite';
import demoData from './demoData';

class App extends Component {
  state = {
    alerts: [],
    dialog: false,
    devices: {},
    sensors: {},
    expires: 0,
    allowRenew: false,
  };

  componentDidMount = () => {
    if (process.env.NODE_ENV === 'test') return; // Do not load data during tests

    // eslint-disable-next-line promise/valid-params
    telldusCommand('init')
      .then((response) => {
        // console.log(response);
        if (process.env.REACT_APP_MODE === 'DEMO') {
          return this.setState(demoData);
        }

        if (!response.success) {
          return this.setAlert(response.error);
        }

        return this.setState({
          devices: response.devices,
          sensors: response.sensors,
          allowRenew: response.allowRenew,
          expires: response.expires,
        });
      })
      .catch();
  };

  setAlert = (alert = []) => {
    this.setState((prevState) => {
      const alertArray = typeof alert === 'string' ? [alert] : alert;
      return { alerts: [...prevState.alerts, ...alertArray] };
    });
  };

  setExpiresAndAllowRenew = (message) => {
    this.setState(() => ({ ...message }));
  };

  showDialog = (show) => {
    this.setState({ dialog: show });
  };

  updateDevice = (id, action, value) => {
    this.setState((prevState) => {
      let device;
      let sensor;
      let type;
      const query = {};

      if (action === 'toggleFavorite-sensor') {
        sensor = { ...prevState.sensors[id] };
      } else {
        device = { ...prevState.devices[id] };
      }

      switch (action) {
        case 'updateSlider':
          device.state = 16;
          device.statevalue = value;
          break;
        case 'toggleState':
          device.state = device.state === 2 ? 1 : 2;
          query.command = device.state === 2 ? 'turnOff' : 'turnOn';
          device.statevalue = 0;
          type = 'devices';
          break;
        case 'dim':
          query.command = 'dim';
          query.level = device.statevalue;
          type = 'devices';
          break;
        case 'toggleFavorite-device':
          device.favorite = !device.favorite;
          type = 'favorites';
          break;
        case 'toggleFavorite-sensor':
          sensor.favorite = !sensor.favorite;
          type = 'favorites';
          break;
        default:
          return {};
      }

      if (action !== 'updateSlider') {
        // eslint-disable-next-line promise/valid-params
        telldusCommand(type, id, query)
          .then((response) => {
            if (!response.success) {
              this.setAlert(response.message);
            }
            return response.success;
          })
          .catch();
      }

      if (action === 'toggleFavorite-sensor') {
        return { sensors: { ...prevState.sensors, [id]: sensor } };
      }
      return { devices: { ...prevState.devices, [id]: device } };
    });
  };

  render() {
    const { expires, allowRenew, dialog, alerts, devices, sensors } = this.state;

    const demo = Boolean(process.env.REACT_APP_MODE === 'DEMO');

    const alertList = alerts.map(value => (
      <UncontrolledAlert key={uniqueId()} color="warning">
        {value}
      </UncontrolledAlert>
    ));

    return (
      <div className="app">
        <Navbar showDialog={() => this.showDialog(true)} />

        <div className="content">
          {!demo && alertList}

          <AuthDialog
            expires={expires}
            allowRenew={allowRenew}
            show={dialog}
            close={() => this.showDialog(false)}
            setExpiresAndAllowRenew={this.setExpiresAndAllowRenew}
          />

          <Devices devices={devices} sensors={sensors} updateDevice={this.updateDevice} />
        </div>
        <footer>
          <div>
            Env: {process.env.NODE_ENV}, Mode: {process.env.REACT_APP_MODE}
          </div>
          <div>
            By ropaolle, &#169; 2018 -{' '}
            <a href="https://github.com/ropaolle/tellstick-znet-lite-local">GitHub</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
