import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArtworkCard from '../FindArtwork/ArtworkCard';

import ClueHolder from './ClueHolder';
import { ArtworkData } from '../artworks/artworkData';
import { StageData } from '../artworks/stageData';
import Fader from '../components/Fader';
import PointsPanel from './PointsPanel';
import NextPanel from './NextCornerPanel';

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

const UpperRowContainer = styled.div`
  width: 100%;
  padding-top: 0.5%;
  padding-bottom: 0.5%;
  height: max-content;
  display: inline-flex:
  flex-direction: row;
  align-content: center;
  border-style: solid;
  border-color: darkgrey;
  border-width: 0px 0px 1px 0px;
`;

interface FindArtworkProps {
  stageData: StageData;
  imagesData: ArtworkData[];
  onStageCompleted: () => void;
};

const FindArtwork: React.FC<FindArtworkProps> = ({ stageData, imagesData, onStageCompleted }) => {

  const [flippedCards, setFlippedCards] = useState<boolean[]>(Array(imagesData.length).fill(false));
  const [stageCompleted, setStageCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(100);

  useEffect(() => {
    setFlippedCards(Array(imagesData.length).fill(false));
    setStageCompleted(false);
  }, [stageData]);

  const handleCardSelected = (id: string, index: number) => {
    if (id === stageData.artworkId) {
      // correcta
      setFlippedCards(Array(imagesData.length).fill(true));
      setStageCompleted(true);
      setScore(prev => prev + 100);
    }
    else {
      // incorrecta
      setScore(prev => prev - 40);
      setFlippedCards(prev => {
        let aux = prev.slice();
        aux[index] = true;
        return aux;
      });
    }
  };

  const handleClueOpened = (value: number) => {
    setScore(prev => prev - value);
  };

  return (
    <Root>
      <UpperRowContainer>
        <PointsPanel
          points={score}
        />
        <ClueHolder
          onClueOpened={handleClueOpened}
          clues={stageData.clues}
        />
        <Fader
          show={stageCompleted}
          transitionTime={2}
        >
          <NextPanel
            onNextClicked={onStageCompleted}
          />
        </Fader>
      </UpperRowContainer>
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
    </Root>
  );
}

export default FindArtwork;