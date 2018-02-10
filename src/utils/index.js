import request from 'request-promise';

export default function telldusCommand(qs) {
  const options = {
    // uri: 'http://192.168.10.146:4000',
    uri: 'http://localhost:4000',
    qs,
    json: true,
  };

  return request(options)
    .then(response =>
      ((response.success) ? Promise.resolve(response.message) : Promise.reject(response)),
    )
    .catch((err) => {
      console.log('telldusCommand error', err && err.message);
      return Promise.reject(err);
    });
}
