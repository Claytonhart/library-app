import { SET_ERROR, CLEAR_ERROR } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ERROR: {
      const { msg, id } = payload;

      return {
        ...state,
        msg,
        id
      };
    }
    case CLEAR_ERROR: {
      return {};
    }
    default: {
      return state;
    }
  }
}
