import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components/macro';
import BookItem from './BookItem';
import BookList from './BookList';

const Container = styled.div`
  margin: 0 auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
`;

const Header = styled.h2`
  font-size: 30px;
`;

const BookSearchForm = styled.form`
  /*  */
`;

const BookInput = styled.input`
  padding: 12px;
`;

const BookSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    const baseUrl =
      'https://www.googleapis.com/books/v1/volumes?q=harry potter';
    axios.get(`${baseUrl}${searchValue}`).then(res => setBookData(res.data));
  }, []);

  const formSubmit = async e => {
    e.preventDefault();

    const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
    let res = await axios.get(`${baseUrl}${searchValue}`);

    setBookData(res.data);
  };

  return (
    <Container>
      <Header>Top Books</Header>
      <BookSearchForm onSubmit={formSubmit}>
        <BookInput
          type='text'
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
      </BookSearchForm>
      {bookData && <BookList bookData={bookData} />}
      {/* {bookData && (
        <BookData>
          {bookData.items.map((book, i) => {
            return <BookItem key={i + book.id} book={book} />;
          })}
        </BookData>
      )} */}
    </Container>
  );
};

export default BookSearch;
