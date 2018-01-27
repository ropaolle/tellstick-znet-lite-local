require('babel-register');

const Koa = require('koa');
const request = require('request-promise');
const authorization = require('./authorization.json');

const app = new Koa();
const PORT = 3000;

app.use(async (ctx, next) => {
  const start = Date.now();
  console.log(`STARTED: ${start}`);
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${JSON.stringify(ctx.request.query)} - ${ms}ms`);
});

// app.use(async (ctx, next) => {
//   // Step 1
//   const start = new Date();
//   console.log(`Started at: ${start}`);
//   await next(); // Step 2
//   // Step 7
//   const ms = new Date() - start;
//   console.log(`Elapsed: ${ms}ms`);
// });
// app.use(async (ctx, next) => {
//   // Step 3
//   console.log('Hey, I\'m just another middleware');
//   await next(); // Step 4
//   // Step 6
//   console.log('More stuff after body has been set');
// });
// app.use(async (ctx) => {
//   const name = 'await dbCall()';
//   // Step 5
//   ctx.body = `Hello ${name}`;
//   console.log('Body has been set');
// });


async function timeout(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('random');
    }, delay);
  });
}

async function relay() {
  await timeout(5000);
}


app.use(async (ctx, next) => {
  const { id, command } = ctx.request.query;

  let url;
  if (command === 'info') {
    url = 'http://192.168.10.103/api/devices/list?supportedMethods=3';
  } else if (id && command === 'off') {
    url = `http://192.168.10.104/api/device/turnOff?id=${id}`;
  } else if (id && command === 'on') {
    url = `http://192.168.10.104/api/device/turnOn?id=${id}`;
  }

  const options = { url, headers: authorization };

  // await relay();

  // request(options, (err, res, body) => {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log('BODY', body);
  //   // console.log(`Request Query 1: ${JSON.stringify(body)}`);
  //   ctx.body = `Request Query: ${JSON.stringify(body)}`;
  //   return '';
  //   // return next().then(() => {
  //   //   ctx.body = `Request Query: ${JSON.stringify(body)}`;
  //   // });
  // });

  await request(options)
    .then((htmlString) => {
      console.log('HTML');
      // Process html...
      next();
    })
    .catch((err) => {
      console.log('ERR');
      next();
      // Crawling failed...
    });


  console.log('INPUT:', id, command, url);
  // console.log(`Request Query 2: ${JSON.stringify(ctx.request.query)}`);

  // ctx.body = `Request Query: ${JSON.stringify(ctx.request.query)}`;
});


app.use(async (ctx) => {
  console.log('DONE');
  ctx.body = `Request Query: ${JSON.stringify(ctx.request.query)}`;
});


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
