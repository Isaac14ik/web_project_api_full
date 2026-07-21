export const BASE_URL = import.meta.env.MODE === 'production'
  ? 'http://34.30.121.2:3000'
  : 'http://localhost:3000';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.text().then((text) => {
    return Promise.reject(`Error: ${res.status} - ${text}`);
  });
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(checkResponse);
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(checkResponse);
};
