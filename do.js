const http = require('http');

// console.log(process.argv);

let command = '';
switch (process.argv[2]) {
  case 'on':
    command = 'turnOn';
    break;
  case 'off':
    command = 'turnOff';
    break;
  case 'info':
    command = 'info';
    break;
  default:
    command = null;
}

let id = '';
switch (process.argv[3]) {
  case 'vardagsrum':
    id = '8';
    break;
  case 'sovrum':
    id = '6';
    break;
  default:
    id = null;
}

let path;
if (!command || command === 'info') {
  path = '/api/devices/list?supportedMethods=3';
} else if (command && id) {
  path = `/api/device/${command}?id=${id}`;
} else {
  return console.log('node do {on/off/info} {sovrum/vardagsrum}');
}

const options = {
  hostname: '192.168.10.104',
  port: 80,
  path,
  method: 'GET',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImF1ZCI6InJvcGFvbGxlLXNvdnJ1bSIsImV4cCI6MTUxNzkzMjMxN30.eyJyZW5ldyI6dHJ1ZSwidHRsIjoyNDE5MjAwfQ.XYDHxcGUKIViOcAC48Ezbu3NMXrsIaCD2zqzpMB67AU',
  },
};

let data = '';
const req = http.request(options, (res) => {
  // console.log(`STATUS: ${res.statusCode}`);
  // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  // res.setEncoding('utf8');
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const result = JSON.parse(data);
    if (Array.isArray(result.device)) {
      console.log(result.device.map(val => ({ [val.id]: val.name })));
    } else {
      console.log(result);
    }
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
});

req.end();

return null;
