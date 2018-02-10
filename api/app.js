const Koa = require('koa');
const cors = require('koa2-cors');
const request = require('request-promise');
const logger = require('./utils').logger;

const app = new Koa();
app.use(cors());

const HTTP_PORT = 4000;
const API_URL = 'http://192.168.10.104/api/';
const authorization = require('./authorization.json');

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

function getOptions(query) {
  const { id, command, level, /* supportedMethods,  */requestToken } = query;

  let options;
  let uri;

  const supportedMethods = 19;

  // Device commands
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

  if (uri) {
    options = {
      uri,
      headers: {
        authorization: `Bearer ${authorization.accessToken}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
      json: true,
    };
  }

  // Authentication
  if (command === 'requestToken') {
    options = {
      method: 'PUT',
      uri: `${API_URL}token`,
      form: { app: 'tzll' },
      json: true,
    };
  } else if (command === 'accessToken') {
    options = {
      uri: `${API_URL}?token=${requestToken}`,
      json: true,
    };
  }

  return options;
}

app.use(logger(this));

app.use(async (ctx/* , next */) => {
  this.locals = { success: false, message: 'Unknown command' };

  // Parse command and get options
  const options = getOptions(ctx.request.query);

  if (options) {
    await request(options)
      .then((res) => {
        this.locals.success = true;
        this.locals.message = res;
      // next();
      })
      .catch((err) => {
        this.locals.message = err.message;
      });
  }

  ctx.body = JSON.stringify(Object.assign(ctx.request.query, this.locals));
});

app.listen(HTTP_PORT, () => {
  console.log(`Server listening on port: ${HTTP_PORT}`);
});
