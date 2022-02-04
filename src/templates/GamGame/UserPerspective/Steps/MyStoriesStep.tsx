import { useContext, useEffect, useState } from 'react';
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
        stepTitle='My Stories'
        stepDescription={`Here you can find a list of your personal stories. Use this page to browse, view and delete the stories you've already created.`}
      >
        <ArtworkListDottedLine />
        {fetchUserStoriesRequest.kind === 'running' && (
          <LoadingOverlay message='Fetching user stories' />
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