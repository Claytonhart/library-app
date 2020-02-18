import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import {
  addToMyBooklist,
  removeFromMyBooklist,
  getMyBooklists,
  clearMyBooklists
} from 'actions/myBooklist';
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
  justify-content: center;
  padding: 8px 16px;
`;

const AddToListDropdown = ({ bookinfo }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, data: myBooklist, error } = useSelector(
    state => state.myBooklist
  );

  useEffect(() => {
    dispatch(getMyBooklists(id));

    return () => dispatch(clearMyBooklists());
  }, [dispatch, id]);

  const toggleBookInBooklist = booklist => {
    const { id: booklistId, containsBook } = booklist;
    if (containsBook) {
      dispatch(removeFromMyBooklist(booklistId, id));
    } else {
      dispatch(addToMyBooklist(booklistId, bookinfo));
    }
  };

  return (
    <>
      {/* Later, need to check if length === 0, show create new list button */}
      {/* Also need to clear out *potentially* all state when a user logs out */}
      {myBooklist &&
        myBooklist.map(booklist => (
          <BookList
            onClick={() => toggleBookInBooklist(booklist)}
            key={booklist.id}
          >
            <span>{booklist.book_list_name}</span>
            <Checkbox checked={booklist.containsBook} />
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
