import styled from 'styled-components';
import { ArtworkData } from '../../services/artwork.model';
import ArtworkFront from '../../templates/FindArtwork/components/ArtworkFront';
import ArtworkSelectedCard from './ArtworkSelectedCard';

const CardContainer = styled.div`

  @media (max-width: 768px) {
    width: 95%;
    align-self: center;
    margin: 2%;
  }

  @media (min-width: 768px) {
    width: 32%;
    max-width: 240px;
    margin: 0.5%;
  }
  position: relative;

  transform-style: preserve-3d;
  perspective: 1000px;
  background-color: transparent;
  border: 1px solid #e0e0e0;
`;

const Dummy = styled.div`
  margin-top: 100%;
`;

export interface ArtworkSelectionCardProps {
  /** Artwork data to be used to render this component */
  artworkData: ArtworkData;
  /** Whether this should be displayed as being selected by the user */
  selected: boolean;
  /** Callback to the parent of this panel indicating that this artwork has been selected (Added to selection) */
  onCardSelected?: () => void;
  /** Callback to the parent of this panel indicating that this artwork has been deselected (Removed from selection) */
  onCardDeselected?: () => void;
  /**
   * Callback to the parent of this panel indicating that this card has been clicked.
   * Note that this is different from selection, as clicking on an artwork just means that the user wishes
   * to explore it (e.g. to get more information about it).
   */
  onCardClicked?: () => void;
};

/**
 * Basic Card to be used for displaying artworks that can be selected within a list or grid of artwork thumbails/ previews.
 */
export const ArtworkSelectionCard = (props: ArtworkSelectionCardProps) => {

  const {
    artworkData,
    selected,
    onCardSelected,
    onCardDeselected,
    onCardClicked,
  } = props;

  return (
    <CardContainer>
      <Dummy />
      <ArtworkFront
        onArtworkSelected={() => {
          if (onCardSelected)
            onCardSelected();
        }}
        onArtworkClicked={() => {
          if (onCardClicked)
            onCardClicked();
        }}
        artworkData={artworkData}
        flipped={!selected}
      />
      <ArtworkSelectedCard
        artworkData={artworkData}
        onArtworkDeselected={() => {
          if (onCardDeselected)
            onCardDeselected();
        }}
        flipped={selected}
      />
    </CardContainer>
  );
}

export default ArtworkSelectionCard;