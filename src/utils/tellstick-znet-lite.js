import request from 'request-promise';

export default async function telldusCommand(type, id, qs) {
  const paramId = id ? `/${id}` : '';

  const options = {
    uri: `http://192.168.10.146:4000/api/v1/${type}${paramId}`,
    qs,
    json: true,
    timeout: 1000,
  };

  const res = await request(options)
    .then(response => response)
    .catch(err => ({ success: false, message: err.message }));

  // console.log('RES', options, res);

  return res;
};
