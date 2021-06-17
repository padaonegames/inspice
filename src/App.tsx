import React, { Suspense } from 'react';
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
import BrowseDefinitionsScreen from './screens/BrowseDefinitionsScreen';

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
          <Route path='/browse'>
            <BrowseDefinitionsScreen />            
          </Route>
          <Route>
            <Redirect to='/browse' />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;