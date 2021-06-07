import React from 'react';
import styled from 'styled-components';
import ArtworkFront from '../FindArtwork/ArtworkFront';
import { ArtworkData } from '../services/commonDefinitions';

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
};

const ArtworkSelectionCard: React.FC<ArtworkSelectionCardProps> = ({ artworkData, selected, onCardSelected }) => {
  return (
    <CardContainer>
      <ArtworkFront
        onArtworkSelected={onCardSelected}
        artworkData={artworkData}
        flipped={!selected}
      />
      {/*selected ?
        <ArtworkCorrect
          image={artworkData.src}
          title={artworkData.title}
          title_en={artworkData.title_en!}
          flipped={flipped}
          recording={status.recording}
        /> :
        <ArtworkFailed
          image={artworkData.src}
          title={artworkData.title}
          title_en={artworkData.title_en!}
          flipped={flipped}
        />
      */}
    </CardContainer>
  );
}

export default ArtworkSelectionCard;