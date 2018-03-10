import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import map from 'lodash.map';
import Toggle from 'react-toggle';

const Devices = (props) => {
  const { devices, handleUpdateDevice, sensors } = props;

  const deviceTable = list => map(list, device => (
    <tr key={device.id}>
      <td>{device.id}</td>
      <td>
        <input
          type="checkbox"
          checked={device.favorite}
          onChange={handleUpdateDevice(device.id, `toggleFavorite-${device.type}`)}
        />
      </td>
      <td>{device.name}</td>
      <td>{device.type}</td>
      {device.type === 'sensor' && <td className="text-nowrap">
        {device.temp} &deg;C
      </td>}
      {device.type === 'device' && <td>
        <label htmlFor={`toggle-${device.id}`}>
          <Toggle
            checked={device.state !== 2}
            onChange={handleUpdateDevice(device.id, 'toggleState')}
          />
        </label>
      </td>}
    </tr>
  ));

  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          <th >Id</th>
          <th >Favorit</th>
          <th className="cellWidthMax">Name</th>
          <th >Type</th>
          <th >Status</th>
        </tr>
      </thead>
      <tbody>
        {deviceTable(sensors)}
        {deviceTable(devices)}
      </tbody>
    </Table>
  );
};

Devices.propTypes = {
  devices: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  sensors: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  handleUpdateDevice: PropTypes.func.isRequired,
};

export default Devices;
