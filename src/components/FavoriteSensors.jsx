import React from 'react';
import { Row, Col } from 'reactstrap';
import map from 'lodash.map';
import 'rc-slider/assets/index.css';

const FavoriteSensors = props => map(props.sensors, (sensor) => {
  if (!sensor.favorite) return '';

  const { id, name, temp, lum, humidity, battery } = sensor;

  // Icons: battery-half|full|quarter|three-quarters
  const batteryIcon = (battery > 200) ? 'fa fa-battery-full text-success' : 'fa fa-battery-quarter text-danger';

  return (
    <div key={id}>
      <Row className="row-header">
        <Col><i className={batteryIcon} aria-hidden="true" /> {name}</Col>
      </Row>
      <Row className="amb-2">
        {<Col className="cola-2">
          <i className="fa fa-thermometer-half" aria-hidden="true" /> Temp: {temp} &deg;C</Col>}
      </Row>
      <Row className="amb-2">
        {lum && <Col className="cola-2">
          <i className="fa fa-lightbulb-o" aria-hidden="true" /> Luminosity: {lum}</Col>}
        {humidity && <Col className="cola-2">
          <i className="fa fa-tint" aria-hidden="true" /> Humidity: {humidity}%</Col>}
      </Row>
    </div>
  );
});

export default FavoriteSensors;
