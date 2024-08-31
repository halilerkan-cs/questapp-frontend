const MethodWithAuth = (accessToken, method, url, body) => {
  if (method === 'GET') {
    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    });
  } else {
    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify(body),
    });
  }
};

const MethodWithoutAuth = (method, url, body) => {
  if (method === 'GET') {
    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }
};

export const RefreshToken = (userId, refreshToken) => {
  return fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: userId,
      refreshToken: refreshToken,
    }),
  });
};

export const GetWithAuth = (accessToken, url) => {
  return MethodWithAuth(accessToken, 'GET', url);
};

export const PostWithAuth = (accessToken, url, body) => {
  return MethodWithAuth(accessToken, 'POST', url, body);
};

export const PutWithAuth = (accessToken, url, body) => {
  return MethodWithAuth(accessToken, 'PUT', url, body);
};

export const DeleteWithAuth = (accessToken, url, body) => {
  return MethodWithAuth(accessToken, 'DELETE', url, body);
};

export const Get = (url) => {
  return MethodWithoutAuth('GET', url);
};

export const Post = (url, body) => {
  return MethodWithoutAuth('POST', url, body);
};

export const Put = (url, body) => {
  return MethodWithoutAuth('PUT', url, body);
};

export const Delete = (url, body) => {
  return MethodWithoutAuth('DELETE', url, body);
};
