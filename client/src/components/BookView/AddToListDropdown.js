import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import {
  addToMyBooklist,
  getMyBooklists,
  clearMyBooklists
} from 'actions/myBookList';
import Spinner from 'components/Spinner';
import Checkbox from './Checkbox';

const BookList = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
  color: ${props => props.theme.primary.lightblue};
  cursor: pointer;
  transition: all 0.2s ease-in;
  position: relative;

  &:hover {
    background-color: gainsboro;
    color: ${props => props.theme.primary.darkblue};
  }
`;

const Loading = styled(BookList)`
  text-align: center;
  padding: 8px 16px;
`;

const AddToListDropdown = ({ bookinfo }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, data, error } = useSelector(state => state.myBooklist);

  useEffect(() => {
    dispatch(getMyBooklists(id));

    return () => dispatch(clearMyBooklists());
  }, [dispatch, id]);

  const addBook = bookListId => {
    dispatch(addToMyBooklist(bookListId, bookinfo));
  };

  return (
    <>
      {/* Later, need to check if length === 0, show create new list button */}
      {/* Also need to clear out *potentially* all state when a user logs out */}
      {data &&
        data.map(bookList => (
          <BookList onClick={() => addBook(bookList.id)} key={bookList.id}>
            <span>{bookList.book_list_name}</span>
            <Checkbox checked={bookList.containsBook} />
          </BookList>
        ))}
      {error && <BookList>Something went wrong, please try reloading</BookList>}
      {isLoading && (
        <Loading>
          <Spinner />
        </Loading>
      )}
    </>
  );
};

export default AddToListDropdown;