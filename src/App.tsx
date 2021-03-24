import React, { useState } from 'react';
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

const stages = [stage0, stage1];

const App: React.FC = () => {

  const [loadedImages, setLoadedImages] = useState<number>(0);

  return (
    <>
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
              <Route path="/play">
                <FindArtworkScreen
                  stages={stages}
                  artworks={sampleArtworks}
                />
              </Route>
              <Route path="/create">
                <CreateGameScreen />
              </Route>
              <Route>
                <Redirect to='/create' />
              </Route>
            </Switch>
          )}
      </Router>
    </>
  );
};

export default App;
