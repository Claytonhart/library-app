import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import {
  addToMyBooklist,
  getMyBooklists,
  clearMyBooklists
} from 'actions/myBookList';
import Spinner from 'components/Spinner';

const BookList = styled.div`
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

const AddToListDropdown = ({ bookId }) => {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector(state => state.myBooklist);

  useEffect(() => {
    dispatch(getMyBooklists());

    return () => dispatch(clearMyBooklists());
  }, [dispatch]);

  const addBook = () => {
    dispatch(addToMyBooklist('1', bookId));
    // dispatch(addToMyBooklist(bookListId, bookId));
  };

  return (
    <>
      {/* Later, need to check if length === 0, show create new list button */}
      {/* Also need to clear out *potentially* all state when a user logs out */}
      {data &&
        data.map(book => (
          <BookList key={book.id}>{book.book_list_name}</BookList>
        ))}
      {error && <BookList>Couldn't find any of your booklists</BookList>}
      {isLoading && (
        <Loading>
          <Spinner />
        </Loading>
      )}
    </>
  );
};

export default AddToListDropdown;
