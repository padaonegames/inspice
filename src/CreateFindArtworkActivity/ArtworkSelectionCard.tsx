import React from 'react';
import styled from 'styled-components';
import ArtworkFront from '../FindArtwork/ArtworkFront';
import { ArtworkData } from '../services/commonDefinitions';
import ArtworkSelectedCard from './ArtworkSelectedCard';

const CardContainer = styled.div`
  flex: 0 0 auto; 
  margin: 5px;
  display: block;
  position: relative;
  width: 30%;
  height: 30vh;
  transform-style: preserve-3d;
  perspective: 1000px;
  background-color: transparent;
  border: 1px solid #e0e0e0;
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