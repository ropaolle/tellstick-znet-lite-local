import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from 'reactstrap';
import 'rc-slider/assets/index.css';
import DeviceList from './DeviceList';
import SensorList from './SensorList';
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
    sensors: PropTypes.object.isRequired,
    updateDevice: PropTypes.func.isRequired,
  };

  state = { listView: true };

  handleUpdateDevice = (id, action) => (value) => {
    this.props.updateDevice(id, action, value);
  };

  handleUpdateSensor = (id, action) => (value) => {
    // this.props.updateDevice(id, action, value);
  };

  handleToggleListView = () => {
    this.setState({ listView: !this.state.listView });
  };

  render() {
    const { listView } = this.state;
    const { devices, sensors } = this.props;

    return (
      <Container fluid className="page-content home-page">

        <Button className={listView ? 'btn-light btn-sm' : 'btn-secondary btn-sm'} onClick={this.handleToggleListView}>
          All <i className="fa fa-table" aria-hidden="true" />
        </Button>

        <Button className={!listView ? 'btn-light btn-sm' : 'btn-secondary btn-sm'} onClick={this.handleToggleListView}>
          Favorites <i className="fa fa-list" aria-hidden="true" />
        </Button>

        <h1>Devices</h1>

        {listView && <DeviceList devices={devices} handleUpdateDevice={this.handleUpdateDevice} />}
        {listView && <SensorList sensors={sensors} handleUpdateSensor={this.handleUpdateSensor} />}

        {!listView && (
          <DeviceTable devices={devices} sensors={sensors} handleUpdateDevice={this.handleUpdateDevice} />
        )}
      </Container>
    );
  }
}

export default Devices;
