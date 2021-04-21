import React from 'react';
import styled from 'styled-components';
import { ArtworkData } from '../artworks/artworkData';
import ArtworkCorrect from './ArtworkCorrect';
import ArtworkFailed from './ArtworkFailed';
import ArtworkFront from './ArtworkFront';

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
`;

export type ArtworkCardStatus = 
  | { status: 'wrong' }
  | { status: 'right', recording: string };

interface ArtworkCardProps {
  artworkData: ArtworkData;
  status: ArtworkCardStatus;
  flipped: boolean;
  onCardSelected: () => void;
};

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artworkData, flipped, status, onCardSelected }) => {
  return (
    <CardContainer>
      <ArtworkFront
        onArtworkSelected={onCardSelected}
        artworkData={artworkData}
        flipped={!flipped}
      />
      {status.status === 'right' ?
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
      }
    </CardContainer>
  );
}

export default ArtworkCard;