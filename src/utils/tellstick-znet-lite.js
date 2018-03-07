import Wreck from 'wreck';
import queryString from 'query-string';

function queryToPath(query) {
  const { type, id, ...qsObj } = query;
  if (!type) return '';

  let url = `/${type}`;
  if (id) {
    url += `/${id}`;
  }
  const qs = queryString.stringify(qsObj);
  if (qs) {
    url += `?${qs}`;
  }

  return url;
}

const telldusCommand = async function telldusCommand(query) {
  const options = {
    timeout: 1000,
    baseUrl: 'http://localhost:4000/api/v1',
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods': 'GET',
    // },
  };
  const url = queryToPath(query);
  const promise = Wreck.request('GET', url, options);

  try {
    const res = await promise;
    const body = await Wreck.read(res, { json: true });

    // If body.favorites
    // const favorites = '1,2,6,7'.split(',');
    // body.message.device = body.message.device.map(val => ({
    //   ...val,
    //   favorite: favorites.indexOf(val.id.toString()) !== -1,
    // }));
    // console.log('Body', body);

    return body;
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export default telldusCommand;
