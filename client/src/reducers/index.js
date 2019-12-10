import { combineReducers } from 'redux';
import bookList from './bookList';
import searchVal from './searchVal';
import auth from './auth';
import error from './error';

export default combineReducers({
  bookList,
  searchVal,
  auth,
  error
});
