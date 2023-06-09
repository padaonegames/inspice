import { Outlet, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { GamGameActivityContext } from '../Screen';
import { StepRoot } from '../../components/generalStyles';
import { useTranslation } from 'react-i18next';


export const InspectArtworkStep = (): JSX.Element => {

  const { t } = useTranslation('gamGame');
  const { artworks } = useContext(GamGameActivityContext);
  const { artworkId } = useParams();

  const artworkData = artworks.find(elem => elem.id === artworkId);

  if (!artworkData) {
    return (
      <StepRoot>
        {t('noArtworkFound')}
      </StepRoot>
    );
  }

  return (
    <StepRoot>
      <Outlet />
    </StepRoot>
  );
}

export default InspectArtworkStep;