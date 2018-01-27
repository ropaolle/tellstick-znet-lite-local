require('babel-register');

const Koa = require('koa');
const request = require('request');

const app = new Koa();
const PORT = 3000;

app.use((ctx, next) => {
  const start = Date.now();
  return next().then(() => {
    const ms = Date.now() - start;
    console.log(
      `${ctx.method} ${ctx.url} - ${JSON.stringify(
        ctx.request.query,
      )} - ${ms}ms`,
    );
  });
});

app.use((ctx) => {
  const { id, command } = ctx.request.query;

  let url;
  if (command == 'info') {
    url = 'http://192.168.10.104/api/devices/list?supportedMethods=3';
  } else if (id && command === 'off') {
    url = `http://192.168.10.104/api/device/turnOff?id=${id}`;
  } else if (id && command === 'on') {
    url = `http://192.168.10.104/api/device/turnOn?id=${id}`;
  }

  console.log('INPUT:', id, command, url);

  if (url) {
    const options = {
      url,
      // json: true,
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImF1ZCI6InJvcGFvbGxlLXNvdnJ1bSIsImV4cCI6MTUxNzkzMjMxN30.eyJyZW5ldyI6dHJ1ZSwidHRsIjoyNDE5MjAwfQ.XYDHxcGUKIViOcAC48Ezbu3NMXrsIaCD2zqzpMB67AU',
      },
    };

    request(options, (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      console.log(body);
      // return next().then(() => {
      //   ctx.body = `Request Query: ${JSON.stringify(body)}`;
      // });
    });
  }

  ctx.body = `Request Query: ${JSON.stringify(ctx.request.query)}`;
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
