import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import map from 'lodash.map';
import { Container, Button, Row, Col, Card, /* CardHeader,  */CardImg, CardBody, CardTitle, CardFooter } from 'reactstrap';
import request from 'request-promise';
import bedroom from './bedroom.jpeg';
import livingroom from './livingroom.jpg';
import window from './window.jpg';

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

  onClickDeviceToggle = (e) => {
    const id = e.target.id;
    const device = this.state.devices[id];
    const command = device.state === 2 ? 'on' : 'off';

    telldusCommand({ command, id }).then(() => {
      this.updateDeviceInfo(id);
    });
  };

  onClickDeviceDim = (e) => {
    const id = e.target.id;
    telldusCommand({ command: 'dim', id, level: 80 }).then(() => {
      this.updateDeviceInfo(id);
    });
  };

  updateDeviceInfo = ((id, delay = 1000) => {
    setTimeout(() => {
      requestDeviceInfo(Number(id)).then((device) => {
        const clone = Object.assign({}, this.state.devices, { [device.id]: device });
        this.setState({ devices: clone });
      });
    }, delay);
  });

  render() {
    const { devices } = this.state;

    const deviceTable = map(devices, ((dev) => {
      if (![6, 8, 18].includes(dev.id)) return '';
      let img = bedroom;
      if (dev.id === 8) img = window;
      if (dev.id === 18) img = livingroom;

      return (<Col xs="12" sm="6" md="4" key={dev.id} className="mb-4">
        <Card className="home-cards">
          <CardImg top width="100%" src={img} alt="Card image cap" />
          <CardBody>
            <CardTitle>{dev.name}</CardTitle>
            <Button
              onClick={this.onClickDeviceToggle}
              id={dev.id}
              color={dev.state === 2 ? 'success' : 'danger'}
            >
              {dev.state === 2 ? 'På' : 'Av'}
            </Button>{' '}
            <Button onClick={this.onClickDeviceDim} id={dev.id} color="warning">Dim</Button>
          </CardBody>
          <CardFooter>State: {dev.state}, Value: {dev.statevalue}</CardFooter>
        </Card>
      </Col>);
    }));

    /*
<tr key={dev.id}>
        <td>{dev.id}</td>
        <td>{dev.name}</td>
        <td>
          <Button
            onClick={this.onClickDeviceToggle}
            id={dev.id}
            color={dev.state === 2 ? 'success' : 'danger'}
          >
            {dev.state === 2 ? 'På' : 'Av'}
          </Button>{' '}
          <Button onClick={this.onClickDeviceDim} id={dev.id} color="warning">Dim</Button>
        </td>
      </tr>
*/

    return (
      <Container fluid className="page-content home-page">
        <h1>Devices</h1>
        <Row>{deviceTable}</Row>
      </Container>
    );
  }
}

export default Devices;
