## Nginx
* [Info](https://medium.com/@johnbrett/create-react-app-push-state-nginx-config-a9f7530621c1)

``` bash
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/default

# Default server configuration
server {
  listen 80 default_server;
  server_name _;
  root home/olle/tellstick-znet-lite-local/build;
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
## Add SSL
https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-16-04

``` bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ~/.ssh/nginx-selfsigned.key -out ~/.ssh/nginx-selfsigned.crt
sudo openssl dhparam -out ~/.ssh/nginx.pem 2048
sudo nano /etc/nginx/snippets/self-signed.conf
  ssl_certificate /home/olle/.ssh/nginx-selfsigned.crt;
  ssl_certificate_key /home/olle/.ssh/nginx-selfsigned.key;

sudo nano /etc/nginx/snippets/ssl-params.conf

  # from https://cipherli.st/
  # and https://raymii.org/s/tutorials/Strong_SSL_Security_On_nginx.html

  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_prefer_server_ciphers on;
  ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";
  ssl_ecdh_curve secp384r1;
  ssl_session_cache shared:SSL:10m;
  ssl_session_tickets off;
  ssl_stapling on;
  ssl_stapling_verify on;
  resolver 8.8.8.8 8.8.4.4 valid=300s;
  resolver_timeout 5s;
  # Disable preloading HSTS for now.  You can use the commented out header line that includes
  # the "preload" directive if you understand the implications.
  #add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";
  add_header Strict-Transport-Security "max-age=63072000; includeSubdomains";
  add_header X-Frame-Options DENY;
  add_header X-Content-Type-Options nosniff;

  ssl_dhparam /home/olle/.ssh/nginx.pem;

sudo nano /etc/nginx/sites-available/default

Se fil extra/nginx.batch

```



## PM2
* [Info](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)

``` bash
# Install
sudo npm install -g pm2

# Start
pm2 start /home/olle/tellstick-znet-lite-local/api/app.js

# Add to auto start
pm2 startup systemd
sudo env PATH=$PATH:/usr/bin /home/olle/.npm-global/lib/node_modules/pm2/bin/pm2 startup systemd -u olle --hp /home/olle

# pm2 start/stop/restart app
```

### Force overwrite of local file with what's it origin repo?
If you want to overwrite only one file:

``` bash
git fetch
git checkout origin/master <filepath>
If you want to overwrite all changed files:

git fetch
git reset --hard origin/master
```
