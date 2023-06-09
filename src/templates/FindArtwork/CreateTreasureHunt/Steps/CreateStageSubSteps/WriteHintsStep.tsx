import React, { useState } from 'react';
import styled from 'styled-components';

import { Envelope } from '@styled-icons/boxicons-solid/Envelope';
import { PlusCircle } from '@styled-icons/boxicons-regular/PlusCircle';
import { RemoveCircle } from '@styled-icons/material/RemoveCircle';
import NextCornerButton from './../NextCornerButton';
import { useTranslation } from 'react-i18next';
import { StepComponentProps } from '../../../../../components/Navigation/Steps';

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
    cursor: pointer;
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



export interface WriteHintsStepProps extends StepComponentProps {
  imageSrc: string;
  minHints: number;
  maxHints: number;
};

/**
 * <img src="media://WriteHints.PNG" alt="WriteHints">
 */
export const WriteHintsStep = (props: WriteHintsStepProps): JSX.Element => {

  const {
    imageSrc,
    minHints,
    maxHints,
  } = props;

  const { t } = useTranslation('app');

  const [selectedHint, setSelectedHint] = useState<number>(0);

  const hints = props.getState<string[]>('clues', []);

  const placeholder = selectedHint > 0 ?
    t('typeYourNextHint') :
    t('writeHintToHelpFindSelectedArtwork');

  const canAdvance = hints.length >= minHints && hints.length <= maxHints && hints.every(h => h.length > 0);

  const updateHint = (index: number, value: string) => {
    props.setState<string[]>('clues', (prev => {
      if (index < prev.length && index >= 0)
        prev[index] = value;
      return prev;
    }), []);
  };

  const removeHint = (index: number) => {
    props.setState<string[]>('clues', (prev => {
      if (index < prev.length && index >= 0)
        prev = prev.filter((_, i) => i !== index);
      return prev;
    }), []);
  };

  const addHint = () => {
    props.setState<string[]>('clues', (prev => {
      prev = [...prev, ""];
      return prev;
    }), []);
  };

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
            onChange={(e) => updateHint(selectedHint, e.target.value)}
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
                      removeHint(i);
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
                    addHint();
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
            onNextClicked={props.prev}
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
                props.next();
              }
            }}
          />
        </ControlsWrapper>
      </ReferencePanel>
    </Root>
  );
}

export default WriteHintsStep;
