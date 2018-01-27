import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Container, Button /* , Row, Col */ } from 'reactstrap';
import request from 'request-promise';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { devices: [] };
  }

  onClick = () => {
    console.log('click');

    const options = {
      uri: 'http://192.168.10.159:3001',
      qs: {
        command: 'info',
        // command: 'on',
        // id: '6',
      },
      json: true,
      // resolveWithFullResponse: true,
    };

    // {"device":[{"id":6,"methods":3,"name":"Sovrum Tak","state":1,"statevalue":"","type":"device"},

    console.log(options);

    request(options)
      .then((res) => {
        console.log('RESPONSE', res.command, res.response);
        console.log('RESPONSE', res);
        if (res.command === 'info') this.setState({ devices: res.response.device });
      })
      .catch((err) => {
        console.log('Error', err.message);
      });
  };

  render() {
    const { devices } = this.state;
    return (
      <Container fluid className="page-content home-page">
        <h1>Innehåll</h1>
        <Button onClick={this.onClick} color="warning">
          warning
        </Button>
        {devices.map(device => <div>{device.name}</div>)}
      </Container>
    );
  }
}

/* Home.propTypes = {
  families: PropTypes.arrayOf(
    PropTypes.shape({
      family: PropTypes.string.isRequired,
      data: PropTypes.array.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ),
  images: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      uploaded: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

Home.defaultProps = {
  families: [],
}; */

export default Home;
