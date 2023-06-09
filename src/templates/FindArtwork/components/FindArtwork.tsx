import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArtworkCard from './ArtworkCard';

import ClueHolder from './ClueHolder';
import Fader from '../../../components/Layout/Fader';
import PointsPanel from './PointsPanel';
import NextPanel from './NextCornerPanel';

import { NavigateNext } from '@styled-icons/material/NavigateNext';
import { NavigateBefore } from '@styled-icons/material/NavigateBefore';
import { ArtworkData } from '../../../services/artwork.model';
import { StageData } from '../../../services/findArtworkActivity.model';
import ContentCard from '../../../components/Layout/ContentCard';

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

const ArtworksContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 32%;
  height: 100%;
  padding-left: 2%;
`;

const UpperRowContainer = styled.div`
  width: 100%;
  padding-top: 0.5%;
  padding-bottom: 0.5%;
  height: max-content;
  display: inline-flex;
  flex-direction: row;
  align-content: center;
  border-bottom: 1px solid #e5e5e5;
`;

const LowerPanelContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
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

export interface FindArtworkProps {
  /** Groups several Artworks and clues for them to be identified. */
  stageData: StageData;
  /** List of artworks with their respective information. */
  imagesData: ArtworkData[];
  /** Callback to the parent to notify when all have been guessed. */
  onStageCompleted?: () => void;
  /** Callback to the parent to notify the points have changed. */
  onPointsUpdate?: (value: number) => void;
  /** The score achieved by the user. */
  score: number;
};

/**
 * This component is responsible for the complete find artwork game experience. It has all the stage information and the artworks to be displayed in the game and is checking the points of the game.
 */
export const FindArtwork: React.FC<FindArtworkProps> = ({
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
  }, [stageData, imagesData.length]);

  const handleCardSelected = (id: string, index: number) => {
    if (id === stageData.artworkId) {
      // correcta
      setFlippedCards(Array(imagesData.length).fill(true));
      setStageCompleted(true);
      if(onPointsUpdate!== undefined){onPointsUpdate(+100);}
    }
    else {
      // incorrecta
    if(onPointsUpdate!== undefined){onPointsUpdate(-40);}
      setFlippedCards(prev => {
        let aux = prev.slice();
        aux[index] = true;
        return aux;
      });
    }
  };

  const handleClueOpened = (value: number) => {
    if(onPointsUpdate!== undefined){onPointsUpdate(-value);}
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
          transitionTime={1.5}
        >
          <NextPanel
            onNextClicked={onStageCompleted}
          />
        </Fader>
      </UpperRowContainer>
      <LowerPanelContainer>
        <ContentCard
          width='95%'
          maxWidth='100%'
          flexDirection='row'
        >
          <NavigateBeforeIcon
            active={displayIndex > 0}
            onClick={() => {
              if (displayIndex > 0) {
                setDisplayIndex(prev => prev - 2);
              }
            }}
          />
          <ArtworkGrid>
            {[0, 1, 2].map(column =>
              <ArtworksContainer key={column}>
                {imagesData.slice((displayIndex + (column * 2)), (displayIndex + 2 + (column * 2))).map((im, i) => (
                  <ArtworkCard
                    key={im.id + im.author}
                    artworkData={im}
                    flipped={flippedCards[(column * 2) + i + displayIndex]}
                    status={im.id === stageData.artworkId ?
                      { status: 'right', prizes: stageData.multimediaData.map(elem => elem.kind === 'Text' ? elem.text : elem.src) } :
                      { status: 'wrong' }
                    }
                    onCardSelected={() => handleCardSelected(im.id, ((column * 2) + i + displayIndex))}
                  />
                ))}
              </ArtworksContainer>
            )}
          </ArtworkGrid>
          <NavigateNextIcon
            active={displayIndex + 6 < imagesData.length}
            onClick={() => {
              if (displayIndex + 6 < imagesData.length) {
                setDisplayIndex(prev => prev + 2);
              }
            }}
          />
        </ContentCard>
      </LowerPanelContainer>
    </Root>
  );
}

export default FindArtwork;