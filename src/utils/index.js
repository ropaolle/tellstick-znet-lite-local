import request from 'request-promise';

export default function telldusCommand(qs) {
  const options = {
    uri: 'http://192.168.10.146:4000',
    qs,
    json: true,
  };

  return request(options)
    .then((response) => {
      if (response.status !== 'success') return Promise.reject(response);
      return Promise.resolve(response.response);
    })
    .catch(err => Promise.reject(err));
}
