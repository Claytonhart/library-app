import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import withAuthentication from 'components/Session/withAuthentication';
import BookSearchResults from 'components/BookSearchResults';
import BookView from 'components/BookView';
import Navbar from 'components/Navbar';
import TitleComponent from 'components/TitleComponent';
import Login from 'views/Login';
import Register from 'views/Register';

function App() {
  return (
    <Router>
      <TitleComponent />
      <Navbar />
      <div style={{ marginTop: 58 }}>
        <Route exact path='/' component={BookSearchResults} />
        <Route path='/books/:id' component={BookView} />
        <Route path='/search' component={BookSearchResults} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </div>
    </Router>
  );
}

export default withAuthentication(App);
