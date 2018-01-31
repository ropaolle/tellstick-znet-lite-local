import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import map from 'lodash.map';
import { Container, Row, Col } from 'reactstrap';
import request from 'request-promise';
import Toggle from 'react-toggle';
import Slider from './Slider';

function telldusCommand(qs) {
  const options = {
    uri: 'http://192.168.10.100:3001',
    qs,
    json: true,
    // resolveWithFullResponse: true,
  };

  return request(options)
    .then((response) => {
      // console.log('Response', response, response.status);
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

// function requestSensorList() {
//   return telldusCommand({ command: 'sensorList' });
// }


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
  }

  // onClickDeviceToggle = (e) => {
  //   const id = e.target.id;
  //   const device = this.state.devices[id];
  //   const command = device.state === 2 ? 'on' : 'off';

  //   telldusCommand({ command, id }).then(() => {
  //     this.updateDeviceInfo(id);
  //   });
  // };

  // onClickDeviceDim = (e) => {
  //   const id = e.target.id;
  //   telldusCommand({ command: 'dim', id, level: 80 }).then(() => {
  //     this.updateDeviceInfo(id);
  //   });
  // };

  onClickDeviceToggle = (e, k) => {
    console.log(e, k);
    // const id = e.target.id;
    // const device = this.state.devices[id];
    // const command = device.state === 2 ? 'on' : 'off';

    // telldusCommand({ command, id }).then(() => {
    //   this.updateDeviceInfo(id);
    // });
  };

  updateDeviceInfo = ((id, delay = 1000) => {
    setTimeout(() => {
      requestDeviceInfo(Number(id)).then((device) => {
        const clone = Object.assign({}, this.state.devices, { [device.id]: device });
        this.setState({ devices: clone });
      });
    }, delay);
  });

  handleDeviceDimmer = id => (value) => {
    telldusCommand({ command: 'dim', id, level: value }).then(() => {
      this.updateDeviceInfo(id);
    });
  };

  render() {
    const { devices } = this.state;

    const deviceList = map(devices, ((dev) => {
      if (![6, 8, 18].includes(dev.id)) return '';

      console.log(dev, Number(dev.statevalue));

      return (<div>
        <Row><Col>{dev.name}</Col></Row>
        <Row>
          <Col className="col-2">
            <label htmlFor={`toggle-${dev.id}`}>
              <Toggle
                checked={dev.state === 1}
                id={`toggle-${dev.id}`}
                onChange={this.onClickDeviceToggle}
              />
            </label>
          </Col>
          <Col className="col-10">
            <div className="slider">
              <Slider
                value={Number(dev.statevalue)}
                onChangeComplete={this.handleDeviceDimmer(dev.id)}
              />
            </div>
          </Col>
        </Row></div>);
    }));

    return (
      <Container fluid className="page-content home-page">
        <h1>Devices</h1>
        {deviceList}
      </Container>
    );
  }
}

export default Devices;
