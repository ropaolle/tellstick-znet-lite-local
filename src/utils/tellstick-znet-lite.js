import axios from 'axios';
import qs from 'qs';

// Load IP from .env
axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}:4000/api/v1/`;
axios.defaults.timeout = 1000;

export default async function telldusCommand(type, query) {
  try {
    if (process.env.REACT_APP_MODE === 'DEMO') { return { success: false, error: 'demo' }; }

    const queryString = qs.stringify(query);
    const path = (queryString) ? `${type}?${queryString}` : type;

    const response = await axios.get(path);
    // console.log('Response', response, path);

    return response.data;
  } catch (err) {
    return { success: false, error: err.message };
  }
}
