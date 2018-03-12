import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from 'reactstrap';
import 'rc-slider/assets/index.css';
import FavoriteDevices from './FavoriteDevices';
import FavoriteSensors from './FavoriteSensors';
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
    sensors: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      sensorId: PropTypes.number, // Always same as the id
      battery: PropTypes.number, // Missing or is always 254
      model: PropTypes.string,
      protocol: PropTypes.string,

      // data
      novalues: PropTypes.bool, // novalues or data, never both

      // If includeScale=0
      temp: PropTypes.string, // Celsius
      humidity: PropTypes.string, // Scale %
      lum: PropTypes.string, // Sacle %

      // If includeScale=1
      data: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.number,
          sacal: PropTypes.number,
          value: PropTypes.number,
        }),
      ),
    }).isRequired,
    updateDevice: PropTypes.func.isRequired,
  };

  state = { listView: true };

  handleUpdateDevice = (id, action) => (value) => {
    this.props.updateDevice(id, action, value);
  };

  handleToggleListView = () => {
    this.setState({ listView: !this.state.listView });
  };

  render() {
    const { listView } = this.state;
    const { devices, sensors } = this.props;

    const btnClass = state => (state ? 'btn-light btn-sm mt-2' : 'btn-secondary btn-sm mt-2');

    return (
      <Container fluid className="page-content home-page">
        <Button className={btnClass(listView)} onClick={this.handleToggleListView}>
          All <i className="fa fa-table" aria-hidden="true" />
        </Button>

        <Button className={btnClass(!listView)} onClick={this.handleToggleListView}>
          Favorites <i className="fa fa-list" aria-hidden="true" />
        </Button>

        {listView && (
          <div>
            <h1>Favorites</h1>

            <h4 className="mt-2">Devices</h4>
            <FavoriteDevices devices={devices} handleUpdateDevice={this.handleUpdateDevice} />

            <h4 className="mt-2">Sensors</h4>
            <div className="sensors">
              <FavoriteSensors sensors={sensors} />
            </div>
          </div>
        )}

        {!listView && (
          <div>
            <h1>All</h1>
            <DeviceTable
              devices={devices}
              sensors={sensors}
              handleUpdateDevice={this.handleUpdateDevice}
            />
          </div>
        )}
      </Container>
    );
  }
}

export default Devices;
