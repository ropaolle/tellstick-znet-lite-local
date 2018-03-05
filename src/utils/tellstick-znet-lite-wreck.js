import Wreck from 'wreck';
import queryString from 'query-string';

const options = {
  timeout: 1000,
  baseUrl: 'http://192.168.10.146:4000/v1/',
};

function queryToPath(query) {
  const { type, id, ...qs } = query;
  console.log('XXX', type, id, qs);
}

const telldusCommand = async function telldusCommand(query, alert) {
  queryToPath(query);
  const qs = { ...query };
  let url = qs.type;
  if (qs.id) { url += `/${qs.id}`; }
  delete qs.type;
  delete qs.id;
  url += `?${queryString.stringify(qs)}`;

  console.log(url, qs);
  console.log(queryString.stringify(qs));

  const promise = Wreck.request('GET', url, options);

  try {
    const res = await promise;
    const body = await Wreck.read(res, { json: true });

    console.log('Body', body);

    return body;
  } catch (err) {
    if (typeof alert === 'function') alert(err.message);
    return { success: false, message: err.message };
  }
};

export default telldusCommand;
