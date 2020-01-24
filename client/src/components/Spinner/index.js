import React from 'react';
import styled, { keyframes } from 'styled-components/macro';

const spin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;

const Spin = styled.div`
  display: inline-block;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7983ff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1.2s linear infinite;
`;

const Spinner = () => {
  return <Spin></Spin>;
};

export default Spinner;
