import { Outlet, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { GamGameActivityContext } from '../Screen';
import { StepRoot } from '../../components/generalStyles';


export const InspectArtworkStep = (): JSX.Element => {

  const { artworks } = useContext(GamGameActivityContext);
  const { artworkId } = useParams();

  const artworkData = artworks.find(elem => elem.id === artworkId);

  if (!artworkData) {
    return (
      <StepRoot>
        No artwork found.
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