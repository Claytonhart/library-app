import React from 'react';
import styled from 'styled-components/macro';
import BookSearch from './BookSearch';

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #fff;
`;

const Logo = styled.div`
  /*  */
`;

const AuthLinks = styled.div`
  /*  */
`;

const Navbar = () => {
  return (
    <Nav>
      <Logo>Book Search</Logo>
      <BookSearch />
      <AuthLinks>
        <a href='#!'>Sign in</a>
        <a href='#!'>Sign up</a>
      </AuthLinks>
    </Nav>
  );
};

export default Navbar;
