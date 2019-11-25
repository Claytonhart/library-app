import React from 'react';

const Description = ({ description }) => {
  let body = description;
  debugger;
  let temp = document.createElement('div');
  debugger;
  temp.innerHTML = body;
  debugger;
  let sanitized = temp.textContent || temp.innerText;
  debugger;

  return <div>{sanitized}</div>;
};

export default Description;
