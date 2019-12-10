import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import BookSearch from './BookSearch';

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
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

const AuthLinks = styled.div`
  /*  */
`;

const AuthLink = styled(Link)`
  margin: 10px;
  font-size: 16px;
`;

const Navbar = () => {
  return (
    <Nav>
      <Logo to='/'>Book Search</Logo>
      <BookSearch />
      <AuthLinks>
        <AuthLink to='/signin'>Sign in</AuthLink>
        <AuthLink to='/signup'>Sign up</AuthLink>
      </AuthLinks>
    </Nav>
  );
};

export default Navbar;
