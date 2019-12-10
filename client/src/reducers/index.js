import { combineReducers } from 'redux';
import bookList from './bookList';
import searchVal from './searchVal';

export default combineReducers({
  bookList,
  searchVal
});
