import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class AppNavbar extends React.Component {
  static propTypes = {
    showDialog: PropTypes.func.isRequired,
    clearMinMax: PropTypes.func.isRequired,
  }

  state = {
    isOpen: false,
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="#">
            <img src="./favicon-32x32.png" alt="" />Tellstick Znet Lite Local
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem >
                <NavLink href="#" onClick={this.props.showDialog}>Auth</NavLink>
              </NavItem>
              <NavItem >
                <NavLink href="#" onClick={this.props.clearMinMax}>Clear minMax</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
