import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

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
  let [booklist, setBooklist] = useState(null);
  let [totalItems, setTotalItems] = useState(0);
  let history = useHistory();
  let search = useLocation().search;

  useEffect(() => {
    const parsed = queryString.parse(search);

    // redirect to root if no query is passed for some reason,
    // google api doesn't allow searches with no params
    if (!parsed.q) {
      history.push('/');
    }

    (async () => {
      const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
      if (!parsed.q) parsed.q = 'Harry Potter';
      let res = await axios.get(baseUrl, { params: parsed });
      let { data } = res;
      setBooklist(data.items);
      setTotalItems(data.totalItems);
      setQueryState(parsed);
    })();
  }, [search, history]);

  // make sure we don't try to set a startIndex past our total items
  const getNextBookList = () => {
    let newStartIndex = Number(queryState.startIndex || 0) + 10;
    if (newStartIndex >= totalItems) return;
    let qs = { ...queryState, startIndex: newStartIndex };
    qs = queryString.stringify(qs);
    history.push(`/search?${qs}`);
  };

  // make sure we don't try to set a startIndex less than 0
  const getPrevBookList = () => {
    let newStartIndex = Number(queryState.startIndex || 0) - 10;
    if (newStartIndex < 0) return;
    let qs = { ...queryState, startIndex: newStartIndex };
    qs = queryString.stringify(qs);
    history.push(`/search?${qs}`);
  };

  return (
    <Container>
      <TitleComponent title={queryState.q} />
      {booklist && (
        <>
          <Header>{queryState.q}</Header>
          <CurrentPage>
            Current page:{' '}
            {Math.floor(Number(queryState.startIndex || 0) / 10) + 1}
          </CurrentPage>
          <TotalPages>Total Pages: {Math.ceil(totalItems / 10)}</TotalPages>
          <TotalResults>Total results: {totalItems}</TotalResults>
          <BookList bookData={booklist} />
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
