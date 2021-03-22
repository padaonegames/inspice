import React, { useState } from 'react';
import styled from 'styled-components';

import { Envelope } from '@styled-icons/boxicons-solid/Envelope';
import { EnvelopeOpen } from '@styled-icons/boxicons-solid/EnvelopeOpen';

const Root = styled.div`
  justify-content: center;
  align-content: center;
  display: flex;
  flex-direction: column;
  top: 0;
  margin-top: 1.5vh;
  border-style: solid;
  border-color: darkgrey;
  border-width: 0px 0px 1px 0px;
  width: 100%;
  height: auto;
`;

const ClueWrapper = styled.div`
  align-self: center;
  text-align: center;
  width: 70%;
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
  height: 3.5vh;
  width: auto;
  margin-left: 0.1vw;
  margin-right: 0.1vw;
  cursor: ${props => props.selected ? 'default' : 'pointer'};
  &:hover {
    color: ${props => props.selected ? 'black' : 'darkgray'};
  }
`;

const InfoIconClosed = styled(Envelope)`
  color: lightgray;
  cursor: pointer;
  height: 3.75vh;
  width: auto;
  margin-left: 0.1vw;
  margin-right: 0.1vw;
  &:hover {
    color: darkgray;
  }
`;

interface ClueHolderProps {
  clues: string[];
};

const ClueHolder: React.FC<ClueHolderProps> = ({ clues }) => {

  const [selectedClue, setSelectedClue] = useState<number>(0);
  const [openedClues, setOpenedClues] = useState<boolean[]>(() => {
    let init = Array(clues.length).fill(false);
    init[0] = true;
    return init;
  });

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
          <InfoIconClosed
            key={'clo' + i}
            onClick={() => {
              setSelectedClue(i);
              setOpenedClues((prev) => {
                let aux = prev.slice();
                aux[i] = true;
                return aux;
              });
            }}
          />
        )}
      </DotsWrapper>
      <HintsText>
        PISTAS
      </HintsText>
    </Root>
  );
}

export default ClueHolder;
