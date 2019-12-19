import React from 'react';
import styled from 'styled-components/macro';

const Desc = styled.div`
  font-size: 16px;
  line-height: 1.4;
  margin-bottom: 10px;
`;

// parse out html tags, and render only the text
// possibly dangerous rendering an element
const Description = ({ description }) => {
  let body = description;
  let temp = document.createElement('div');
  temp.innerHTML = body;
  let sanitized = temp.textContent || temp.innerText;

  return <Desc>{sanitized}</Desc>;
};

export default Description;
