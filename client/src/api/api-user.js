function user(endpoint, { body, ...customConfig } = {}, isFile = false) {
  const headers = !isFile ? { 'Content-Type': 'application/json' } : {};
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig,
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
      const data = await response.json();
      if (response.ok) {
        return data;
      }
      return Promise.reject(data);
    });
}

// eslint-disable-next-line import/prefer-default-export
export default user;
