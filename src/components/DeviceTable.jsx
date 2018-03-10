import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import Toggle from 'react-toggle';
import map from 'lodash.map';

const Devices = (props) => {
  const { devices, handleUpdateDevice, sensors } = props;

  const deviceTable = map(devices, dev => (
    <tr key={dev.id}>
      <td>{dev.id}</td>
      <td>
        <input
          type="checkbox"
          checked={dev.favorite}
          onChange={handleUpdateDevice(dev.id, 'toggleFavorite')}
        />
      </td>
      <td>{dev.name}</td>
      <td>{dev.type}</td>
      <td>
        <label htmlFor={`toggle-${dev.id}`}>
          <Toggle
            checked={dev.state !== 2}
            onChange={handleUpdateDevice(dev.id, 'toggleState')}
          />
        </label>
      </td>
    </tr>
  ));

  const state = data => data.map(s => <p>{s.name}: {s.value}</p>);

  const sensorTable = map(sensors, sensor => (
    <tr key={sensor.id}>
      <td>{sensor.id}</td>
      <td>
        <input
          type="checkbox"
          checked={sensor.favorite}
          // onChange={handleUpdateDevice(sensor.id, 'toggleFavorite')}
        />
      </td>
      <td>{sensor.name}</td>
      <td>sensor</td>
      <td>{state(sensor.data)}</td>
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
      <tbody>{deviceTable}{sensorTable}</tbody>
    </Table>
  );
};

Devices.propTypes = {
  devices: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  sensors: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  handleUpdateDevice: PropTypes.func.isRequired,
};

export default Devices;
