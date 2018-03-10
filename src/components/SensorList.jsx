import React from 'react';
import map from 'lodash.map';
import { Row, Col } from 'reactstrap';
import Toggle from 'react-toggle';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// "id": 21,
// "sensorId": 21,
// "name": "Tvl\u00e5da",

// "model": "temperaturehumidity",
// "battery": 254,
// "protocol": "fineoffset",

// "humidity": "20",
// "temp": "24.0"
// "lum": "2.0",


const Sensors = (props) => {
  const { sensors, handleUpdateSensor } = props;

  return map(sensors, (sensor) => {
    console.log('X', sensors);
    if (!sensor.favorite) return '';

    return (
      <div key={sensor.id}>
        <Row>
          <Col>{sensor.name}</Col>
        </Row>
        <Row>
          <Col className="col-2">
            {sensor.model}
          </Col>
          <Col className="col-10">
            <div className="slider">
              {sensor.protocol}
            </div>
          </Col>
        </Row>
      </div>
    );
  });
};

export default Sensors;
