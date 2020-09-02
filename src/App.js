import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Farm from 'pages/Farm';
import Crop from 'pages/Crop';
import Plant from 'pages/Plant';
import Home from 'pages/Home';
import ErrorNotFound from 'pages/ErrorNotFound';
import TimelineProvider from 'utils/providers/timeline';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/farm/:id" component={Farm} />
        <TimelineProvider>
          <Route exact path="/crops/:id" component={Crop} />
        </TimelineProvider>
        <Route exact path="/plant/:id" component={Plant} />
        <Route component={ErrorNotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
