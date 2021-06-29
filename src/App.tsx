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
import ExploreActivityScreen from './screens/ExploreActivityScreen';

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
          <Route path='/consumer/explore/:id'>
            <ExploreActivityScreen />
          </Route>
          <Route path='/curator/create'>
            <CreateFindArtworkActivityScreen />
          </Route>
          <Route path='/browse'>
            <BrowseDefinitionsScreen />            
          </Route>
          <Route>
            <Redirect to='/consumer/explore/60db0c3c7b4a14179552cb1c' />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;