import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Plot from './pages/Plot';
import Board from './pages/Board';
import Plant from './pages/Plant';
import ErrorNotFound from './pages/ErrorNotFound';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/plot/:id" component={Plot} />
        <Route exact path="/board/:id" component={Board} />
        <Route exact path="/plant/:id" component={Plant} />
        <Route component={ErrorNotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
