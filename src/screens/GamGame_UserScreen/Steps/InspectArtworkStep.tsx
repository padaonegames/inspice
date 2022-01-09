import styled from 'styled-components';
import ArtworkDetail from '../../../components/ArtworkDisplay/ArtworkDetail';
import GeneralArtworkDetail from '../../../components/ArtworkDisplay/GeneralArtworkDetail';
import ContentCard, { CardExplanatoryText } from '../../../components/Layout/ContentCard';
import { StepComponentProps } from '../../../components/Navigation/Steps';
import { ArtworkData } from '../../../services/artwork.model';
import { Artwork } from '../../../services/viewpointsArtwork.model';


const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 65px;
`;

export interface InspectArtworkStepProps extends StepComponentProps {
  artworkData: ArtworkData | undefined;
};

export const InspectArtworkStep = (props: InspectArtworkStepProps): JSX.Element => {

  const { artworkData } = props;

  if (!artworkData) {
    return (
      <Root>
        No artwork found.
      </Root>
    );
  }

  const mappedData: Artwork = {
    _id: artworkData.id,
    name: artworkData.title,
    artist: artworkData.author,
    description: artworkData.info,
    imageLoc: artworkData.location,
    image: artworkData.src,
    audio: '',
    notes: '',
    date: new Date(artworkData.date),
    URL: ''
  };

  return (
    <Root>
      <GeneralArtworkDetail
        artworkData={mappedData}
      />
    </Root>
  );
}

export default InspectArtworkStep;