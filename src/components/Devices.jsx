import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from 'reactstrap';
import 'rc-slider/assets/index.css';
import DeviceList from './DeviceList';
import DeviceTable from './DeviceTable';

class Devices extends Component {
  static propTypes = {
    devices: PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      id: PropTypes.number,
      methods: PropTypes.number,
      state: PropTypes.number,
      statevalue: PropTypes.number,
      favorite: PropTypes.bool,
    }).isRequired,
    updateDevice: PropTypes.func.isRequired,
  };

  state = { listView: true };

  onSliderChange = id => (value) => {
    this.props.updateDevice({
      ...this.props.devices[id], // Clone
      statevalue: (value > 255) ? 80 : value,
    });
  };

  handleDeviceDimmer = id => (value) => {
    this.props.updateDevice({
      ...this.props.devices[id], // Clone
      state: 16,
      // If called handleDeviceDimmer from a button's onClick value is passed as an Event.
      statevalue: (typeof value === 'object') ? 80 : value,
    },
    'dim');
  };

  handleDeviceToggle = (e) => {
    const id = e.target.id; // Number(e.target.id);
    const device = { ...this.props.devices[id] }; // Clone
    device.state = device.state === 2 ? 1 : 2; // Toggle state
    device.statevalue = 0;
    const command = device.state === 1 ? 'turnOn' : 'turnOff';

    this.props.updateDevice(device, command);
  };

  handleFavoriteChange = (e) => {
    const target = e.target;
    this.props.updateDevice({
      ...this.props.devices[target.id], // Clone
      favorite: target.checked,
    });
  }

  handleToggleListView = () => {
    this.setState({ listView: !this.state.listView });
  };

  render() {
    const { listView } = this.state;
    const { devices } = this.props;

    return (
      <Container fluid className="page-content home-page">
        <h1>Home</h1>

        <Button className="mb-4" color="success" onClick={this.handleToggleListView}>
          {listView ? 'Tabell' : 'Lista'}
        </Button>

        {listView && (
          <DeviceList
            devices={devices}
            onSliderChange={this.onSliderChange}
            handleDeviceToggle={this.handleDeviceToggle}
            handleDeviceDimmer={this.handleDeviceDimmer}
          />
        )}

        {!listView && (
          <DeviceTable
            devices={devices}
            handleDeviceToggle={this.handleDeviceToggle}

            handleFavoriteChange={this.handleFavoriteChange}
          />
        )}
      </Container>
    );
  }
}

export default Devices;
