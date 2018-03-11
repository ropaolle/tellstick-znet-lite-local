import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = 'http://192.168.10.146:4000/api/v1/';
// axios.defaults.baseURL = 'http://localhost::4000/api/v1/';
axios.defaults.timeout = 1000;

function getUrl(type, id, query) {
  const queryString = qs.stringify(query);
  let path = type;
  if (id) path += `/${id}`;
  if (queryString) path += `?${queryString}`;
  return path;
}

export default async function telldusCommand(type, id, query) {
  try {
    const response = await axios.get(getUrl(type, id, query));
    // console.log('Response', response);

    return response.data;
  } catch (err) {
    return { success: false, message: err.message };
  }
}
