import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Farm from 'pages/Farm';
import Crop from 'pages/Crop';
import Plant from 'pages/Plant';
import Home from 'pages/Home';
import ErrorNotFound from 'pages/ErrorNotFound';
import TimelineProvider from 'utils/providers/timeline';
import PlantProvider from 'utils/providers/plant';

const App = () => (
  <Router>
    <TimelineProvider>
      <PlantProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/farm/:id" component={Farm} />
          <Route exact path="/crop/:id" component={Crop} />
          <Route exact path="/plant/:id" component={Plant} />
          <Route component={ErrorNotFound} />
        </Switch>
      </PlantProvider>
    </TimelineProvider>
  </Router>
);

export default App;
