import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';

import { getBookList, clearBookList } from 'actions/bookList';
import BookList from './BookList';
import TitleComponent from '../TitleComponent';
import {
  Container,
  Header,
  CurrentPage,
  TotalPages,
  TotalResults,
  PaginationLinks,
  Prev,
  Next
} from './style';

const BookSearchResults = () => {
  let [queryState, setQueryState] = useState({});
  let history = useHistory();
  let search = useLocation().search;

  const dispatch = useDispatch();
  const bookList = useSelector(state => state.bookList);

  useEffect(() => {
    const parsed = queryString.parse(search, {
      sort: false
    });

    // redirect to root if no query is passed for some reason
    if (!parsed.q) {
      history.push('/');
    }

    dispatch(getBookList(parsed));
    setQueryState(parsed);

    return () => dispatch(clearBookList());
  }, [search, history, dispatch]);

  // make sure we don't try to set a startIndex past our total items
  const getNextBookList = () => {
    let newStartIndex = Number(queryState.startIndex || 0) + 10;
    if (newStartIndex >= bookList.totalItems) return;
    let qs = { ...queryState, startIndex: newStartIndex };
    qs = queryString.stringify(qs, { sort: false });
    history.push(`/search?${qs}`);
  };

  // make sure we don't try to set a startIndex less than 0
  const getPrevBookList = () => {
    let newStartIndex = Number(queryState.startIndex || 0) - 10;
    if (newStartIndex < 0) return;
    let qs = { ...queryState, startIndex: newStartIndex };
    qs = queryString.stringify(qs, { sort: false });
    history.push(`/search?${qs}`);
  };

  return (
    <Container>
      <TitleComponent title={queryState.q} />
      {bookList && (
        <>
          <Header>{queryState.q}</Header>
          <CurrentPage>
            Current page:{' '}
            {Math.floor(Number(queryState.startIndex || 0) / 10) + 1}
          </CurrentPage>
          <TotalPages>
            Total Pages: {Math.ceil(bookList.totalItems / 10)}
          </TotalPages>
          <TotalResults>Total results: {bookList.totalItems}</TotalResults>
          <BookList bookData={bookList} />
          <PaginationLinks>
            <Prev onClick={getPrevBookList}>Previous</Prev>
            <Next onClick={getNextBookList}>Next</Next>
          </PaginationLinks>
        </>
      )}
    </Container>
  );
};

export default BookSearchResults;
