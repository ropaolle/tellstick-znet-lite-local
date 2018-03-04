import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from 'reactstrap';
import 'rc-slider/assets/index.css';
import telldusCommand, { updateDeviceInfo } from '../utils/tellstick-znet-lite';
import DeviceList from './DeviceList';
import DeviceTable from './DeviceTable';

const defaultDevices = {
  0: {
    id: 0,
    methods: 19,
    name: 'Stickpropp Dim Zwave',
    state: 16,
    statevalue: 64,
    type: 'device',
  },
};

class Devices extends Component {
  static propTypes = {
    devices: PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      id: PropTypes.number,
      methods: PropTypes.number,
      state: PropTypes.number,
      statevalue: PropTypes.number,
    }).isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  state = { listView: true, devices: defaultDevices /* , sensors: {} */ };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ devices: nextProps.devices });
  };

  onSliderChange = id => (value) => {
    const { devices } = this.state; // TODO clone
    devices[id].statevalue = value;
    this.setState({ devices });
  };

  updateDevice = (device) => {
    this.setState({ devices: { ...this.state.devices, [device.id]: device } });
    // this.setState(prevState => ({ devices: { ...prevState.devices, [device.id]: device } }));
  };

  handleDeviceToggle = (e) => {
    const id = Number(e.target.id);

    const { devices } = this.state;
    const device = devices[id];

    device.state = device.state === 1 ? 2 : 1; // Toggle state
    // this.updateDevice(device); // Update state

    this.setState({ devices: { ...this.state.devices, [device.id]: device } }, () => {
      const command = device.state === 1 ? 'turnOn' : 'turnOff';
      telldusCommand({ type: 'devices', command, id }, this.props.setAlert)
        .then(() => updateDeviceInfo(id, this.updateDevice))
        .catch();
    });
  };

  handleDeviceDimmer = id => (value) => {
    const level = typeof value === 'number' ? value : 80;
    return telldusCommand({ type: 'devices', command: 'dim', id, level }, this.props.setAlert)
      .then(() => updateDeviceInfo(id, this.updateDevice))
      .catch();
  };

  handleToggleListView = () => {
    this.setState({ listView: !this.state.listView });
  };

  render() {
    const { devices, listView } = this.state;

    return (
      <Container fluid className="page-content home-page">
        <h1>Home</h1>

        <Button className="mb-4" color="success" onClick={this.handleToggleListView}>
          {listView ? 'Tabell' : 'Lista'}
        </Button>

        {listView && (
          <DeviceList
            devices={devices}
            handleDeviceToggle={this.handleDeviceToggle}
            onSliderChange={this.onSliderChange}
            handleDeviceDimmer={this.handleDeviceDimmer}
          />
        )}

        {!listView && (
          <DeviceTable
            devices={devices}
            handleDeviceToggle={this.handleDeviceToggle}
            onSliderChange={this.onSliderChange}
            handleDeviceDimmer={this.handleDeviceDimmer}
          />
        )}
      </Container>
    );
  }
}

export default Devices;
