import React, { useState, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import FindArtworkScreen from './screens/FindArtworkScreen';
import CreateGameScreen from './screens/CreateGameScreen';
import Header from './components/Header';
import { GlobalStyles } from './global/global';
import { stage0, stage1 } from './artworks/stageData';
import { sampleArtworks } from './artworks/artworkData';
import LoadingScreen from './screens/LoadingScreen';
import CreateFindArtworkActivityScreen from './screens/CreateFindArtworkActivityScreen';

const stages = [stage0, stage1];

const App: React.FC = () => {

  const [loadedImages, setLoadedImages] = useState<number>(0);

  // const [getArtworkTask] = useAsyncRequest(() => api.getArtworkById('vulcano'), []);

  return (
    <Suspense fallback='loading'>
      <div id='preload-images-demo'>
        {sampleArtworks.map(artw =>
          <img
            key={artw.id}
            src={artw.src}
            style={{ display: 'none' }}
            onLoad={() => setLoadedImages(prev => prev + 1)}
          />
        )}
      </div>
      <Router>
        <GlobalStyles />
        <Header />
        {loadedImages < sampleArtworks.length ?
          <LoadingScreen
            loadedAssets={loadedImages}
            totalAssets={sampleArtworks.length}
          /> : (
            <Switch>
              <Route path='/consumer/play/:treasure-hunt-id'>
                <FindArtworkScreen
                  stages={stages}
                  artworks={sampleArtworks}
                />
              </Route>
              <Route path='/consumer/create/:find-artword-activity-id'>
                <CreateGameScreen />
              </Route>
              <Route path='/curator/create'>
                <CreateFindArtworkActivityScreen />
              </Route>
              <Route>
                <Redirect to='/curator/create' />
              </Route>
            </Switch>
          )}
      </Router>
    </Suspense>
  );
};

export default App;