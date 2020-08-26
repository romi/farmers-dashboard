import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Farm from './pages/Farm';
import Zone from './pages/Zone';
import Plant from './pages/Plant';
import Home from './pages/Home';
import ErrorNotFound from './pages/ErrorNotFound';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/farm/:id" component={Farm} />
        <Route exact path="/zone/:id" component={Zone} />
        <Route exact path="/plant/:id" component={Plant} />
        <Route component={ErrorNotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
