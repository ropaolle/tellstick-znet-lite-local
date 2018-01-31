import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import AppNavbar from './AppNavbar';
import Home from './pages/home/Home';
import Devices from './pages/devices/Devices';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { images: [], families: [], alert: '' };
  }

  render() {
    return (
      <Router>
        <div className="app">
          <AppNavbar />

          <Route exact path="/" component={Home} />
          <Route path="/devices" component={Devices} />
        </div>
      </Router>
    );
  }
}

export default App;
