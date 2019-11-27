import React from 'react';

const Description = ({ description }) => {
  let body = description;
  let temp = document.createElement('div');
  temp.innerHTML = body;
  let sanitized = temp.textContent || temp.innerText;

  return <div>{sanitized}</div>;
};

export default Description;
