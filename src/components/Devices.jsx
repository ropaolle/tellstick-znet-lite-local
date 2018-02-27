/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { Container } from 'reactstrap';
import 'rc-slider/assets/index.css';
import telldusCommand, { updateDeviceInfo } from '../utils';
import DeviceList from './DeviceList';

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = { devices: {}, sensors: {} };
  }

  componentWillReceiveProps = (nextProps) => {
    // console.log('nextProps', nextProps);
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
    telldusCommand({ command: 'dim', id, level: value }, this.props.setAlert).then(() => {
      updateDeviceInfo(id, this.updateDevice);
    });
  };

  render() {
    const { devices } = this.state;

    return (
      <Container fluid className="page-content home-page">
        <h1>Home</h1>
        <DeviceList
          devices={devices}
          handleDeviceToggle={this.handleDeviceToggle}
          onSliderChange={this.onSliderChange}
          handleDeviceDimmer={this.handleDeviceDimmer}
        />
      </Container>
    );
  }
}

export default Devices;
