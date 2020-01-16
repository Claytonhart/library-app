import { SET_SEARCH_VAL } from './types';
import { clearBookList } from './bookList';

// export const setSearchVal = searchVal => {
//   return {
//     type: SET_SEARCH_VAL,
//     payload: searchVal
//   };
// };

export const setSearchVal = (searchVal, history) => dispatch => {
  dispatch({
    type: SET_SEARCH_VAL,
    payload: searchVal
  });

  dispatch(clearBookList());

  history.push('/books');
};
