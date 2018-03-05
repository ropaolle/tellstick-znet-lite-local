import request from 'request-promise';

const telldusCommand = async function telldusCommand(qs, alert) {
  if (typeof alert === 'function') alert(''); // Clear alert

  const id = qs.id ? `/${qs.id}` : '';

  const options = {
    uri: `http://192.168.10.146:4000/v1/${qs.type}${id}`,
    qs,
    json: true,
    timeout: 1000,
  };

  const res = await request(options)
    .then(response => response)
    .catch(err => ({ success: false, message: err.message }));

  if (!res.success && typeof alert === 'function') alert(res.message);

  return res;
};

// export function updateDeviceInfo(id, update) {
//   setTimeout(() => {
//     telldusCommand({ type: 'devices', command: 'info', id: Number(id) })
//       .then(response => update(response.message))
//       .catch();
//   }, 1000);
// }

export default telldusCommand;
