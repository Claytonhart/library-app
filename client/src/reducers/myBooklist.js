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
} from '../actions/types';

const initialState = {
  isLoading: false,
  data: null,
  error: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MY_BOOKLIST_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case GET_MY_BOOKLIST_SUCCESS: {
      return {
        ...state,
        data: payload,
        isLoading: false,
        error: null
      };
    }
    case GET_MY_BOOKLIST_FAIL: {
      return {
        ...state,
        data: null,
        isLoading: false,
        error: payload
      };
    }
    case CLEAR_MY_BOOKLIST: {
      return initialState;
    }
    case REMOVE_FROM_MY_BOOKLIST:
    case ADD_TO_MY_BOOKLIST: {
      const booklistId = Number(payload);

      let bookIndex = state.data.findIndex(
        booklist => booklist.id === booklistId
      );
      let newData = toggleContainsBook(state.data, bookIndex);

      return {
        ...state,
        data: newData
      };
    }
    default:
      return state;
  }
}

// redux docs -> https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/
function toggleContainsBook(array, bookIndex) {
  return array.map((item, index) => {
    if (index !== bookIndex) {
      // This isn't the item we care about - keep it as-is
      return item;
    }
    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      containsBook: !item.containsBook
    };
  });
}
