import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import BookSearch from './BookSearch';
import NavLinks from './NavLinks';

const Nav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid gainsboro;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: #fff;
`;

const Logo = styled(Link)`
  font-size: 20px;
  color: ${props => props.theme.primary.lightblue};
  transition: all 0.2s;

  &:hover {
    text-decoration: none;
    color: ${props => props.theme.primary.darkblue};
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Logo to='/'>Book Search</Logo>
      <BookSearch />
      <NavLinks />
    </Nav>
  );
};

export default Navbar;
