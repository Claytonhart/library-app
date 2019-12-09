import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';

import { getBookList } from 'actions/bookList';
import BookList from './BookList';

const Container = styled.div`
  margin: 0 auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h2`
  font-size: 30px;
`;

const BookSearch = ({ bookList, getBookList }) => {
  useEffect(() => {
    getBookList();
  }, [getBookList]);

  return (
    <Container>
      <Header>Top Books</Header>
      {bookList && <BookList bookData={bookList} />}
    </Container>
  );
};

const mapStateToProps = state => ({
  bookList: state.bookList
});

export default connect(mapStateToProps, { getBookList })(BookSearch);
