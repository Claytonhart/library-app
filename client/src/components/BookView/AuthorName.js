import React from 'react';
import styled from 'styled-components/macro';

const Name = styled.a`
  display: inline-block;
  color: inherit;
  font-size: 18px;
`;

const AuthorName = ({ author, addComma }) => {
  const baseUrl = `https://www.google.com/search?tbm=bks&tbm=bks&q=inauthor:"${author}"`;

  return (
    <>
      <Name href={baseUrl} target='_blank' rel='noopener noreferrer'>
        {author}
      </Name>
      {addComma && <span>,&nbsp;&nbsp;</span>}
    </>
  );
};

export default AuthorName;
