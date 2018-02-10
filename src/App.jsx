import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import AppNavbar from './AppNavbar';
import Home from './pages/home/Home';
import Devices from './pages/devices/Devices';
import Auth from './pages/auth/Auth';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { dummy: '' };
  }

  render() {
    return (
      <Router>
        <div className="app">
          <AppNavbar />

          <Route exact path="/" component={Home} />
          <Route path="/devices" component={Devices} />
          <Route path="/auth" component={Auth} />
        </div>
      </Router>
    );
  }
}

export default App;
