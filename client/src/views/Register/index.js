import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import RegisterForm from '../../components/RegisterForm';
import { Container, RegisterLogo } from './style';

const Register = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/booklists' />;
  }

  return (
    <Container>
      <RegisterLogo>Library</RegisterLogo>
      <p>Create Your Account</p>
      <RegisterForm />
      <p>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Container>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Register);
