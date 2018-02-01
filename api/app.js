const Koa = require('koa');
const cors = require('koa2-cors');
const request = require('request-promise');
const logger = require('./utils').logger;
const fs = require('fs');
const http = require('http');
const https = require('https');

const app = new Koa();
app.use(cors());

const HTTP_PORT = 4000;
const HTTPS_PORT = 4001;
const API_URL = 'http://192.168.10.104/api/';
const authorization = require('./authorization.json');

app.use(logger(this));

// const TELLSTICK_TURNON = 1;
// const TELLSTICK_TURNOFF = 2;
// const TELLSTICK_BELL = 4;
// const TELLSTICK_TOGGLE = 8;
// const TELLSTICK_DIM = 16;
// const TELLSTICK_LEARN = 32;
// const TELLSTICK_EXECUTE = 64;
// const TELLSTICK_UP = 128;
// const TELLSTICK_DOWN = 256;
// const TELLSTICK_STOP = 512;

app.use(async (ctx, next) => {
  const { id, command, level, supportedMethods } = ctx.request.query;

  let uri;
  if (id && supportedMethods && command === 'info') {
    uri = `${API_URL}device/info?id=${id}&supportedMethods=${supportedMethods}`;
  } else if (id && command === 'off') {
    uri = `${API_URL}device/turnOff?id=${id}`;
  } else if (id && command === 'on') {
    uri = `${API_URL}device/turnOn?id=${id}`;
  } else if (id && level && command === 'dim') {
    uri = `${API_URL}device/dim?id=${id}&level=${level}`;
  } else if (id && command === 'history') {
    uri = `${API_URL}device/history?id=${id}`;
  } else if (supportedMethods && command === 'deviceList') {
    uri = `${API_URL}devices/list?supportedMethods=${supportedMethods}`;
  } else if (supportedMethods && command === 'sensorList') {
    uri = `${API_URL}sensors/list?includeValues=1`;
  }

  const options = {
    uri,
    headers: {
      authorization: `Bearer ${authorization.accessToken}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET', // 'GET, POST, DELETE, PUT, OPTIONS, HEAD'
    },
    json: true,
    // resolveWithFullResponse: true,
  };

  await request(options)
    .then((response) => {
      // console.log('RESPONSE', response);
      this.locals = { status: 'success', uri, response };
      next();
    })
    .catch((err) => {
      console.log('Error', err.message);
      this.locals = { status: 'error', uri, err };
    });

  ctx.body = JSON.stringify(Object.assign(ctx.request.query, this.locals));
});

// app.listen(PORT, () => {
//   console.log(`Server listening on port: ${PORT}`);
// });

// HTTP/HTTPS servers
http.createServer(app.callback()).listen(HTTP_PORT);

const options = {
  key: fs.readFileSync('./ssh/tzll.pem', 'utf8'),
  cert: fs.readFileSync('./ssh/tzll.crt', 'utf8'),
};
https.createServer(options, app.callback()).listen(HTTPS_PORT);
