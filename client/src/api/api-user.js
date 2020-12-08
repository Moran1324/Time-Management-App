function user(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  let URL = endpoint;
  if (endpoint[0] !== '/') {
    URL = '/'.concat(endpoint);
  }

  return fetch(`/api${URL}`, config)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      }
      return Promise.reject(data);
    });
}

// eslint-disable-next-line import/prefer-default-export
export { user };
