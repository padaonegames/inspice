import React, { useState, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import PlayTreasureHuntScreen from './screens/PlayTreasureHuntScreen';
import CreateTreasureHuntScreen from './screens/CreateTreasureHuntScreen';
import Header from './components/Header';
import { GlobalStyles } from './global/global';
import CreateFindArtworkActivityScreen from './screens/CreateFindArtworkActivityScreen';

const App: React.FC = () => {

  return (
    <Suspense fallback='loading'>
      <Router>
        <GlobalStyles />
        <Header />
        <Switch>
          <Route path='/consumer/play/:id'>
            <PlayTreasureHuntScreen />
          </Route>
          <Route path='/consumer/create/:id'>
            <CreateTreasureHuntScreen />
          </Route>
          <Route path='/curator/create'>
            <CreateFindArtworkActivityScreen />
          </Route>
          <Route>
            <Redirect to='/consumer/create/60c9c74db64f2b6cb70bb206' />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;