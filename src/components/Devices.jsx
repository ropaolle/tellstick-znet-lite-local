import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from 'reactstrap';
import 'rc-slider/assets/index.css';
import telldusCommand, { updateDeviceInfo } from '../tellstick-znet-lite';
import DeviceList from './DeviceList';
import DeviceTable from './DeviceTable';

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = { listView: true, devices: {}/* , sensors: {} */ };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ devices: nextProps.devices });
  }

  onSliderChange = id => (value) => {
    const { devices } = this.state; // TODO clone
    devices[id].statevalue = value;
    this.setState({ devices });
  };

  updateDevice = (device) => {
    const clone = Object.assign({}, this.state.devices, { [device.id]: device });
    this.setState({ devices: clone });
  }

  handleDeviceToggle = (e) => {
    const id = Number(e.target.id);
    const device = this.state.devices[id];
    device.state = device.state === 1 ? 2 : 1; // Toggle state
    this.updateDevice(device); // Update state

    const command = device.state === 1 ? 'on' : 'off';
    telldusCommand({ command, id }, this.props.setAlert).then(() => {
      // Get dev info to sync changes
      updateDeviceInfo(id, this.updateDevice);
    });
  };

  handleDeviceDimmer = id => (value) => {
    const level = (typeof value === 'number') ? value : 80;

    telldusCommand({ command: 'dim', id, level }, this.props.setAlert).then(() => {
      updateDeviceInfo(id, this.updateDevice);
    });
  };

  handleToggleListView = () => {
    this.setState({ listView: !this.state.listView });
  }

  render() {
    const { devices, listView } = this.state;

    return (
      <Container fluid className="page-content home-page">
        <h1>Home</h1>

        <Button className="mb-4" color="success" onClick={this.handleToggleListView}>
          {listView ? 'Tabell' : 'Lista'}
        </Button>

        {listView && <DeviceList
          devices={devices}
          handleDeviceToggle={this.handleDeviceToggle}
          onSliderChange={this.onSliderChange}
          handleDeviceDimmer={this.handleDeviceDimmer}
        />}

        {!listView && <DeviceTable
          devices={devices}
          handleDeviceToggle={this.handleDeviceToggle}
          onSliderChange={this.onSliderChange}
          handleDeviceDimmer={this.handleDeviceDimmer}
        />}
      </Container>
    );
  }
}

Devices.propTypes = {
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

export default Devices;
