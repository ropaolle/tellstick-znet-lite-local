import React from 'react';
import map from 'lodash.map';
import { Row, Col } from 'reactstrap';
import Toggle from 'react-toggle';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Devices = (props) => {
  const { devices, handleUpdateDevice } = props;

  return map(devices, (device) => {
    if (!device.favorite) return '';

    return (
      <div key={device.id}>
        <Row>
          <Col>{device.name}</Col>
        </Row>
        <Row>
          <Col className="col-2">
            <label htmlFor={`toggle-${device.id}`}>
              <Toggle
                checked={device.state !== 2}
                onChange={handleUpdateDevice(device.id, 'toggleState')}
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
                onChange={handleUpdateDevice(device.id, 'updateSlider')}
                onAfterChange={handleUpdateDevice(device.id, 'dim')}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  });
};

export default Devices;
