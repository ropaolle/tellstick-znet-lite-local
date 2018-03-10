import React from 'react';
import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../App';
import AuthDialog from '../AuthDialog';
import Navbar from '../Navbar';

configure({ adapter: new Adapter() });

it('Renders App without crashing', () => {

});

it('Renders App without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('App run methods', () => {
  const wrapper = shallow(<App />);
  // wrapper.instance().componentDidMount();
  wrapper.instance().showDialog(true);
  wrapper.instance().showDialog(false);
  wrapper.instance().setAlert('some text');
  wrapper.instance().setExpiresAndAllowRenew({});
  wrapper.instance().updateDevice(1000, 'updateSlider', 80);
  wrapper.instance().updateDevice(1000, 'toggleFavorite-sensor');
  wrapper.instance().updateDevice(1000, 'toggleFavorite-device');
  wrapper.instance().updateDevice(1000, 'dummy');
  wrapper.instance().updateDevice(1000, 'toggleState', 80);
  wrapper.instance().updateDevice(1000, 'dim', 80);
});

test('AuthDialog run methods', () => {
  const wrapper = shallow(<AuthDialog
    expires={0}
    allowRenew
    show={false}
    close={() => {}}
    setExpiresAndAllowRenew={() => {}}
  />);
  wrapper.instance().showAlert({ message: { newAccessToken: true } }, true);
  wrapper.instance().showAlert({ message: { newAccessToken: false } }, false);
  wrapper.instance().handleRequestToken();
  wrapper.instance().handleRefreshToken();
  wrapper.instance().handleAuthentication();
  wrapper.instance().handleAccessToken();
  wrapper.instance().handleClose();
});

test('Navbar run methods', () => {
  const wrapper = shallow(<Navbar showDialog={() => {}} />);
  wrapper.instance().toggle();
  wrapper.instance().toggle();
});
