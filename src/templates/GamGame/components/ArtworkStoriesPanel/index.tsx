import { useParams, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { GamGameActivityContext } from '../../UserPerspective/Screen';
import { StoriesContext } from './StoriesContext';
import { useAsyncRequest } from '../../../../services/useAsyncRequest';
import { gamGameApi } from '../../../../services';

export const ArtworkStoriesPanel = (): JSX.Element => {

  const { artworks } = useContext(GamGameActivityContext);
  const { artworkId } = useParams();

  const artworkData = artworks.find(elem => elem.id === artworkId);

  const fetchArtworkStories = async () => {
    if (!artworkId) return Promise.reject();
    return gamGameApi.getGamGameStoryDefinitionsByArtworkId(artworkId);
  };

  const [fetchStoriesRequest] = useAsyncRequest(fetchArtworkStories, []);

  if (!artworkData) {
    return (
      <>No artwork found.</>
    );
  }

  if (!(fetchStoriesRequest.kind === 'success' && fetchStoriesRequest.result.kind === 'ok')) {
    return (
      <>There was a problem while fetching this artwork's stories.</>
    );
  }

  return (
    <StoriesContext.Provider value={{ stories: fetchStoriesRequest.result.data, artwork: artworkData }}>
      <Outlet />
    </StoriesContext.Provider>
  );
};

export default ArtworkStoriesPanel;