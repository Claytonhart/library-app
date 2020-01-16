import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

import { setSearchVal } from 'actions/searchVal';

const SearchAuthorNameButton = styled.button`
  color: inherit;
  font-size: 18px;
`;

const AuthorName = ({ author, addComma, setSearchVal }) => {
  const history = useHistory();
  const searchString = `inauthor:"${author}"`;

  return (
    <>
      <SearchAuthorNameButton
        onClick={() => setSearchVal(searchString, history)}
      >
        {author}
      </SearchAuthorNameButton>
      {addComma && <span>,&nbsp;&nbsp;</span>}
    </>
  );
};

export default connect(null, { setSearchVal })(AuthorName);
