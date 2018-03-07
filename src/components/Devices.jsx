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

  handleDeviceDimmer = (id, action) => (value) => {
    this.props.updateDevice(id, action, value);
  };

  handleDeviceToggle = (id, action) => () => {
    this.props.updateDevice(id, action);
  };

  handleFavoriteChange = (id, action) => () => {
    this.props.updateDevice(id, action);
  };

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
