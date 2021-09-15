import React from 'react';
import styled from 'styled-components';
import { ArtworkData } from '../services/commonDefinitions';
import ArtworkFailed from './ArtworkFailed';
import ArtworkFront from './ArtworkFront';
import ArtworkPopup from './ArtworkPopup';

const CardContainer = styled.div`
  flex: 0 0 auto; 
  margin: 5px;
  display: block;
  position: relative;
  width: 95%;
  height: 30vh;
  transform-style: preserve-3d;
  perspective: 1000px;
  background-color: transparent;
  border: 5px solid black;
`;

export type ArtworkCardStatus =
  | { status: 'wrong' }
  | { status: 'right', prizes: string[] };

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
        <ArtworkPopup
          flipped={flipped}
          prize={status.prizes}
          artworkData={artworkData}
        />
        :
        <ArtworkFailed
          image={artworkData.src}
          title={artworkData.title}
          flipped={flipped}
        />
      }
    </CardContainer>
  );
}

export default ArtworkCard;