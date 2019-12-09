import { GET_BOOK_LIST } from '../actions/types';

const initialState = null;

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BOOK_LIST:
      return payload;
    default:
      return state;
  }
}
