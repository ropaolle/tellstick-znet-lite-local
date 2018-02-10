import React, { Component } from 'react';
import map from 'lodash.map';
import { Container, Row, Col } from 'reactstrap';
import Toggle from 'react-toggle';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import telldusCommand from '../../utils';

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = { devices: {}, sensors: {} };
  }

  componentDidMount = () => {
    telldusCommand({ command: 'deviceList', supportedMethods: 19 })
      .then((response) => {
        const indexedById = response.device.reduce((acc, val) => {
          acc[val.id] = val;
          return acc;
        }, {});

        this.setState({ devices: indexedById });
      }).catch(err => err); // TODO: Need catch to get rid of uncaught error.
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
    }).catch(err => err); // TODO: Need catch to get rid of uncaught error.
  };

  handleDeviceDimmer = id => (value) => {
    telldusCommand({ command: 'dim', id, level: value }).then(() => {
      this.updateDeviceInfo(id);
    }).catch(err => err); // TODO: Need catch to get rid of uncaught error.
  };

  updateDeviceInfo = (id, delay = 1000) => {
    setTimeout(() => {
      telldusCommand({ command: 'info', supportedMethods: 19, id: Number(id) })
        .then((device) => {
          const clone = Object.assign({}, this.state.devices, { [device.id]: device });
          this.setState({ devices: clone });
        }).catch(err => err); // TODO: Need catch to get rid of uncaught error.
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
                  min={1}
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
