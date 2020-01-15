import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.common['x-auth-token'] = token;
    } else {
      delete api.defaults.headers.common['x-auth-token'];
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;
