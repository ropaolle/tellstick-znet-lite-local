import telldusCommand, { updateDeviceInfo } from './tellstick-znet-lite';

it('Call tellstick-znet-lite api - valid IP', (done) => {
  updateDeviceInfo(6, done);
});

it('Call tellstick-znet-lite api - Invalid IP + pass Alert function', (done) => {
  process.env.NODE_ENV = 'production';
  telldusCommand({ command: 'deviceList' }, () => {}).then(() => {
    done();
  });
  process.env.NODE_ENV = 'test';
});