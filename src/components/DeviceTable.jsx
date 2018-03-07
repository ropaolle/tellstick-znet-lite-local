import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import Toggle from 'react-toggle';
import map from 'lodash.map';

const Devices = (props) => {
  const { devices, handleDeviceToggle, handleFavoriteChange } = props;

  const deviceTable = map(devices, dev => (
    <tr key={dev.id}>
      <td>{dev.id}</td>
      <td>
        <input
          id={dev.id}
          type="checkbox"
          checked={dev.favorite}
          onChange={handleFavoriteChange}
        />
      </td>
      <td>{dev.name}</td>
      <td>{dev.type}</td>
      <td>
        <label htmlFor={`toggle-${dev.id}`}>
          <Toggle
            checked={dev.state !== 2}
            id={dev.id.toString()}
            onChange={handleDeviceToggle}
          />
        </label>
      </td>
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
      <tbody>{deviceTable}</tbody>
    </Table>
  );
};

Devices.propTypes = {
  devices: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  handleDeviceToggle: PropTypes.func.isRequired,
  handleFavoriteChange: PropTypes.func.isRequired,
};

export default Devices;
