import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';

import { getBookList } from 'actions/bookList';
import { setSearchVal } from 'actions/searchVal';

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

const BookSearch = ({ getBookList, setSearchVal }) => {
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();

  const formSubmit = async e => {
    e.preventDefault();
    setSearchVal(searchValue, history);
    // getBookList(searchValue);
    setSearchValue('');
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

export default connect(null, { getBookList, setSearchVal })(BookSearch);
