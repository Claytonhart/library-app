import axios from 'axios';
import api from 'utils/createApiInstance';
// import { setAlert } from './alert';
import { setError } from './error';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
  // CLEAR_PROFILE
} from './types';
// import setAuthToken from '../utils/setAuthToken';
// import { setAuthToken } from 'utils/createApiInstance';

// Load User
export const loadUser = () => async dispatch => {
  // if (localStorage.token) {
  //   setAuthToken(localStorage.token);
  // }

  try {
    if (localStorage.token) {
      const res = await api.get('/auth');

      if (res.data) {
        dispatch({
          type: USER_LOADED,
          payload: res.data
        });
      } else {
        dispatch({
          type: AUTH_ERROR
        });
      }
    } else {
      dispatch({
        type: AUTH_ERROR
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = ({ username, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ username, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setError(error.msg)));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setError(error.msg)));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  // dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
