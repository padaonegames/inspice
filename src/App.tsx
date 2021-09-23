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
import ViewpointsScreen from './screens/ViewpointsScreen';

const App: React.FC = () => {

  return (
    <Suspense fallback='loading'>
      <Router>
        <GlobalStyles />
        <Switch>
          <Route path='/viewpoints/consumer/browse'>
            <Header activityTitle='Viewpoints' />
            <ViewpointsScreen />
          </Route>
          <Route path='/find-artwork/consumer/play/:id'>
            <Header activityTitle='Find Artwork' />
            <PlayTreasureHuntScreen />
          </Route>
          <Route path='/find-artwork/consumer/create/:id'>
            <Header activityTitle='Find Artwork' />
            <CreateTreasureHuntScreen />
          </Route>
          <Route path='/find-artwork/consumer/explore/:id'>
            <Header activityTitle='Find Artwork' />
            <ExploreActivityScreen />
          </Route>
          <Route path='/find-artwork/curator/create'>
            <Header activityTitle='Find Artwork' />
            <CreateFindArtworkActivityScreen />
          </Route>
          <Route path='/find-artwork/browse'>
            <BrowseDefinitionsScreen />
          </Route>
          <Route>
            {/*<Redirect to='/find-artwork/consumer/explore/60db0c3c7b4a14179552cb1c' />*/}
            <Redirect to='/viewpoints/consumer/browse' />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;