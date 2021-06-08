import React, { useState } from 'react';
import styled from 'styled-components';
import { ArtworkData } from '../services/commonDefinitions';
import ArtworkCorrect from './ArtworkCorrect';
import ArtworkFailed from './ArtworkFailed';
import ArtworkFront from './ArtworkFront';
import ArtworkPopup from './ArtworkPopup';

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
  border: 5px solid black;
`;

export type ArtworkCardStatus =
  | { status: 'wrong' }
  | { status: 'right', gifts: string[] };

interface ArtworkCardProps {
  artworkData: ArtworkData;
  status: ArtworkCardStatus;
  flipped: boolean;
  onCardSelected: () => void;
};

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artworkData, flipped, status, onCardSelected }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <CardContainer>
      <ArtworkFront
        onArtworkSelected={onCardSelected}
        artworkData={artworkData}
        flipped={!flipped}
      />
      {status.status === 'right' ?
        /* <ArtworkCorrect
           image={artworkData.src}
           title={artworkData.title}
           title_en={artworkData.title_en!}
           flipped={flipped}       
         />*/
        <ArtworkPopup
          flipped={flipped}
          gift={status.gifts}
          artworkData={artworkData}
        />
        :
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