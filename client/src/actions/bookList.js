import axios from 'axios';

import { GET_BOOK_LIST, CLEAR_BOOK_LIST } from './types';
import { setSearchVal } from './searchVal';

// will need options passed later for filtering searches.
export const getBookList = params => async dispatch => {
  const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
  if (!params.q) params.q = 'Harry Potter';
  // let res = await axios.get(`${baseUrl}${params}`);
  let res = await axios.get(baseUrl, { params });

  // dispatch(setSearchVal(searchVal));
  dispatch({
    type: GET_BOOK_LIST,
    payload: res.data
  });
};

export const clearBookList = () => {
  return {
    type: CLEAR_BOOK_LIST
  };
};
