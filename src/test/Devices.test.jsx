import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Devices from '../components/Devices';
import DeviceList from '../components/DeviceList';
import DeviceTable from '../components/DeviceTable';

configure({ adapter: new Adapter() });

const devices = {
  2: { id: 2, methods: 19, name: 'Zwave', state: 2, statevalue: 64, type: 'device' },
  1000: { id: 1000, methods: 19, name: 'Zwave', state: 1, statevalue: 64, type: 'device' },
  1001: { id: 1001, methods: 19, name: 'Zwave', state: 2, statevalue: 64, type: 'device' },
};

test('Render Devices', () => {
  const component = renderer.create(<Devices devices={devices} updateDevice={() => {}} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Devices run methods', () => {
  const wrapper = shallow(<Devices devices={devices} updateDevice={() => {}} />);
  wrapper.instance().handleDeviceDimmer(1000, 'updateSlider')(80);
  wrapper.instance().handleDeviceDimmer(1001, 'dim')(0);
  wrapper.instance().handleDeviceToggle(1000, 'toggleState')();
  wrapper.instance().handleFavoriteChange(1000, 'toggleFavorite')();
  wrapper.instance().handleToggleListView();
});

test('Render DeviceList', () => {
  const component = renderer.create(
    <DeviceList devices={devices} handleDeviceToggle={() => {}} handleDeviceDimmer={() => {}} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render DeviceTable', () => {
  const component = renderer.create(
    <DeviceTable devices={devices} handleDeviceToggle={() => {}} handleFavoriteChange={() => {}} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
