const Koa = require('koa');
const cors = require('koa2-cors');
const request = require('request-promise');
const utils = require('./utils');
const fs = require('fs');
const promisify = require('util').promisify;

const app = new Koa();
app.use(cors());

const HTTP_PORT = 4000;
const API_URL = 'http://192.168.10.104/api/';
const AUTH_PATH = `${__dirname}/authorization.json`;
let authorization = require('./authorization.json');

function parseCommand(query) {
  const SUPPORTED_METHODS = 19;

  const { id, command, level, requestToken } = query;

  switch (command) {
    // Device commands
    case 'info':
      return id && `${API_URL}device/info?id=${id}&supportedMethods=${SUPPORTED_METHODS}`;
    case 'deviceList':
      return `${API_URL}devices/list?supportedMethods=${SUPPORTED_METHODS}`;
    case 'off':
      return `${API_URL}device/turnOff?id=${id}`;
    case 'on':
      return `${API_URL}device/turnOn?id=${id}`;
    case 'dim':
      return (id && level) && `${API_URL}device/dim?id=${id}&level=${level}`;
    case 'history':
      return id && `${API_URL}device/history?id=${id}`;
    // Sensor commands
    case 'sensorList':
      return `${API_URL}sensors/list?includeValues=1`;
    case 'sensorInfo':
      return id && `${API_URL}sensor/info?id=${id}`;
    // Authentication
    case 'requestToken':
      return `${API_URL}token`;
    case 'accessToken':
      return `${API_URL}token?token=${requestToken}`;
    case 'refreshToken':
      return `${API_URL}refreshToken`;
    default:
      return null;
  }
}

function getOptions(query) {
  const uri = parseCommand(query);
  let options;

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
  if (query.command === 'requestToken') {
    options.method = 'PUT';
    options.form = { app: 'tzll' };
  }

  if (['accessToken', 'requestToken'].includes(query.command)) {
    delete options.headers;
  }

  return options;
}

app.use(utils.logger(this));

app.use(async (ctx) => {
  // Parse query and get options
  const options = getOptions(ctx.request.query);

  this.locals = {
    success: false,
    uri: options && options.uri,
    allowRenew: authorization.allowRenew,
    expires: authorization.expires,
    message: 'Unknown command',
  };

  if (options) {
    await request(options)
      .then((res) => {
        this.locals.success = true;
        this.locals.message = res;
      })
      .catch((err) => {
        this.locals.message = err.message;
      });
  }

  const { command } = ctx.request.query;

  if ((command === 'accessToken' || command === 'refreshToken') && this.locals.message.token) {
    authorization = {
      ...authorization,
      ...this.locals.message,
      accessToken: this.locals.message.token,
    };
    const writeFile = promisify(fs.writeFile);
    await writeFile(AUTH_PATH, JSON.stringify(authorization))
      .then(() => {
        delete this.locals.message.token;
      })
      .catch((err) => {
        this.locals.message = err.message;
      });
  }

  ctx.body = JSON.stringify(Object.assign(this.locals));
});

// Start API
app.listen(HTTP_PORT, () => {
  console.log(`Server listening on port: ${HTTP_PORT}`);
});
