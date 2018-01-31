import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import map from 'lodash.map';
import { Container, Row, Col } from 'reactstrap';
import request from 'request-promise';
import Toggle from 'react-toggle';
// import Slider from './Slider';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function telldusCommand(qs) {
  const options = {
    uri: 'http://192.168.10.159:3001',
    qs,
    json: true,
    // resolveWithFullResponse: true,
  };

  return request(options)
    .then((response) => {
      if (response.status !== 'success') return Promise.reject(response);
      return Promise.resolve(response.response);
    })
    .catch((err) => {
      console.log('ERROR', err.message);
    });
}

function requestDeviceList() {
  return telldusCommand({ command: 'deviceList', supportedMethods: 19 });
}

function requestDeviceInfo(id) {
  return telldusCommand({ command: 'info', supportedMethods: 19, id });
}

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = { devices: {}, sensors: {} };
  }

  componentDidMount = () => {
    requestDeviceList().then((response) => {
      const indexedById = response.device.reduce((acc, val) => {
        acc[val.id] = val;
        return acc;
      }, {});

      this.setState({ devices: indexedById });
    });
  };

  onSliderChange = id => (value) => {
    const { devices } = this.state; // TODO clone
    devices[id].statevalue = value;
    this.setState({ devices });
  };

  handleDeviceToggle = (e) => {
    const id = Number(e.target.id);
    const device = this.state.devices[id];
    const command = device.state === 1 ? 'off' : 'on';

    telldusCommand({ command, id }).then(() => {
      this.updateDeviceInfo(id);
    });
  };

  handleDeviceDimmer = id => (value) => {
    telldusCommand({ command: 'dim', id, level: value }).then(() => {
      this.updateDeviceInfo(id);
    });
  };

  updateDeviceInfo = (id, delay = 1000) => {
    setTimeout(() => {
      requestDeviceInfo(Number(id)).then((device) => {
        const clone = Object.assign({}, this.state.devices, { [device.id]: device });
        this.setState({ devices: clone });
      });
    }, delay);
  };

  render() {
    const { devices } = this.state;

    const deviceList = map(devices, (dev) => {
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
                  onChange={this.handleDeviceToggle}
                />
              </label>
            </Col>
            <Col className="col-10">
              <div className="slider">
                <Slider
                  min={0}
                  max={255}
                  value={Number(dev.statevalue)}
                  disabled={!(dev.methods & 16)} // eslint-disable-line no-bitwise
                  onChange={this.onSliderChange(dev.id)}
                  onAfterChange={this.handleDeviceDimmer(dev.id)}
                />
              </div>
            </Col>
          </Row>
        </div>
      );
    });

    return (
      <Container fluid className="page-content home-page">
        <h1>Devices</h1>
        {deviceList}
      </Container>
    );
  }
}

export default Devices;
