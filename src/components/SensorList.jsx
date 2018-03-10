import React from 'react';
import { Row, Col } from 'reactstrap';
import map from 'lodash.map';
import 'rc-slider/assets/index.css';

const Sensors = (props) => {
  const { sensors } = props;

  return map(sensors, (sensor) => {
    if (!sensor.favorite) return '';

    const { id, name, temp, lum, humidity, battery/* , model, protocol */ } = sensor;

    return (
      <div key={id}>
        <Row className="row-header">
          <Col>{name} {temp} &deg;C</Col>
        </Row>
        <Row className="amb-2">
          {lum && <Col className="cola-2">Lum: {lum}</Col>}
          {humidity && <Col className="cola-2">Humidity: {humidity}%</Col>}
        </Row>
        <Row className="amb-2">
          {battery && <Col className="cola-2">Battery: {battery}</Col>}
        </Row>
      </div>
    );
  });
};

export default Sensors;
