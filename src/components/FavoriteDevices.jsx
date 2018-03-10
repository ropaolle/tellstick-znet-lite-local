import React from 'react';
import { Row, Col } from 'reactstrap';
import Toggle from 'react-toggle';
import Slider from 'rc-slider';
import map from 'lodash.map';
import 'rc-slider/assets/index.css';

const FavoriteDevices = (props) => {
  const { handleUpdateDevice } = props;

  return map(props.devices, (device) => {
    if (!device.favorite) return '';

    const isDimmable = Boolean(device.methods & 16); // eslint-disable-line no-bitwise

    return (
      <div key={device.id}>
        <Row className="row-header">
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
            {isDimmable && <div className="slider">
              <Slider
                min={0}
                max={255}
                value={Number(device.statevalue)}
                disabled={!isDimmable}
                onChange={handleUpdateDevice(device.id, 'updateSlider')}
                onAfterChange={handleUpdateDevice(device.id, 'dim')}
              />
            </div>}
          </Col>
        </Row>
      </div>
    );
  });
};

export default FavoriteDevices;
