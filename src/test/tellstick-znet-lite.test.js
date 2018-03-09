import telldusCommand from '../utils/tellstick-znet-lite';

it('Call tellstick-znet-lite api', async () => {
  process.env.NODE_ENV = 'production';
  await telldusCommand('devices', 1000, {}, () => {})
    .then()
    .catch();
  process.env.NODE_ENV = 'test';
});
