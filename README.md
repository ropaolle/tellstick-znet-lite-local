## Check status
``` bash
# App
service nginx status
# Api
pm2 status
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
