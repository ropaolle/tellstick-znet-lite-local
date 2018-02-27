import React, { Component } from 'react';
import map from 'lodash.map';
import { Container, Button, Table } from 'reactstrap';
import telldusCommand, { updateDeviceInfo } from '../../utils';

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = { devices: {}, sensors: {} };
  }

  componentDidMount = () => {
    telldusCommand({ command: 'deviceList' }).then((response) => {
      const indexedById = response.device.reduce((acc, val) => {
        acc[val.id] = val;
        return acc;
      }, {});

      this.setState({ devices: indexedById });
    });
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
    telldusCommand({ command, id }).then(() => {
      // Get dev info to sync changes
      updateDeviceInfo(id, this.updateDevice);
    });
  };

  handleDeviceDimmer = (e) => {
    const id = e.target.id;
    telldusCommand({ command: 'dim', id, level: 80 }).then(() => {
      updateDeviceInfo(id, this.updateDevice);
    });
  };

  render() {
    const { devices } = this.state;

    const deviceTable = map(devices, dev => (
      <tr key={dev.id}>
        <td>{dev.id}</td>
        <td>{dev.name}</td>
        <td>{dev.state}</td>
        <td>{dev.statevalue}</td>
        <td>{dev.type}</td>
        <td>{dev.methods}</td>
        <td>{dev.model}</td>
        <td>{dev.protocol}</td>
        <td>
          <Button
            onClick={this.handleDeviceToggle}
            id={dev.id}
            color={dev.state === 2 ? 'success' : 'danger'}
          >
            {dev.state === 2 ? 'På' : 'Av'}
          </Button>{' '}
          <Button onClick={this.handleDeviceDimmer} id={dev.id} color="warning">
              Dim
          </Button>
        </td>
      </tr>
    ));

    return (
      <Container fluid className="page-content home-page">
        <h1>Devices</h1>
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>State</th>
              <th>Value</th>
              <th>Type</th>
              <th>Methods</th>
              <th>Model</th>
              <th>Protocol</th>
              <th />
            </tr>
          </thead>
          <tbody>{deviceTable}</tbody>
        </Table>
      </Container>
    );
  }
}

export default Devices;
