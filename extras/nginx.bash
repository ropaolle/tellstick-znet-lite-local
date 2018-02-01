# Default server configuration
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name 192.168.10.146;
  return 302 https://$server_name$request_uri;
}

server {
  # SSL configuration
  listen 443 ssl http2 default_server;
  listen [::]:443 ssl http2 default_server;
  include snippets/self-signed.conf;
  include snippets/ssl-params.conf;

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
