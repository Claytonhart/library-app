import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import BookSearch from 'components/BookSearch';
import BookView from 'components/BookView';

function App() {
  return (
    <Router>
      <div className='App'>
        <Route exact path='/' component={BookSearch} />
        <Route exact path='/books' component={BookSearch} />
        <Route path='/books/:id' component={BookView} />
      </div>
    </Router>
  );
}

export default App;
