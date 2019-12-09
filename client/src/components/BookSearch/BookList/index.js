import React from 'react';
import BookItem from '../BookItem';
import styled from 'styled-components/macro';
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
`;

const BookList = ({ bookData }) => {
  return (
    <ListContainer>
      {bookData.items.map((book, i) => {
        return <BookItem key={i + book.id} book={book} />;
      })}
    </ListContainer>
  );
};

export default BookList;
