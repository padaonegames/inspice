import React, { useState, Suspense, useEffect } from 'react';
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
import { stage0, stage1 } from './artworks/stageData';
import { sampleArtworks } from './artworks/artworkData';
import LoadingScreen from './screens/LoadingScreen';
import CreateFindArtworkActivityScreen from './screens/CreateFindArtworkActivityScreen';
import { useAsyncRequest } from './services/useAsyncRequest';
import { api } from './services';

const stages = [stage0, stage1];

const App: React.FC = () => {

  const [loadedImages, setLoadedImages] = useState<number>(0);

  /*
  const [getArtworksTask] = useAsyncRequest(() => api.fetchAllArtworksFromDataset('f1f1018c-6e72-4e95-953e-889d9ae0c914'), []);

  useEffect(() => {
    console.log(getArtworksTask);
  }, [getArtworksTask]);*/

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
              <Route path='/consumer/play'>
                <PlayTreasureHuntScreen
                  stages={stages}
                  artworks={sampleArtworks}
                />
              </Route>
              <Route path='/consumer/create'>
                <CreateTreasureHuntScreen />
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