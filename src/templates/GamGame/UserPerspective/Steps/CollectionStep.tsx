import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import StepTitleCard from '../../../../components/Forms/Cards/StepTitleCard';
import ArtworksList from '../../components/ArtworkStoriesPanel/ArtworksList';
import { ArtworkListDottedLine, StepRoot } from '../../components/generalStyles';
import { GamGameActivityContext } from '../Screen';

export const CollectionStep = (): JSX.Element => {

  const navigate = useNavigate();
  const { artworks } = useContext(GamGameActivityContext);

  return (
    <StepRoot>
      <StepTitleCard
        stepTitle='Explore the Collection'
        stepDescription={`Here you can find the works included in this activity. Click on any of them to access its information page or interact with its stories.`}
      >
        <ArtworkListDottedLine />
        <ArtworksList
          artworks={artworks}
          onArtworkSelected={(id) => navigate(`${id}`)}
        />
      </StepTitleCard>
    </StepRoot>
  );
}

export default CollectionStep;