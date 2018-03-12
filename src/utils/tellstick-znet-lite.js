import axios from 'axios';
import qs from 'qs';

// Load IP from .env
axios.defaults.baseURL = `${process.env.REACT_APP_TELLDUS_URL}:4000/api/v1/`;
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
    if (process.env.REACT_APP_MODE === 'DEMO') { return { success: false, message: 'demo' }; }

    const response = await axios.get(getUrl(type, id, query));
    // console.log('Response', response);

    return response.data;
  } catch (err) {
    return { success: false, message: err.message };
  }
}
