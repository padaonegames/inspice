import React, { useState } from 'react';
import styled from 'styled-components';

import { Envelope } from '@styled-icons/boxicons-solid/Envelope';
import { EnvelopeOpen } from '@styled-icons/boxicons-solid/EnvelopeOpen';

const Root = styled.div`
  justify-content: center;
  align-content: center;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%:
  margin-left: 0;
  margin-right: 0;
`;

const ClueWrapper = styled.div`
  align-self: center;
  text-align: center;
  width: 80%;
  height: auto;
`;

const Clue = styled.p`
  font-size: 1em;
  letter-spacing: +1px;
  font-family: 'EB Garamond';
  font-color: darkgray;
`;

const HintsText = styled.p`
  font-size: 0.6em;
  font-weight: 500;
  letter-spacing: +1px;
  font-family: 'EB Garamond';
  align-self: center;
  margin-top: 0;
  margin-bottom: 1vh;
`;

const QuestionWrapper = styled.div`
  align-self: center;
  text-align: center;
  width: 70%;
  height: auto;
`;

const Question = styled.p`
  font-size: 1.2em;
  font-style: italic;
  font-weight: 750;
  letter-spacing: +1px;
  font-family: 'EB Garamond';
`;

const DotsWrapper = styled.div`
  justify-content: center;
  align-content: bottom;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  margin-bottom: 0.3vh;
`;

interface ClueProps {
  selected: boolean;
};

const InfoIconOpened = styled(EnvelopeOpen) <ClueProps>`
  color: ${props => props.selected ? 'black' : 'lightgray'};
  height: 3.75vh;
  width: auto;
  margin-left: 0.2vw;
  margin-right: 0.2vw;
  cursor: ${props => props.selected ? 'default' : 'pointer'};
  &:hover {
    color: ${props => props.selected ? 'black' : 'darkgray'};
  }
`;

const InfoIconClosed = styled(Envelope)`
  color: lightgray;
  height: 4vh;
  width: auto;
`;

const InfoPoints = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 0.7em;
  font-weight: 700;
  letter-spacing: +1px;
  font-family: 'EB Garamond';
  color: darkgray;
`;

const InfoIconWrapper = styled.div`
  position: relative;
  height: max-content;
  width: max-content;
  cursor: pointer;
  margin-left: 0.2vw;
  margin-right: 0.2vw;

  &:hover {
    ${InfoIconClosed} {
      color: darkgray;
    }

    ${InfoPoints} {
      color: black;
    }
  }
`;

interface ClueHolderProps {
  clues: string[];
  onClueOpened: (points: number) => void;
};

const ClueHolder: React.FC<ClueHolderProps> = ({ clues, onClueOpened }) => {

  const [selectedClue, setSelectedClue] = useState<number>(0);
  const [openedClues, setOpenedClues] = useState<boolean[]>(() => {
    let init = Array(clues.length).fill(false);
    init[0] = true;
    return init;
  });

  // añade 15 puntos de penalización por cada pista abierta
  const cluePrice = 15*(openedClues.filter(elem => elem).length);

  return (
    <Root>
      <QuestionWrapper>
        <Question>
          ¿De qué obra estamos hablando?
        </Question>
      </QuestionWrapper>
      <ClueWrapper>
        <Clue>
          {clues[selectedClue]}
        </Clue>
      </ClueWrapper>
      <DotsWrapper>
        {openedClues.map((opened, i) => opened ?
          <InfoIconOpened
            key={'op' + i}
            selected={i === selectedClue}
            onClick={() => {
              setSelectedClue(i);
            }}
          /> :
          <InfoIconWrapper
            key={'clo' + i}
            onClick={() => {
              setSelectedClue(i);
              setOpenedClues((prev) => {
                let aux = prev.slice();
                aux[i] = true;
                return aux;
              });
              onClueOpened(cluePrice);
            }}
          >
            <InfoIconClosed/>
            <InfoPoints>-{cluePrice}</InfoPoints>
          </InfoIconWrapper>
        )}
      </DotsWrapper>
      <HintsText>
        PISTAS
      </HintsText>
    </Root>
  );
}

export default ClueHolder;