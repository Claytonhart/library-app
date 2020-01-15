import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { Container, LoginLogo } from './style';
import LoginForm from 'components/LoginForm';

const Login = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/booklists' />;
  }

  return (
    <Container>
      <LoginLogo>Library</LoginLogo>
      <p>Sign Into Your Account</p>
      <LoginForm />
      <p>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Container>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Login);
