import React, { useState } from 'react';
import styled from 'styled-components';

import { Envelope } from '@styled-icons/boxicons-solid/Envelope';
import { PlusCircle } from '@styled-icons/boxicons-regular/PlusCircle';
import { Clock } from '@styled-icons/evaicons-solid/Clock';
import { RemoveCircle } from '@styled-icons/material/RemoveCircle';
import NextCornerButton from './NextCornerButton';
import { useTranslation } from 'react-i18next';

interface RootProps {
  backgroundImage: string;
};

const Root = styled.div<RootProps>`
  display: flex;
  flex-direction: row;
  width: auto;
  height: 76.2vh;
  background-image: ${props => `url(${props.backgroundImage})`};
  overflow: hidden;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: auto 90%;
`;

const ReferencePanel = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(11, 11, 11, 0.65);
  margin: auto;
  width: 100%;
  height: 100%;
  padding: 1.5%;
  padding-top: 3%;
  justify-content: center;
  align-content: center;
`;

const ClueWrapper = styled.div`
  align-self: center;
  text-align: center;
  width: 80%;
  height: auto;
`;

const Clue = styled.textarea`
  font-size: 0.9em;
  letter-spacing: +1px;
  font-family: Raleway;
  color: white;
  line-height: 3.5vh;
  background-color: rgba(11, 11, 11, 0.85);
  width: 65%;
  height: 27.5vh;
  resize: none;
  border: solid 1px #F3F3F3;
  padding: 3%;
`;

const QuestionWrapper = styled.div`
  align-self: center;
  text-align: center;
  width: 70%;
  height: auto;
  margin-bottom: 2.5vh;
  margin-top: 5.5vh;
`;

const Question = styled.p`
  font-size: 1em;
  font-weight: 700;
  letter-spacing: +0.5px;
  font-family: Raleway;
  color: white;
`;

const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 2.5%;
  padding-right: 2.5%;
  padding-bottom: 2.5%;
  width: 100%;
  height: auto;
  margin: auto;
`;

const CluePanelWrapper = styled.div`
  justify-content: center;
  align-content: center;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: auto;
  margin-top: 3vh;
  align-self: center;
`;

const DotsWrapper = styled.div`
  justify-content: center;
  align-content: center;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
`;

interface IconProps {
  selected: boolean;
};

const InfoIconClosed = styled(Envelope)`
  height: 6vh;
  width: auto;
  align-self: center;
  color: inherit;
`;

const ExclamationIcon = styled(Clock)`
  height: 2.5vh;
  width: auto;
  position: absolute;
  left: 60%;
  top: 57%;
  color: #b7625e;
`;

const RemoveIcon = styled(RemoveCircle)`
  height: 2.5vh;
  width: auto;
  position: absolute;
  left: 60%;
  top: 57%;
  color: #b7625e;
  transform: scale(0.9);
  transition: transform 0.5s ease;

  &:hover {
    transform:  scale(1.1);
    transition: transform 0.5s ease;
  }
`;
const EnvelopeWrapper = styled.div`
  position: relative;
  margin-left: 0.2vw;
  margin-right: 0.2vw;
`;

const EnvelopeContainer = styled.div<IconProps>`
  position: relative;
  cursor: ${props => props.selected ? 'default' : 'pointer'};
  color: ${props => props.selected ? 'white' : 'darkgray'};

  &:hover {
    color: ${props => props.selected ? 'white' : 'lightgray'};
  }
`;

interface AddHintIconProps {
  enabled: boolean
};

const AddHintIcon = styled(PlusCircle) <AddHintIconProps>`
  color: darkgray;
  height: 5vh;
  align-self: center;
  margin-left: 0.5vw;
  width: auto;

  ${props => props.enabled &&
    `
  &:hover {
    color: lightgray;
    cursor: pointer;
  }
  `}
`;

const HintsText = styled.p`
  font-size: 0.7em;
  font-weight: 500;
  letter-spacing: +1px;
  font-family: Raleway;
  align-self: center;
  margin-top: 1vh;
  color: white;
`;



interface WriteHintsProps {
  hints: string[];
  imageSrc: string;
  minHints: number;
  maxHints: number;
  onAddNewHint: () => void;
  onRemoveHint: (index: number) => void;
  onUpdateHint: (text: string, index: number) => void;
  onNextClicked: () => void;
  onBackClicked: () => void;
};

const WriteHints: React.FC<WriteHintsProps> = ({
  hints,
  imageSrc,
  minHints,
  maxHints,
  onAddNewHint,
  onRemoveHint,
  onUpdateHint,
  onBackClicked,
  onNextClicked
}) => {


  const { t } = useTranslation('app');

  const [selectedHint, setSelectedHint] = useState<number>(0);

  const placeholder = selectedHint > 0 ?
    t('typeYourNextHint') :
    t('writeHintToHelpFindSelectedArtwork');

  const canAdvance = hints.length >= minHints && hints.length <= maxHints && hints.every(h => h.length > 0);

  return (
    <Root
      backgroundImage={imageSrc}
    >
      <ReferencePanel>
        <QuestionWrapper>
          <Question>
            {t('whatArtworkAreWeTalkingAbout')}
          </Question>
        </QuestionWrapper>
        <ClueWrapper>
          <Clue
            maxLength={400}
            placeholder={placeholder}
            onChange={(e) => onUpdateHint(e.target.value, selectedHint)}
            value={hints[selectedHint]}
          />
        </ClueWrapper>
        <CluePanelWrapper>
          <DotsWrapper>
            {hints.map((_, i) =>
              <EnvelopeWrapper>
                <EnvelopeContainer
                  selected={i === selectedHint}
                  onClick={() => setSelectedHint(i)}
                  key={'env' + i}
                >
                  <InfoIconClosed />

                </EnvelopeContainer>
                {i >= minHints &&
                  <RemoveIcon
                    onClick={() => {
                      onRemoveHint(i);
                      setSelectedHint(i - 1);

                    }} />

                }
              </EnvelopeWrapper>
            )}
            {hints.length < maxHints &&
              <AddHintIcon
                enabled={hints.length < maxHints}
                onClick={() => {
                  if (hints.length < maxHints) {
                    onAddNewHint();
                    setSelectedHint(hints.length);
                  }
                }}
              />
            }
          </DotsWrapper>
          <HintsText>
            {t('hints')}
          </HintsText>
        </CluePanelWrapper>

        <ControlsWrapper>
          <NextCornerButton
            type='previous'
            size='small'
            fontSize='0.65em'
            alignSelf='flex-start'
            margin='0'
            onNextClicked={onBackClicked}
          />
          <NextCornerButton
            size='small'
            type='next'
            fontSize='0.65em'
            alignSelf='flex-end'
            margin='0'
            active={canAdvance}
            onNextClicked={() => {
              if (canAdvance) {
                onNextClicked();
              }
            }}
          />
        </ControlsWrapper>
      </ReferencePanel>
    </Root>
  );
}

export default WriteHints;
