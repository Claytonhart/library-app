import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';

import { getBookList } from 'actions/bookList';

const Search = styled.div`
  /*  */
`;

const BookSearchForm = styled.form`
  width: 500px;
  display: flex;
  justify-content: center;
`;

const BookInput = styled.input`
  padding: 12px;
  border-radius: 5px;
  border: 1px solid gainsboro;
  width: 100%;
`;

const BookSearch = ({ getBookList }) => {
  const [searchValue, setSearchValue] = useState('');

  const formSubmit = async e => {
    e.preventDefault();
    getBookList(searchValue);
  };

  return (
    <Search>
      <BookSearchForm onSubmit={formSubmit}>
        <BookInput
          type='text'
          value={searchValue}
          placeholder='search for a book'
          onChange={e => setSearchValue(e.target.value)}
        />
      </BookSearchForm>
    </Search>
  );
};

export default connect(null, { getBookList })(BookSearch);
