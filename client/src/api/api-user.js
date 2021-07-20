import Cookies from 'js-cookie';

function user(endpoint, { body, ...customConfig } = {}, isFile = false) {
  const accessToken = Cookies.get('accessToken');
  const headers = !isFile ? { 'Content-Type': 'application/json' } : {};
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
  if (body) {
    config.body = isFile ? body : JSON.stringify(body);
  }
  let URL = endpoint;
  if (URL[0] !== '/') {
    URL = '/'.concat(endpoint);
  }

  return fetch(`/api/v1${URL}`, config)
    .then(async (response) => {
      let data;
      if (response.statusText === 'No Content') {
        data = await response.text();
      } else {
        data = await response.json();
      }
      if (response.ok) {
        return data;
      }
      return Promise.reject(data);
    });
}

// eslint-disable-next-line import/prefer-default-export
export default user;
