import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'reactstrap';
import map from 'lodash.map';

const Devices = (props) => {
  const { devices, handleDeviceToggle, handleDeviceDimmer } = props;
  const isDimmable = state => (state & 16) > 0; // eslint-disable-line no-bitwise

  const deviceTable = map(devices, dev => (
    <tr key={dev.id}>
      <td>{dev.id}</td>
      <td>{dev.name}<br />({dev.state}, {dev.methods}, {dev.statevalue || '-'})</td>
      <td>{dev.type}<br />({dev.model || '-'}, {dev.protocol || '-'})</td>
      <td>
        <Button
          onClick={handleDeviceToggle}
          id={dev.id}
          color={dev.state === 2 ? 'success' : 'danger'}
        >
          {dev.state === 2 ? 'På' : 'Av'}
        </Button>
        {' '}
        {isDimmable(dev.methods) && <Button
          onClick={handleDeviceDimmer(dev.id)}
          id={dev.id}
          color="warning"
          value={99}
        >
            Dim
        </Button>}
      </td>
    </tr>
  ));

  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Name<br />(State, Methods, Value)</th>
          <th>Type<br />(Model, Protocol)</th>
          <th />
        </tr>
      </thead>
      <tbody>{deviceTable}</tbody>
    </Table>
  );
};

Devices.propTypes = {
  devices: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  handleDeviceToggle: PropTypes.func.isRequired,
  handleDeviceDimmer: PropTypes.func.isRequired,
};

export default Devices;
