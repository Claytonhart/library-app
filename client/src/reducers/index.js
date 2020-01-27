import { combineReducers } from 'redux';
import auth from './auth';
import error from './error';
import myBooklist from './myBooklist';

import {
  LOGOUT,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGIN_FAIL,
  ACCOUNT_DELETED
} from 'actions/types';

const appReducer = combineReducers({
  auth,
  error,
  myBooklist
});

// clear entire application state on logout
export default (state, action) => {
  switch (action.type) {
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      state = undefined;
      break;
    default:
  }

  return appReducer(state, action);
};
