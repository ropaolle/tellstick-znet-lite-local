
# PM2
* [Info](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)

``` bash
# Install
sudo npm install -g pm2

# Start
cd /home/olle/tellstick-znet-lite-local/api && pm2 start app.js

# Add to auto start
pm2 startup systemd
sudo env PATH=$PATH:/usr/bin /home/olle/.npm-global/lib/node_modules/pm2/bin/pm2 startup systemd -u olle --hp /home/olle

# pm2 start/stop/restart/status/kill all
```
## Info

* [Koa Async](https://medium.com/ninjadevs/node-7-6-koa-2-asynchronous-flow-control-made-right-b0d41c6ba570)


# Tellstick

* [Blogg - Tellstick Local API](http://developer.telldus.com/blog/2016/05/24/local-api-for-tellstick-znet-lite-beta-now-in-public-beta)
* [Ollenet API access](http://192.168.10.104/api)
* [API Explorer](http://api.telldus.com/explore/index)
* [API flags](http://developer.telldus.se/doxygen/group__core.html#gaa732c3323e53d50e893c43492e5660c9) [extras](https://github.com/telldus/telldus/blob/master/examples/python/live/tdtool/tdtool.py)

## Constants
```javascript
const TELLSTICK_TURNON = 1;
const TELLSTICK_TURNOFF = 2;
const TELLSTICK_BELL = 4;
const TELLSTICK_TOGGLE = 8;
const TELLSTICK_DIM = 16;
const TELLSTICK_LEARN = 32;
const TELLSTICK_EXECUTE = 64;
const TELLSTICK_UP = 128;
const TELLSTICK_DOWN = 256;
const TELLSTICK_STOP = 512;
```

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

