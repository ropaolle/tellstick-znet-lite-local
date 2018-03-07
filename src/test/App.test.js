import React from 'react';
import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../App';

configure({ adapter: new Adapter() });

it('Renders App without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('Devices run methods', () => {
  const wrapper = shallow(<App />);
  // wrapper.instance().componentDidMount();
  wrapper.instance().showDialog(true);
  wrapper.instance().showDialog(false);
  wrapper.instance().setAlert('text');
  wrapper.instance().setExpiresAndAllowRenew({});
  wrapper.instance().updateDevice(1000, 'updateSlider', 80);
  wrapper.instance().updateDevice(1000, 'toggleFavorite', 80);
  wrapper.instance().updateDevice(1000, 'toggleState', 80);
  wrapper.instance().updateDevice(1000, 'dim', 80);
});
