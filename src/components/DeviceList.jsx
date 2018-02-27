import React, { Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash.map';
import { Row, Col } from 'reactstrap';
import Toggle from 'react-toggle';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class Devices extends Component {
  render() {
    const { devices, handleDeviceToggle, onSliderChange, handleDeviceDimmer } = this.props;

    return map(devices, (dev) => {
      if (![6, 8, 18].includes(dev.id)) return '';

      return (
        <div key={dev.id}>
          <Row>
            <Col>{dev.name}</Col>
          </Row>
          <Row>
            <Col className="col-2">
              <label htmlFor={`toggle-${dev.id}`}>
                <Toggle
                  checked={dev.state === 1}
                  id={dev.id.toString()}
                  onChange={handleDeviceToggle}
                />
              </label>
            </Col>
            <Col className="col-10">
              <div className="slider">
                <Slider
                  min={1}
                  max={255}
                  value={Number(dev.statevalue)}
                  disabled={!(dev.methods & 16)} // eslint-disable-line no-bitwise
                  onChange={onSliderChange(dev.id)}
                  onAfterChange={handleDeviceDimmer(dev.id)}
                />
              </div>
            </Col>
          </Row>
        </div>
      );
    });
  }
}

Devices.propTypes = {
  devices: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  handleDeviceToggle: PropTypes.func.isRequired,
  onSliderChange: PropTypes.func.isRequired,
  handleDeviceDimmer: PropTypes.func.isRequired,
};

export default Devices;
