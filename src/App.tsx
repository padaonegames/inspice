import { ThemeStore } from './theme/ThemeStore';
import Theme from './theme/Theme';
import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// screen imports
import PlayTreasureHuntScreen from './screens/PlayTreasureHuntScreen';
import CreateTreasureHuntScreen from './screens/CreateTreasureHuntScreen';
import CreateFindArtworkActivityScreen from './screens/CreateFindArtworkActivityScreen';
import BrowseDefinitionsScreen from './screens/BrowseDefinitionsScreen';
import ExploreActivityScreen from './screens/ExploreActivityScreen';
import { ActivityScreen } from './screens/ActivityScreen';

// components
import CreateStorytellingActivityScreen from './screens/CreateStorytellingActivityScreen';
import HomeComponent from './Viewpoints/HomeComponent';
import ViewpointsResultsComponent from './Viewpoints/ViewpointsResultsComponent';
import AnswerViewpointComponent from './Viewpoints/AnswerViewpointComponent';

/**
 * Main entrypoint for our React application within which all other components
 * will be rendered. 
 */
export const App: React.FC = () => {

  return (
    <Suspense fallback='loading'>
      <ThemeStore>
        <Theme>
          <BrowserRouter>
            <Routes>
              <Route path='viewpoints' element={<ActivityScreen activityTitle='Viewpoints' />}>
                <Route path='consumer'>
                  <Route path='browse' element={<HomeComponent />} />
                  <Route path='results' element={<ViewpointsResultsComponent />} />
                  <Route path='answer/:id' element={<AnswerViewpointComponent />} />
                  <Route path='' element={<Navigate replace to='browse' />} />
                </Route>
                <Route path='' element={<Navigate replace to='consumer' />} />
              </Route>
              <Route path='storytelling' element={<CreateStorytellingActivityScreen />} />
              <Route path='find-artwork' element={<ActivityScreen activityTitle='Find Artworks' />}>
                <Route path='consumer'>
                  <Route path='play/:id' element={<PlayTreasureHuntScreen />} />
                  <Route path='create/:id' element={<CreateTreasureHuntScreen />} />
                  <Route path='explore/:id' element={<ExploreActivityScreen />} />
                </Route>
                <Route path='curator'>
                  <Route path='create' element={<CreateFindArtworkActivityScreen />} />
                </Route>
                <Route path='browse' element={<BrowseDefinitionsScreen />} />
                <Route path='' element={<Navigate replace to='browse' />} />
              </Route>
              <Route path='/' element={<Navigate replace to='/viewpoints/consumer/browse' />} />
            </Routes>
          </BrowserRouter>
        </Theme>
      </ThemeStore>
    </Suspense>
  );
};

export default App;