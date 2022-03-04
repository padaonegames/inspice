import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import StepTitleCard from '../../../../components/Forms/Cards/StepTitleCard';
import LoadingOverlay from '../../../../components/Layout/LoadingOverlay';
import { gamGameApi } from '../../../../services';
import { GamGameStoryDefinitionData } from '../../../../services/gamGameActivity.model';
import { useAsyncRequest } from '../../../../services/useAsyncRequest';
import StoriesList from '../../components/ArtworkStoriesPanel/StoriesList';
import { ArtworkListDottedLine, StepRoot } from '../../components/generalStyles';
import { GamGameActivityContext } from '../Screen';

export const MyStoriesStep = (): JSX.Element => {

  const { t } = useTranslation('gamGame');
  const navigate = useNavigate();

  const { artworks } = useContext(GamGameActivityContext);

  const requestUserStories = () => {
    return gamGameApi.getGamGameStoryDefinitionsByCurrentUser();
  };
  const [fetchUserStoriesRequest] = useAsyncRequest(requestUserStories, [], true);

  const [stories, setStories] = useState<GamGameStoryDefinitionData[]>([]);

  useEffect(() => {
    if (fetchUserStoriesRequest.kind === 'success' &&
      fetchUserStoriesRequest.result.kind === 'ok') {
      setStories(fetchUserStoriesRequest.result.data);
    }
  }, [fetchUserStoriesRequest]);

  return (
    <StepRoot>
      <StepTitleCard
        stepTitle={t('myStories')}
        stepDescription={t('myStoriesDescription')}
      >
        <ArtworkListDottedLine />
        {fetchUserStoriesRequest.kind === 'running' && (
          <LoadingOverlay message={t('fetchingUserStories')} />
        )}
        <StoriesList
          stories={stories}
          artworks={artworks}
          onStorySelected={(storyId) => navigate(`./../stories/${storyId}`)}
        />
      </StepTitleCard>
    </StepRoot>
  );
}

export default MyStoriesStep;