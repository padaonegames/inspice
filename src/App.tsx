import { ThemeStore } from './theme/ThemeStore';
import Theme from './theme/Theme';
import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// screen imports
import PlayTreasureHuntScreen from './templates/FindArtwork/PlayTreasureHunt/Screen';
import CreateTreasureHuntScreen from './templates/FindArtwork/CreateTreasureHunt/Screen';
import CreateFindArtworkActivityScreen from './templates/FindArtwork/CreateActivity/Screen';
import BrowseDefinitionsScreen from './screens/BrowseDefinitionsScreen';
import ExploreActivityScreen from './templates/FindArtwork/ExploreActivity/Screen';
import { ActivityScreen } from './screens/ActivityScreen';

// components
import HomeComponent from './templates/Viewpoints/HomeComponent';
import ViewpointsResultsComponent from './templates/Viewpoints/ViewpointsResultsComponent';
import AnswerViewpointComponent from './templates/Viewpoints/AnswerViewpointComponent';
import CreateGamGameActivityScreen from './templates/GamGame/CreateActivity/Screen';
import GamGameUserMenuScreen from './templates/GamGame/UserPerspective/Screen';
import { TemplateDashboard } from './templates/TemplateDashboard/Screen';
import { AuthStore } from './auth/AuthStore';
import LoginScreen from './templates/Auth/Login/LoginScreen';
import { MncnCatalogueBrowsingScreen } from './templates/NaturalScienceCatalogue/BrowseCatalogue/Screen';
import { MncnViewArtifactScreen } from './templates/NaturalScienceCatalogue/Artifact/ViewArtifactScreen';

/**
 * Main entrypoint for our React application within which all other components
 * will be rendered. 
 */
export const App = (): JSX.Element => {

  return (
    <Suspense fallback='loading'>
      <ThemeStore>
        <Theme>
          <AuthStore>
            <BrowserRouter>
              <Routes>
                <Route path='dashboard' element={<ActivityScreen activityTitle='InSpice - Dashboard' />}>
                  <Route path='' element={<TemplateDashboard />} />
                </Route>
                <Route path='mncn-collection' element={<ActivityScreen activityTitle='MNCN - Colección' />}>
                  <Route path='browse' element={<MncnCatalogueBrowsingScreen />} />
                  <Route path='artifact/:id' element={<MncnViewArtifactScreen />} />
                </Route>
                <Route path='viewpoints' element={<ActivityScreen activityTitle='IMMA - Viewpoints' />}>
                  <Route path='consumer'>
                    <Route path='browse' element={<HomeComponent />} />
                    <Route path='results' element={<ViewpointsResultsComponent />} />
                    <Route path='answer/:id' element={<AnswerViewpointComponent />} />
                    <Route path='' element={<Navigate replace to='browse' />} />
                  </Route>
                  <Route path='' element={<Navigate replace to='consumer' />} />
                </Route>
                <Route path='find-artwork' element={<ActivityScreen activityTitle='IMMA - Find Artworks' />}>
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
                <Route path='gam-game'>
                  <Route path='consumer'>
                    <Route path='visit/:id/*' element={<GamGameUserMenuScreen />} />
                  </Route>
                  <Route path='curator' element={<ActivityScreen /*guarded*/ activityTitle='GAM - GAM Game' />}>
                    <Route path='create' element={<CreateGamGameActivityScreen />} />
                  </Route>
                </Route>
                <Route path='/login' element={<LoginScreen />} />
                <Route path='/' element={<Navigate replace to='/dashboard' />} />
              </Routes>
            </BrowserRouter>
          </AuthStore>
        </Theme>
      </ThemeStore>
    </Suspense>
  );
};

export default App;