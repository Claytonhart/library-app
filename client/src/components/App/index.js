import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import withAuthentication from 'components/Session/withAuthentication';
import BookSearch from 'components/BookSearch';
import BookView from 'components/BookView';
import Navbar from 'components/Navbar';
import Login from 'views/Login';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <div style={{ marginTop: 58 }}>
          <Route exact path='/' component={BookSearch} />
          <Route exact path='/books' component={BookSearch} />
          <Route path='/books/:id' component={BookView} />
          <Route path='/login' component={Login} />
        </div>
      </>
    </Router>
  );
}

export default withAuthentication(App);
