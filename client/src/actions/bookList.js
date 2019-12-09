import axios from 'axios';

import { GET_BOOK_LIST } from './types';

// will need options passed later for filtering searches.
export const getBookList = (searchVal = 'Harry Potter') => async dispatch => {
  const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
  let res = await axios.get(`${baseUrl}${searchVal}`);

  dispatch({
    type: GET_BOOK_LIST,
    payload: res.data
  });
};
