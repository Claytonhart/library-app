import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import onEscOrClickOutside from './onEscOrClickOutside';

const Container = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  top: ${props => (props.top ? props.top : null)};
  bottom: ${props => (props.bottom ? props.bottom : null)};
  left: ${props => (props.left ? props.left : null)};
  right: ${props => (props.right ? props.right : null)};
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : '#fff'};

  position: absolute;
  border: 1px solid gainsboro;
  box-shadow: 0 2px 4px 0 gainsboro;
  padding: 5px 0;
  /* border-radius: 5px; */

  max-height: 300px;
  max-width: 300px;
  overflow: auto;
`;

const DropdownContainer = props => {
  const { children, callback, ...position } = props;

  useEffect(() => {
    const element = document.getElementById('dropdown-container');
    const cleanup = onEscOrClickOutside(callback, element);

    return () => {
      cleanup();
    };
  });

  return (
    <Container id='dropdown-container' {...position}>
      {children}
    </Container>
  );
};

export default DropdownContainer;
