const Koa = require('koa');
const request = require('request-promise');
const logger = require('./utils').logger;

const app = new Koa();

const PORT = 3000;
const API_URL = 'http://192.168.10.104/api/';
const authorization = require('./authorization.json');

app.use(logger(this));

app.use(async (ctx, next) => {
  const { id, command } = ctx.request.query;

  let uri;
  if (command === 'info') {
    uri = `${API_URL}devices/list?supportedMethods=3`;
  } else if (id && command === 'off') {
    uri = `${API_URL}device/turnOff?id=${id}`;
  } else if (id && command === 'on') {
    uri = `${API_URL}device/turnOn?id=${id}`;
  }

  const options = {
    uri,
    headers: { authorization: `Bearer ${authorization.accessToken}` },
    json: true,
    // resolveWithFullResponse: true,
  };

  await request(options)
    .then((response) => {
      // console.log('RESPONSE', response);
      this.locals = { status: 'succcess', uri, response };
      next();
    })
    .catch((err) => {
      console.log('Error', err.message);
      this.locals = { status: 'error', uri, err };
    });

  ctx.body = `Request Query: ${JSON.stringify(Object.assign(ctx.request.query, this.locals))}`;
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
