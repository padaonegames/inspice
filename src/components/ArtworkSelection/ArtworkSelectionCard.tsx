import React from 'react';
import styled from 'styled-components';
import ArtworkFront from '../../FindArtwork/ArtworkFront';
import { ArtworkData } from '../../services/artwork.model';
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
  background-color: ${props => props.theme.artworkDisplayBackground};
  border: 1px solid #e0e0e0;
`;

const Dummy = styled.div`
  margin-top: 100%;
`;

export interface ArtworkSelectionCardProps {
  artworkData: ArtworkData;
  selected: boolean;
  onCardSelected?: () => void;
  onCardDeselected?: () => void;
  /**
   * Callback to the parent of this panel indicating that this card has been clicked.
   * Note that this is different from selection, as clicking on an artwork just means that the user wishes
   * to explore it (e.g. to get more information about it).
   */
  onCardClicked?: () => void;
};

/**
 * + Unselected Version:
 * 
 * <img src="media://ArtworkSelectionCardUnselected.PNG" alt="ArtworkSelectionCardUnselected">
 * 
 * + Unselected Version (Hover):
 * 
 * <img src="media://ArtworkSelectionCardHover.PNG" alt="ArtworkSelectionCardHover">
 * 
 * + Selected Version:
 * 
 * <img src="media://ArtworkSelectedCard.PNG" alt="ArtworkSelectedCard">
 */
export const ArtworkSelectionCard: React.FC<ArtworkSelectionCardProps> = ({
  artworkData,
  selected,
  onCardSelected,
  onCardDeselected,
  onCardClicked,
}) => {

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