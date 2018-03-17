import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Devices from '../components/Devices';
import DeviceTable from '../components/DeviceTable';

configure({ adapter: new Adapter() });

const devices = {
  2: {
    id: 2,
    methods: 19,
    name: 'Zwave',
    state: 2,
    statevalue: 64,
    type: 'device',
    favorite: true,
  },
  1000: {
    id: 1000,
    methods: 3,
    name: 'Zwave',
    state: 1,
    statevalue: 64,
    type: 'device',
    favorite: false,
  },
  1001: { id: 1001, methods: 19, name: 'Zwave', state: 2, statevalue: 64, type: 'device' },
};

const sensors = {
  21: {
    id: 21,
    type: 'sensor',
    battery: 222,
    favorite: true,
    temp: '23',
    lum: '22',
    humidity: '2.0',
    minMax: { min: { temp: 0, updated: 0 }, max: { temp: 0, updated: 0 } },
  },
  22: {
    id: 22,
    type: 'sensor',
    battery: 222,
    favorite: false,
    temp: '23',
    lum: '22',
    humidity: '2.0',
    minMax: { min: { temp: 0, updated: 0 }, max: { temp: 0, updated: 0 } },
  },
};

test('Render Devices', () => {
  const component = renderer.create(
    <Devices devices={devices} sensors={sensors} updateDevice={() => {}} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Devices run methods', () => {
  const wrapper = shallow(<Devices devices={devices} sensors={sensors} updateDevice={() => {}} />);
  wrapper.instance().handleUpdateDevice(1000, 'updateSlider')(80);
  wrapper.instance().handleUpdateDevice(1000, 'toggleFavorite-sensor')(null);
  wrapper.instance().handleUpdateDevice(1000, 'toggleFavorite-device')(null);
  wrapper.instance().handleUpdateDevice(1000, 'dummy')(null);
  wrapper.instance().handleToggleListView();
});

test('Render DeviceTable', () => {
  const component = renderer.create(
    <DeviceTable devices={devices} sensors={sensors} handleUpdateDevice={() => {}} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Devices run methods', () => {
  shallow(
    <DeviceTable devices={devices} sensors={sensors} handleUpdateDevice={() => {}} />,
  );
});
