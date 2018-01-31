import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

class Horizontal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  handleChange = (value) => {
    this.setState({
      value,
    });
  };

  handleChangeComplete = (/* value */) => {
    this.props.onChangeComplete(this.state.value);
  };

  render() {
    const { value } = this.state;
    return (
      <div className="slider">
        <Slider
          min={0}
          max={255}
          value={value}
          onChange={this.handleChange}
          onChangeComplete={this.handleChangeComplete}
        />
        <div className="value">{value}</div>
      </div>
    );
  }
}

export default Horizontal;
