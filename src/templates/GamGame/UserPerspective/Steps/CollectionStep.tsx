import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import StepTitleCard from '../../../../components/Forms/Cards/StepTitleCard';
import ArtworksList from '../../components/ArtworkStoriesPanel/ArtworksList';
import { ArtworkListDottedLine, StepRoot } from '../../components/generalStyles';
import { GamGameActivityContext } from '../Screen';

export const CollectionStep = (): JSX.Element => {

  const { t } = useTranslation('gamGame');
  const navigate = useNavigate();
  const { artworks } = useContext(GamGameActivityContext);

  return (
    <StepRoot>
      <StepTitleCard
        stepTitle={t('exploreTheCollection')}
        stepDescription={t('exploreTheCollectionDescription')}
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