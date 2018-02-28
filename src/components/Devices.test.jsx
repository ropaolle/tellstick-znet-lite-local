import React from 'react';
import renderer from 'react-test-renderer';
import Devices from './Devices';
import DeviceList from './DeviceList';
import DeviceTable from './DeviceTable';

const devices = {
  2: { id: 2, methods: 19, name: 'Stickpropp Dim Zwave', state: 16, statevalue: 64, type: 'device' },
  6: { id: 6, methods: 19, name: 'Sovrum Tak', state: 2, statevalue: '', type: 'device' },
};

test('Render Devices', () => {
  const component = renderer.create(
    <Devices devices={devices} setAlert={() => {}} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render DeviceList', () => {
  const component = renderer.create(
    <DeviceList
      devices={devices}
      handleDeviceToggle={() => {}}
      onSliderChange={() => {}}
      handleDeviceDimmer={() => {}}
    />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render DeviceTable', () => {
  const component = renderer.create(
    <DeviceTable
      devices={devices}
      handleDeviceToggle={() => {}}
      onSliderChange={() => {}}
      handleDeviceDimmer={() => {}}
    />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
