import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArtworkCard from '../FindArtwork/ArtworkCard';

import ClueHolder from './ClueHolder';
import { ArtworkData } from '../artworks/artworkData';
import { StageData } from '../artworks/stageData';
import { NextPlan } from '@styled-icons/material-outlined/NextPlan';
import Fader from '../components/Fader';

const Root = styled.div`
  margin-top: 1vh;
  margin-bottom: 1vh;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ArtworkGrid = styled.div`
  height: 100%;
  width: 90%;
  padding: 0.5%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const NextCornerIcon = styled(NextPlan)`
  color: black;
  height: 5.5vh;
  width: auto;
`;

const NextCornerText = styled.p`
  font-size: 0.85em;
  font-weight: 600;
  letter-spacing: +1px;
  font-family: 'EB Garamond';
  align-self: center;
  margin-top: 0.5vh;
`;

const NextCorner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  overflow: hidden;
  top: 5%;
  right: 3%;

  transform: scale(0.9);
  transition: transform linear 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1);
    transition: transform linear 0.3s;
  }
`;

interface FindArtworkProps {
  stageData: StageData;
  imagesData: ArtworkData[];
  onStageCompleted: () => void;
};

const FindArtwork: React.FC<FindArtworkProps> = ({ stageData, imagesData, onStageCompleted }) => {

  const [flippedCards, setFlippedCards] = useState<boolean[]>(Array(imagesData.length).fill(false));
  const [stageCompleted, setStageCompleted] = useState<boolean>(false);

  useEffect(() => {
    setFlippedCards(Array(imagesData.length).fill(false));
    setStageCompleted(false);
  }, [stageData]);

  const handleCardSelected = (id: string, index: number) => {
    if (id === stageData.artworkId) {
      // correcta
      setFlippedCards(Array(imagesData.length).fill(true));
      setStageCompleted(true);
    }
    else {
      // incorrecta
      setFlippedCards(prev => {
        let aux = prev.slice();
        aux[index] = true;
        return aux;
      });
    }
  };

  return (
    <Root>
      <ClueHolder
        clues={stageData.clues}
      />
      <ArtworkGrid>
        {imagesData.map((im, i) => (
          <ArtworkCard
            key={im.id}
            artworkData={im}
            flipped={flippedCards[i]}
            status={im.id === stageData.artworkId ?
              { status: 'right', recording: stageData.recordingPath } :
              { status: 'wrong' }
            }
            onCardSelected={() => handleCardSelected(im.id, i)}
          />
        ))}
      </ArtworkGrid>
      <Fader
        show={stageCompleted}
        transitionTime={2}
      >
        <NextCorner
          onClick={onStageCompleted}
        >
          <NextCornerIcon />
          <NextCornerText>
            CONTINUAR
        </NextCornerText>
        </NextCorner>
      </Fader>
    </Root>
  );
}

export default FindArtwork;