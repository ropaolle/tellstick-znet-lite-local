const Koa = require('koa');
// const koaBody = require('koa-body');
const request = require('request');

const app = new Koa();
const PORT = 3000;
// app.use(koaBody());

app.use((ctx, next) => {
  const start = Date.now();
  return next().then(() => {
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${JSON.stringify(ctx.request.query)} - ${ms}ms`);
  });
});

app.use((ctx) => {
  /* console.log('Url: ', ctx.request.url);
  console.log('Query: ', ctx.request.query);
  console.log('Search: ', ctx.request.search);
  console.log('URL: ', ctx.request.URL); */

  // request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
  //   if (err) { return console.log(err); }
  //   console.log(body.url);
  //   console.log(body.explanation);
  // });

  const options = {
    //url: 'http://192.168.10.104/api/devices/list?supportedMethods=3',
    url: 'http://192.168.10.104/api/device/turnOn?id=6',
    // json: true,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImF1ZCI6InJvcGFvbGxlLXNvdnJ1bSIsImV4cCI6MTUxNzkzMjMxN30.eyJyZW5ldyI6dHJ1ZSwidHRsIjoyNDE5MjAwfQ.XYDHxcGUKIViOcAC48Ezbu3NMXrsIaCD2zqzpMB67AU',
    }
  };

  request(options, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body);
    console.log(body.url);
    console.log(body.explanation);
  });

  ctx.body = `Request Query: ${JSON.stringify(ctx.request.query)}`;
});

/* const server =  */app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
