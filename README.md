Tellstick Znet Lite local is a web app that lets you control your Tellstick devices locally without an internet connection.

### Codebeat
complexity 13 duplications 2 style 41 lines 459

[![codebeat badge](https://codebeat.co/badges/f5872716-6875-467e-abb6-17546612de7f)](https://codebeat.co/projects/github-com-ropaolle-tellstick-znet-lite-local-master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8dc951c84b004f56b2425e10fddcb5fe)](https://www.codacy.com/app/ropaolle/tellstick-znet-lite-local?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ropaolle/tellstick-znet-lite-local&amp;utm_campaign=Badge_Grade)
[![David badge](https://david-dm.org/ropaolle/tellstick-znet-lite-local.svg)](https://david-dm.org/ropaolle/tellstick-znet-lite-local)
[![DevDependencies](https://img.shields.io/david/dev/ropaolle/tellstick-znet-lite-local.svg)](https://david-dm.org/ropaolle/tellstick-znet-lite-local#info=devDependencies&view=list)

[![Known Vulnerabilities](https://snyk.io/test/github/ropaolle/tellstick-znet-lite-local/badge.svg?targetFile=api%2Fpackage.json)](https://snyk.io/test/github/ropaolle/tellstick-znet-lite-local?targetFile=api%2Fpackage.json)

![img](extras/dev-settings.png)

![img](extras/devices.png)

## Start App/Api
``` bash
# App
service nginx start/status
# Api
cd /home/olle/tellstick-znet-lite-local/api && pm2 start app.js
# pm2 status
```

## Nginx
* [Info](https://medium.com/@johnbrett/create-react-app-push-state-nginx-config-a9f7530621c1)

``` bash
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/default

# Default server configuration
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name 192.168.10.146;

  root /home/olle/tellstick-znet-lite-local/build;

  # Routes without file extension e.g. /user/1
  location / {
    try_files $uri /index.html;
  }

  # 404 if a file is requested (so the main app isn't served)
  location ~ ^.+\..+$ {
    try_files $uri =404;
  }
}

sudo service nginx start
```

## Pull repo

``` bash
# Pull
git pull origin master

# Force overwrite of local file with what's it origin repo 
git fetch
git reset --hard origin/master
```
