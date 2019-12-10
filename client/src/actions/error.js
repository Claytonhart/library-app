import uuid from 'uuid';
import { SET_ERROR } from './types';

export const setError = msg => {
  const id = uuid.v4();
  return {
    type: SET_ERROR,
    payload: {
      msg,
      id
    }
  };
};
