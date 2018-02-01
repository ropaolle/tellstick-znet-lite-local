import request from 'request-promise';

export default function telldusCommand(qs) {
  const options = {
    uri: 'http://192.168.10.146:4000',
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
      Promise.reject(err);
    });
}
