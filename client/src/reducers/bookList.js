import { GET_BOOK_LIST, CLEAR_BOOK_LIST } from '../actions/types';

const initialState = null;

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BOOK_LIST:
      return payload;
    case CLEAR_BOOK_LIST:
      return null;
    default:
      return state;
  }
}
