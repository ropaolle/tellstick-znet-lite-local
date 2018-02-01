# Tellstick

* [Blogg - Tellstick Local API](http://developer.telldus.com/blog/2016/05/24/local-api-for-tellstick-znet-lite-beta-now-in-public-beta)
* [Ollenet API access](http://192.168.10.104/api)
* [API Explorer](http://api.telldus.com/explore/index)
* [API flags](http://developer.telldus.se/doxygen/group__core.html#gaa732c3323e53d50e893c43492e5660c9) [extras](https://github.com/telldus/telldus/blob/master/examples/python/live/tdtool/tdtool.py)

## Info

* [Koa Async](https://medium.com/ninjadevs/node-7-6-koa-2-asynchronous-flow-control-made-right-b0d41c6ba570)
* [PM2](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)
* pm2 start/stop/restart app_name

## Get token

Local api access requiers an access token ([get new token](http://api.telldus.net/localapi/api.html)).

```bash
# 1. Get request token
curl -i -d app="ropaolle-sovrum" -X PUT http://192.168.10.104/api/token

# 2. Thru the link from step 1

# 3. Exchange the request token for an access token
curl -i -X GET http://192.168.10.104/api/token?token=a22a3d498a0d4304b09bf2f2dc7c61b4

# 4. Refresh access token
curl -i -X GET http://0.0.0.0/api/refreshToken -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImF1ZCI6IkV4YW1wbGUgYXBwIiwiZXhwIjoxNDUyOTUxNTYyfQ.eyJyZW5ldyI6dHJ1ZSwidHRsIjo4NjQwMH0.HeqoFM6-K5IuQa08Zr9HM9V2TKGRI9VxXlgdsutP7sg"
```

## SSL

https://github.com/dotcypress/koa-force-ssl
http://blog.bguiz.com/2015/12/17/letsencrypt-tls-certs-nodejs/

```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout tzll.key -out tzll.crt
sudo openssl dhparam -out tzll.pem 2048
```

```js
const Koa = require("koa");
const app = new Koa();
http.createServer(app.callback()).listen(80);
const options = {
  key: fs.readFileSync("../ssl/tzll.pem", "utf8"),
  cert: fs.readFileSync("../ssl/tzll.crt", "utf8")
};
https.createServer(options, app.callback()).listen(443);
```
