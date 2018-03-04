import React from 'react';
import map from 'lodash.map';
import { Row, Col } from 'reactstrap';
import Toggle from 'react-toggle';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Devices = (props) => {
  const { devices, handleDeviceToggle, onSliderChange, handleDeviceDimmer } = props;

  return map(devices, (device) => {
    if (![6, 8, 18].includes(device.id)) return '';

    return (
      <div key={device.id}>
        <Row>
          <Col>{device.name}</Col>
        </Row>
        <Row>
          <Col className="col-2">
            <label htmlFor={`toggle-${device.id}`}>
              <Toggle
                checked={device.state === 1}
                id={device.id.toString()}
                onChange={handleDeviceToggle}
              />
            </label>
          </Col>
          <Col className="col-10">
            <div className="slider">
              <Slider
                min={1}
                max={255}
                value={Number(device.statevalue)}
                disabled={!(device.methods & 16)} // eslint-disable-line no-bitwise
                onChange={onSliderChange(device.id)}
                onAfterChange={handleDeviceDimmer(device.id)}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  });
};

export default Devices;
