import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import map from 'lodash.map';
import Toggle from 'react-toggle';

const Devices = (props) => {
  const { devices, handleUpdateDevice, sensors } = props;

  const deviceTable = list =>
    map(list, device => (
      <tr key={device.id}>
        <td>
          <input
            type="checkbox"
            checked={device.favorite}
            onChange={handleUpdateDevice(device.id, `toggleFavorite-${device.type}`)}
          />
        </td>
        <td>{device.name}</td>
        {device.type === 'sensor' && <td className="text-nowrap">{device.temp} &deg;C</td>}
        {device.type === 'sensor' && <td>{device.humidity && `${device.humidity}%`}</td>}
        {device.type === 'sensor' && <td>{device.lum && `${device.lum}%`}</td>}
        {device.type === 'device' && (
          <td>
            <label htmlFor={`toggle-${device.id}`}>
              <Toggle
                checked={device.state !== 2}
                onChange={handleUpdateDevice(device.id, 'toggleState')}
              />
            </label>
          </td>
        )}
      </tr>
    ));

  const table = (list, title) => (
    <div>
      <h4 className="mt-2">{title}</h4>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Fav.</th>
            <th className="cellWidthMax">Name</th>
            {title === 'Sensors' && <th>Temp</th>}
            {title === 'Sensors' && <th>Humidity</th>}
            {title === 'Sensors' && <th>Luminosity</th>}
            {title === 'Devices' && <th>Status</th>}
          </tr>
        </thead>
        <tbody>{deviceTable(list)}</tbody>
      </Table>
    </div>
  );

  return (
    <div>
      {table(sensors, 'Sensors')}
      {table(devices, 'Devices')}
    </div>
  );
};

Devices.propTypes = {
  devices: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  sensors: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  handleUpdateDevice: PropTypes.func.isRequired,
};

export default Devices;
