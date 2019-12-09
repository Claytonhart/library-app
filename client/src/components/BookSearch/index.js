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

const PaginationLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: stretch;
`;

const Prev = styled.button`
  background: ${props => props.theme.primary.lightblue};
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
`;
const Next = styled.button`
  background: ${props => props.theme.primary.lightblue};
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
`;

const BookSearch = ({ bookList, getBookList }) => {
  useEffect(() => {
    getBookList();
  }, [getBookList]);

  const getNextBookList = () => {
    getBookList('Not harry potter');
  };

  return (
    <Container>
      <Header>Top Books</Header>
      {bookList && <BookList bookData={bookList} />}
      <PaginationLinks>
        <Prev onClick={getNextBookList}>Previous</Prev>
        <Next onClick={getNextBookList}>Next</Next>
      </PaginationLinks>
    </Container>
  );
};

const mapStateToProps = state => ({
  bookList: state.bookList
});

export default connect(mapStateToProps, { getBookList })(BookSearch);
