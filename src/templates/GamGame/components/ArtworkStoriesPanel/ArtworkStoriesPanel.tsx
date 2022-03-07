import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { GamGameActivityContext } from '../../UserPerspective/Screen';
import { useAsyncRequest } from '../../../../services/useAsyncRequest';
import { gamGameApi } from '../../../../services';
import ArtworkStoriesList from './ArtworkStoriesList';
import LoadingOverlay from '../../../../components/Layout/LoadingOverlay';
import { useTranslation } from 'react-i18next';

// /collection/:artworkId/stories
export const ArtworkStoriesPanel = (): JSX.Element => {

  // artworks have already been collected at a higher step
  const { artworks } = useContext(GamGameActivityContext);
  // what artwork are we refering to?
  const { artworkId } = useParams();

  const { t } = useTranslation('gamGame');

  const navigate = useNavigate();

  // get the specific data for your current artwork
  const artworkData = artworks.find(elem => elem.id === artworkId);

  // Fetch all stories containing a given artwork
  const fetchArtworkStories = async () => {
    if (!artworkId) return Promise.reject();
    return gamGameApi.getGamGameStoryDefinitionsByArtworkId(artworkId);
  };

  // perform an api query to fetch all stories that contain our given artwork
  const [fetchStoriesRequest] = useAsyncRequest(fetchArtworkStories, []);

  // selected artwork cannot be found within our context
  if (!artworkData) {
    return (
      <>No artwork found.</>
    );
  }

  // Request currently running
  if (fetchStoriesRequest.kind === 'running') {
    return (
      <LoadingOverlay message={t('fetchingArtworkStories')} />
    );
  }

  // Request is done with, but didn't succeed
  if (!(fetchStoriesRequest.kind === 'success' && fetchStoriesRequest.result.kind === 'ok')) {
    return (
      <>{t('thereWasProblemWhenFetchingArtworkStories')}</>
    );
  }

  // cache the result and then render found stories
  const stories = fetchStoriesRequest.result.data;
  return (
    <ArtworkStoriesList
      currentArtwork={artworkData}
      artworks={artworks}
      stories={stories}
      onCreateStoryClicked={() => navigate('./../../../stories/create')}
      onShowDetailsClicked={() => navigate('./../detail')}
      onStorySelected={(storyId) => navigate(`./../../../stories/${storyId}`)}
    />
  );
};

export default ArtworkStoriesPanel;