const Koa = require('koa');
const cors = require('koa2-cors');
const request = require('request-promise');
const logger = require('./utils').logger;

const app = new Koa();
app.use(cors());

const HTTP_PORT = 4000;
const API_URL = 'http://192.168.10.104/api/';

app.use(logger(this));

app.use(async (ctx, next) => {
  const uri = `${API_URL}token`;

  const options = {
    method: 'PUT',
    uri,
    form: { app: 'tzll' },
    json: true,
  };

  const uri2 = `${API_URL}token?token=${'0dd7ff9317774f1b8293ce291dc3707d'}`;
  const options2 = {
    uri: uri2,
    json: true,
  };

  this.locals = { success: false, uri, message: '' };

  {"allowRenew":true,"expires":1518333177,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImF1ZCI6InR6bGwiLCJleHAiOjE1MTgzMzMxNzd9.eyJyZW5ldyI6dHJ1ZSwidHRsIjo4NjQwMH0.C9Ng-qdJRqYugymWVELL7Ub1gDp5ag05P8lmj0A2pyE"}}

  // Request token
  await request(options2)
    .then((res) => {
      console.log('RESPONSE', res);
      this.locals.success = true;
      this.locals.message = res;
      next();
    })
    .catch((err) => {
      console.log('Error', err.message);
      this.locals.message = err;
    });

  if (this.locals.success) {
    console.log('SUCCESS 1');
  }

  ctx.body = JSON.stringify(Object.assign(this.locals));
});

app.listen(HTTP_PORT, () => {
  console.log(`Server listening on port: ${HTTP_PORT}`);
});

// {
//   authUrl: 'http://192.168.10.104/api/authorize?token=d39ea2a3ec7840f0a685dc02b6338403',
//   token: 'd39ea2a3ec7840f0a685dc02b6338403'
// }


// "message":{
//   "allowRenew":true,
//   "expires":1518332220,
//   "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImF1ZCI6bnVsbCwiZXhwIjoxNTE4MzMyMjIwfQ.eyJyZW5ldyI6dHJ1ZSwidHRsIjo4NjQwMH0.5b1dBGap8kFe0_SjQ_C9ZkgFGSvNsg5U4p1-NgDp5a0"
// }}
