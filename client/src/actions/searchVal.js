import { SET_SEARCH_VAL } from './types';

export const setSearchVal = searchVal => {
  return {
    type: SET_SEARCH_VAL,
    payload: searchVal
  };
};
