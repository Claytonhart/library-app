import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// import { setAuthToken } from 'utils/createApiInstance';
import { loadUser } from 'actions/auth';

const withAuthentication = Component => {
  // if (localStorage.token) {
  //   setAuthToken(localStorage.token);
  // }

  const WithAuthentication = props => {
    const { loadUser, ...rest } = props;

    useEffect(() => {
      loadUser();
    }, [loadUser]);

    return <Component {...rest} />;
  };

  return connect(null, { loadUser })(WithAuthentication);
};

export default withAuthentication;
