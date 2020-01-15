import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { register } from '../../actions/auth';
import { Form, RegisterInput, RegisterButton, RegisterError } from './style';
import { setError, clearError } from '../../actions/error';

const RegisterForm = ({ setError, clearError, register, error }) => {
  useEffect(() => {
    clearError();
  }, [clearError]);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const { username, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (!password || !password2) {
      setError('Please input matching passwords');
    } else if (password !== password2) {
      setError('Passwords do not match');
    } else {
      register({ username: username.toLowerCase(), email, password });
    }
  };

  return (
    <Form onSubmit={e => onSubmit(e)}>
      {error.msg && <RegisterError>{error.msg}</RegisterError>}
      <RegisterInput
        type='text'
        placeholder='Username'
        name='username'
        value={username}
        onChange={e => onChange(e)}
      />

      <RegisterInput
        type='email'
        placeholder='Email Address'
        name='email'
        value={email}
        onChange={e => onChange(e)}
      />

      <RegisterInput
        type='password'
        placeholder='Password'
        name='password'
        value={password}
        onChange={e => onChange(e)}
      />

      <RegisterInput
        type='password'
        placeholder='Confirm Password'
        name='password2'
        value={password2}
        onChange={e => onChange(e)}
      />

      <RegisterButton type='submit' value='Register' />
    </Form>
  );
};

const mapStateToProps = state => ({
  error: state.error
});

export default connect(mapStateToProps, { setError, clearError, register })(
  RegisterForm
);
