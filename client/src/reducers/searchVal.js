import { SET_SEARCH_VAL } from '../actions/types';

const initialState = null;

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_SEARCH_VAL:
      return payload;
    default:
      return state;
  }
}
