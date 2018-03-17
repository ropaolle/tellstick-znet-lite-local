import React from 'react';
import { Row, Col, UncontrolledTooltip } from 'reactstrap';
import map from 'lodash.map';
import 'rc-slider/assets/index.css';

const FavoriteSensors = props => map(props.sensors, (sensor) => {
  if (!sensor.favorite) return '';

  const { id, name, temp, lum, humidity, battery, minMax } = sensor;

  // Icons: battery-half|full|quarter|three-quarters
  const batteryIcon = (battery > 200) ? 'fa fa-battery-full text-success' : 'fa fa-battery-quarter text-danger';

  const dateStr = date => new Date(date).toLocaleString();

  return (
    <div key={id}>
      <Row className="row-header">
        <Col><i className={batteryIcon} aria-hidden="true" /> {name}</Col>
      </Row>
      <Row>
        {<Col>
          <i className="fa fa-thermometer-half" aria-hidden="true" /> {temp} &deg;C{' '}
          {minMax && <span>
            <a id={`tooltip-${id}`}>
            (<i className="fa fa-caret-down text-primary" aria-hidden="true" /> {minMax.min.temp},{' '}
              <i className="fa fa-caret-up text-danger" aria-hidden="true" /> {minMax.max.temp}){' '}
            </a>
            <UncontrolledTooltip target={`tooltip-${id}`}>
            Max: {dateStr(minMax.max.updated)},
            Min: {dateStr(minMax.min.updated)},
            </UncontrolledTooltip></span>}
        </Col>}

      </Row>
      <Row>
        {lum && <Col>
          <i className="fa fa-lightbulb-o" aria-hidden="true" /> Luminosity: {lum}</Col>}
        {humidity && <Col>
          <i className="fa fa-tint" aria-hidden="true" /> Humidity: {humidity}%</Col>}
      </Row>
    </div>
  );
});

export default FavoriteSensors;
