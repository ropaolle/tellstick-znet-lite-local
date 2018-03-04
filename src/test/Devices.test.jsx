import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Devices from '../components/Devices';
import DeviceList from '../components/DeviceList';
import DeviceTable from '../components/DeviceTable';

configure({ adapter: new Adapter() });

const devices = {
  0: { id: 0, methods: 19, name: 'Stickpropp Dim Zwave', state: 16, statevalue: 64, type: 'device' },
  6: { id: 6, methods: 19, name: 'Sovrum Tak', state: 2, statevalue: '', type: 'device' },
};

test('Render Devices', () => {
  const component = renderer.create(
    <Devices devices={devices} setAlert={() => {}} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Devices run methods', () => {
  const wrapper = shallow(<Devices devices={devices} setAlert={() => {}} />);
  wrapper.instance().handleDeviceDimmer(0)(80);
  wrapper.instance().handleDeviceToggle({ target: { id: 0 } });
  wrapper.instance().onSliderChange(0)(80);
  wrapper.instance().handleToggleListView();
  wrapper.instance().componentWillReceiveProps({ devices });
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
