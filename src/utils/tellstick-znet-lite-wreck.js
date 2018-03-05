import Wreck from 'wreck';
import queryString from 'query-string';

const options = {
  timeout: 1000,
  baseUrl: 'http://192.168.10.146:4000/v1/',
};

const telldusCommand = async function telldusCommand(qs, alert) {
  if (typeof alert === 'function') alert(''); // Clear alert

  const id = qs.id ? `/${qs.id}` : '';
  const url = `${qs.type}${id}`;
  console.log(url, qs);
  console.log(queryString.stringify(qs));
  const promise = Wreck.request('GET', url, options);

  try {
    const res = await promise;
    // json: 'strict' returns an error in case of none json resonse.
    const body = await Wreck.read(res, { json: 'strict' });

    console.log(body);

    return body;
  } catch (err) {
    return { success: false, message: err.message };
  }
};

// const telldusCommand = async function telldusCommand(qs, alert) {

//   const res = await request(options)
//     .then(response => response)
//     .catch(err => ({ success: false, message: err.message }));

//   if (!res.success && typeof alert === 'function') alert(res.message);

//   return res;
// };
export default telldusCommand;
