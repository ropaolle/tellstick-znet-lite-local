import telldusCommand from '../utils/tellstick-znet-lite';

it('Call tellstick-znet-lite api with Wreck - Invalid IP + pass Alert function', async () => {
  process.env.NODE_ENV = 'production';
  await telldusCommand({ command: 'devices', id: 1000 }, () => {})
    .then()
    .catch();
  process.env.NODE_ENV = 'test';
});
