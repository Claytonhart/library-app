import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

export const setAuthToken = token => {
  debugger;
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete api.defaults.headers.common['x-auth-token'];
  }
};

export default api;
