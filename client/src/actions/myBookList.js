import api from 'utils/createApiInstance';

import {
  ADD_TO_MY_BOOKLIST,
  REMOVE_FROM_MY_BOOKLIST,
  DELETE_MY_BOOKLIST,
  CREATE_NEW_MY_BOOKLIST_FAIL,
  CREATE_NEW_MY_BOOKLIST_SUCCESS,
  GET_MY_BOOKLIST_REQUEST,
  GET_MY_BOOKLIST_SUCCESS,
  GET_MY_BOOKLIST_FAIL,
  CLEAR_MY_BOOKLIST
} from './types';

export const createNewMyBooklist = name => async dispatch => {
  // could have a loading type if this gets slow.
  // hit backend, create new myBooklist, return its id
  try {
    let myBooklistId = await api.post('/mybooklist', { name });

    if (!myBooklistId) {
      dispatch({
        type: CREATE_NEW_MY_BOOKLIST_FAIL,
        payload: 'Something went wrong, please try again later!'
      });
    } else {
      dispatch({
        type: CREATE_NEW_MY_BOOKLIST_SUCCESS,
        payload: myBooklistId
      });
    }
  } catch (err) {
    dispatch({
      type: CREATE_NEW_MY_BOOKLIST_FAIL,
      payload: err
    });
  }
};

export const getMyBooklists = id => async dispatch => {
  try {
    dispatch({
      type: GET_MY_BOOKLIST_REQUEST
    });

    let res = await api.get(`/mybooklist/contains/${id}`);
    // let res = await api.get('/mybooklist');
    let myBooklists = res.data;

    dispatch({
      type: GET_MY_BOOKLIST_SUCCESS,
      payload: myBooklists
    });
  } catch (err) {
    dispatch({
      type: GET_MY_BOOKLIST_FAIL,
      payload: err.message
    });
  }
};

export const removeFromMyBooklist = (booklistId, bookId) => async dispatch => {
  let confirmation = await api.delete(`/mybooklist/${booklistId}/${bookId}`);
  return {
    type: REMOVE_FROM_MY_BOOKLIST
  };
};

export const addToMyBooklist = (booklistId, info) => async dispatch => {
  let res = await api.post(`/mybooklist/${booklistId}`, info);
  let booklistData = res.data;
  console.log(booklistData);
  dispatch({
    type: ADD_TO_MY_BOOKLIST,
    payload: booklistData
  });
};

export const deleteMyBooklist = booklistId => async dispatch => {
  let confirmation = await api.delete(`/mybooklist/${booklistId}`);
  return {
    type: DELETE_MY_BOOKLIST
  };
};

export const clearMyBooklists = () => {
  return {
    type: CLEAR_MY_BOOKLIST
  };
};
