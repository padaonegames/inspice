import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import ArtworkCard from '../FindArtwork/ArtworkCard';

import ClueHolder from './ClueHolder';
import Fader from '../components/Fader';
import PointsPanel from './PointsPanel';
import NextPanel from './NextCornerPanel';

import { NavigateNext } from '@styled-icons/material/NavigateNext';
import { NavigateBefore } from '@styled-icons/material/NavigateBefore';
import { ArtworkData, StageData } from '../services/commonDefinitions';

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
  display: inline-flex;
  flex-direction: row;
  align-content: center;
  border-style: solid;
  border-color: darkgrey;
  border-width: 0px 0px 1px 0px;
`;

const LowerPanelContainer = styled.div`
  background-color: #F8F8F8;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface NavIconProps {
  active: boolean;
};

const NavigateNextIcon = styled(NavigateNext) <NavIconProps>`
  color: ${props => props.active ? 'darkgray' : 'lightgray'};
  cursor: ${props => props.active ? 'pointer' : 'default'};
  height: 7.5vh;
  align-self: center;
  margin-bottom: 1vh;
  transform: scale(0.9);
  transition: transform 0.5s ease;

  &:hover {
    transform: ${props => props.active ? 'scale(1.1)' : 'scale(0.9)'};
    transition: transform 0.5s ease;
  }
`;

const NavigateBeforeIcon = styled(NavigateBefore) <NavIconProps>`
  color: ${props => props.active ? 'darkgray' : 'lightgray'};
  cursor: ${props => props.active ? 'pointer' : 'default'};
  height: 7.5vh;
  align-self: center;
  margin-bottom: 1vh;
  transform: scale(0.9);
  transition: transform 0.5s ease;

  &:hover {
    transform: ${props => props.active ? 'scale(1.1)' : 'scale(0.9)'};
    transition: transform 0.5s ease;
  }
`;

interface FindArtworkProps {
  stageData: StageData;
  imagesData: ArtworkData[];
  onStageCompleted: () => void;
  onPointsUpdate: (value: number) => void;
  score: number;
};

const FindArtwork: React.FC<FindArtworkProps> = ({
  stageData,
  imagesData,
  onStageCompleted,
  onPointsUpdate,
  score
}) => {

  const [flippedCards, setFlippedCards] = useState<boolean[]>(Array(imagesData.length).fill(false));
  const [stageCompleted, setStageCompleted] = useState<boolean>(false);
  const [displayIndex, setDisplayIndex] = useState<number>(0);


  useEffect(() => {
    setFlippedCards(Array(imagesData.length).fill(false));
    setStageCompleted(false);
  }, [stageData]);

  const handleCardSelected = (id: string, index: number) => {
    if (id === stageData.artworkId) {
      // correcta
      setFlippedCards(Array(imagesData.length).fill(true));
      setStageCompleted(true);
      onPointsUpdate(+100);
    }
    else {
      // incorrecta
      onPointsUpdate(-40);
      setFlippedCards(prev => {
        let aux = prev.slice();
        aux[index] = true;
        return aux;
      });
    }
  };

  const handleClueOpened = (value: number) => {
    onPointsUpdate(-value);
  };

  //The Artworks are shown in a snake shape for the 1by1 move
  const displayedArtworks = imagesData.slice(displayIndex, displayIndex + 1).concat(
    imagesData.slice(displayIndex + 2, displayIndex + 3),
    imagesData.slice(displayIndex + 4, displayIndex + 5),
    imagesData.slice(displayIndex + 1, displayIndex + 2),
    imagesData.slice(displayIndex + 3, displayIndex + 4),
    imagesData.slice(displayIndex + 5, displayIndex + 6)
  );
  const newIndex: number[] = [0, 2, 4, 1, 3, 5]; //used for knowing the positions of the snake shpe

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
          transitionTime={1.5}
        >
          <NextPanel
            onNextClicked={onStageCompleted}
          />
        </Fader>
      </UpperRowContainer>
      <LowerPanelContainer>
        <NavigateBeforeIcon
          active={displayIndex > 0}
          onClick={() => {
            if (displayIndex > 0) {
              setDisplayIndex(prev => prev - 2);
            }
          }}
        />
        <ArtworkGrid>
          {displayedArtworks.map((im, i) => (
            <ArtworkCard
              key={im.id}
              artworkData={im}
              flipped={flippedCards[newIndex[i] + displayIndex]}
              status={im.id === stageData.artworkId ?
                { status: 'right', gifts: stageData.gifts } :
                { status: 'wrong' }
              }
              onCardSelected={() => handleCardSelected(im.id, newIndex[i] + displayIndex)}
            />
          ))}
        </ArtworkGrid>
        <NavigateNextIcon
          active={displayIndex + 6 < imagesData.length}
          onClick={() => {
            if (displayIndex + 6 < imagesData.length) {
              setDisplayIndex(prev => prev + 2);
            }
          }}
        />
      </LowerPanelContainer>
    </Root>
  );
}

export default FindArtwork;