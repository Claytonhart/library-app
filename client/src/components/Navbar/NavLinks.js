import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { logout } from 'actions/auth';

const AuthLinks = styled.div``;

const AuthLink = styled.button`
  margin: 10px;
  font-size: 16px;
  color: ${props => props.theme.primary.lightblue};
  transition: all 0.2s;

  &:hover {
    text-decoration: none;
    color: ${props => props.theme.primary.darkblue};
  }
`;

const SignOutButton = styled(AuthLink)`
  /*  */
`;

const NavLinks = ({ isAuthenticated, logout }) => {
  return (
    <AuthLinks>
      {isAuthenticated ? (
        <>
          <AuthLink as={Link} to='/booklists'>
            My Books
          </AuthLink>
          <SignOutButton onClick={logout}>Sign Out</SignOutButton>
        </>
      ) : (
        <>
          <AuthLink as={Link} to='/login'>
            Sign in
          </AuthLink>
          <AuthLink as={Link} to='/register'>
            Register
          </AuthLink>
        </>
      )}
    </AuthLinks>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(NavLinks);
