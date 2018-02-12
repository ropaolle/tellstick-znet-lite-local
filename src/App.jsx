import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { UncontrolledAlert } from 'reactstrap';
import './App.css';
import AppNavbar from './AppNavbar';
import AuthDialog from './AuthDialog';
import Home from './pages/home/Home';
import Devices from './pages/devices/Devices';
import telldusCommand from './utils';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: '',
      dialog: false,
      devices: {},
      expires: 0,
      allowRenew: false,

      // sensors: {},
    };
  }

  componentDidMount = () => {
    telldusCommand({ command: 'deviceList' }, this.setAlert).then((response) => {
      console.log(response);
      const indexedById = response.device.reduce((acc, val) => {
        acc[val.id] = val;
        return acc;
      }, {});

      const { expires, allowRenew } = response;
      this.setState({ devices: indexedById, expires, allowRenew });
    });
  };

  setAlert = (alert) => {
    this.setState({ alert });
  }

  showDialog = () => {
    this.setState({ dialog: true });
  }

  closeDialog = () => {
    this.setState({ dialog: false });
  }

  render() {
    const { expires, allowRenew, dialog } = this.state;
    return (
      <Router>
        <div className="app">
          <AppNavbar showDialog={this.showDialog} />
          <AuthDialog expires={expires} allowRenew={allowRenew} show={dialog} close={this.closeDialog} />

          {this.state.alert && <UncontrolledAlert color="warning">{this.state.alert}</UncontrolledAlert>}
          <Route
            exact
            path="/"
            render={routeProps => (<Home
              {...routeProps}
              devices={this.state.devices}
              setAlert={this.setAlert}
            />)}
          />

          <Route path="/devices" render={routeProps => (<Devices {...routeProps} setAlert={this.setAlert} />)} />
          {/* <Route path="/devices" component={Devices} />
          <Route path="/auth" component={Auth} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
