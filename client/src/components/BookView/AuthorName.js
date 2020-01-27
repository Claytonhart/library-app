import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

const SearchAuthorNameButton = styled.button`
  color: inherit;
  font-size: 18px;
`;

const AuthorName = ({ author, addComma }) => {
  const history = useHistory();
  const searchString = `inauthor:"${author}"`;

  const navigateToSearch = () => {
    history.push(`/search?q=${searchString}`);
  };

  return (
    <>
      <SearchAuthorNameButton onClick={navigateToSearch}>
        {author}
      </SearchAuthorNameButton>
      {addComma && <span>,&nbsp;&nbsp;</span>}
    </>
  );
};

export default AuthorName;
