import request from 'request-promise';

export default function telldusCommand(qs) {
  const options = {
    // uri: 'http://192.168.10.159:3001',
    uri: 'http://localhost:3001',
    qs,
    json: true,
    // resolveWithFullResponse: true,
  };

  return request(options)
    .then((response) => {
      if (response.status !== 'success') return Promise.reject(response);
      return Promise.resolve(response.response);
    })
    .catch((err) => {
      console.log('ERROR', err.message); // eslint-disable-line no-console
    });
}
