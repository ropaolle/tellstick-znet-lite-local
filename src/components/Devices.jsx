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

  handleUpdateDevice = (id, action) => (value) => {
    this.props.updateDevice(id, action, value);
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

        {listView && <DeviceList devices={devices} handleUpdateDevice={this.handleUpdateDevice} />}

        {!listView && (
          <DeviceTable devices={devices} handleUpdateDevice={this.handleUpdateDevice} />
        )}
      </Container>
    );
  }
}

export default Devices;
