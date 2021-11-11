import React from 'react';
import styled from 'styled-components';
import ArtworkFront from '../FindArtwork/ArtworkFront';
import { ArtworkData } from '../services/artwork.model';
import ArtworkSelectedCard from './ArtworkSelectedCard';

const CardContainer = styled.div`
  margin: 0.5%;
  position: relative;
  width: 32%;
  max-width: 240px;
  transform-style: preserve-3d;
  perspective: 1000px;
  background-color: ${props => props.theme.artworkDisplayBackground};
  border: 1px solid #e0e0e0;
`;

const Dummy = styled.div`
  margin-top: 100%;
`;

interface ArtworkSelectionCardProps {
  artworkData: ArtworkData;
  selected: boolean;
  onCardSelected: () => void;
  onCardDeselected: () => void;
};

const ArtworkSelectionCard: React.FC<ArtworkSelectionCardProps> = ({ artworkData, selected, onCardSelected, onCardDeselected }) => {
  return (
    <CardContainer>
      <Dummy />
      <ArtworkFront
        onArtworkSelected={onCardSelected}
        artworkData={artworkData}
        flipped={!selected}
      />
      <ArtworkSelectedCard
        artworkData={artworkData}
        onArtworkDeselected={onCardDeselected}
        flipped={selected}
      />
    </CardContainer>
  );
}

export default ArtworkSelectionCard;