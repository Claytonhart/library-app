import React from 'react';
import styled, { keyframes } from 'styled-components/macro';

const loadin = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
`;

const Box = styled.div`
  position: relative;
  border: 2px solid ${props => (props.checked ? 'lightblue' : 'black')};
  background-color: ${props => (props.checked ? 'lightblue' : 'white')};
  width: 20px;
  height: 20px;
  border-radius: 2px;
`;

const Mark = styled.div`
  animation: ${loadin} 0.2s ease-in;
  animation-fill-mode: forwards;
  position: absolute;
  width: 37%;
  height: 69%;
  border-style: solid;
  border-top: none;
  border-left: none;
  border-right-width: 2.65px;
  border-bottom-width: 2.65px;
  border-color: black;
  transform-origin: 90% 83%;
  transform: rotate(45deg);
  box-sizing: content-box;
`;

const Checkbox = ({ checked }) => {
  return <Box checked={checked}>{checked && <Mark />}</Box>;
};

export default Checkbox;
