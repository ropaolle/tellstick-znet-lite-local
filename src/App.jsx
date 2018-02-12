import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { UncontrolledAlert } from 'reactstrap';
import './App.css';
import AppNavbar from './AppNavbar';
import Home from './pages/home/Home';
import Devices from './pages/devices/Devices';
import Auth from './pages/auth/Auth';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { alert: '' };
  }

  setAlert = (alert) => {
    this.setState({ alert });
  }

  render() {
    return (
      <Router>
        <div className="app">
          <AppNavbar />
          {this.state.alert && <UncontrolledAlert color="warning">{this.state.alert}</UncontrolledAlert>}
          <Route exact path="/" render={routeProps => (<Home {...routeProps} setAlert={this.setAlert} />)} />
          <Route path="/devices" render={routeProps => (<Devices {...routeProps} setAlert={this.setAlert} />)} />
          <Route path="/auth" render={routeProps => (<Auth {...routeProps} setAlert={this.setAlert} />)} />
          {/* <Route path="/devices" component={Devices} />
          <Route path="/auth" component={Auth} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
