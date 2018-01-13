echo "$1"

if [ $1 = off ]
then
  curl -i -X GET http://192.168.10.104/api/device/turnOff?id=6 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImF1ZCI6InJvcGFvbGxlLXNvdnJ1bSIsImV4cCI6MTUxNzkzMjMxN30.eyJyZW5ldyI6dHJ1ZSwidHRsIjoyNDE5MjAwfQ.XYDHxcGUKIViOcAC48Ezbu3NMXrsIaCD2zqzpMB67AU"
else
  curl -i -X GET http://192.168.10.104/api/device/turnOn?id=6 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImF1ZCI6InJvcGFvbGxlLXNvdnJ1bSIsImV4cCI6MTUxNzkzMjMxN30.eyJyZW5ldyI6dHJ1ZSwidHRsIjoyNDE5MjAwfQ.XYDHxcGUKIViOcAC48Ezbu3NMXrsIaCD2zqzpMB67AU"
fi
