import React, { useState } from 'react';
import styled from 'styled-components';

import { Medal } from '@styled-icons/remix-line/Medal';
import { PlusCircle } from '@styled-icons/boxicons-regular/PlusCircle';
import { RemoveCircle } from '@styled-icons/material/RemoveCircle';
import { useTranslation } from 'react-i18next';
import NextCornerButton from '../NextCornerButton';
import { StepComponentProps } from '../../../../../components/Navigation/Steps';
import { TreasureHuntMutimediaData } from '../../../../../services/findArtworkActivity.model';

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

const PrizeStyle = styled.textarea`
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

const PrizePanelWrapper = styled.div`
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

const InfoIconClosed = styled(Medal)`
  height: 6vh;
  width: auto;
  align-self: center;
  color: inherit;
`;

const RemoveIcon = styled(RemoveCircle)`
  height: 2.5vh;
  width: auto;
  position: absolute;
  left: 55%;
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
const PrizeWrapper = styled.div`
  position: relative;
  margin-left: 0.2vw;
  margin-right: 0.2vw;
`;
const PrizeContainer = styled.div<IconProps>`
  position: relative;
  cursor: ${props => props.selected ? 'default' : 'pointer'};
  color: ${props => props.selected ? 'white' : 'darkgray'};

  &:hover {
    color: ${props => props.selected ? 'white' : 'lightgray'};
  }
`;

const AddPrizeIcon = styled(PlusCircle)`
  color: darkgray;
  height: 5vh;
  align-self: center;
  margin-left: 0.5vw;
  width: auto;

  &:hover {
    color: lightgray;
    cursor: pointer;
  }
`;

const PrizesText = styled.p`
  font-size: 0.7em;
  font-weight: 500;
  letter-spacing: +1px;
  font-family: Raleway;
  align-self: center;
  margin-top: 1vh;
  color: white;
`;

export interface WritePrizesStepProps extends StepComponentProps {
  imageSrc: string;
};

/**
 * <img src="media://WriteGifts.PNG" alt="WritePrizes">
 */
export const WritePrizesStep = (props: WritePrizesStepProps): JSX.Element => {

  const {
    imageSrc,
  } = props;

  const { t } = useTranslation('app');

  const [selectedPrize, setSelectedPrize] = useState<number>(0);

  const placeholder = selectedPrize > 0 ?
    t('WhatIsYourPrizeForThePlayer') :
    t('WriteAMessage');
  
  const prizes = props.getState<TreasureHuntMutimediaData[]>('multimediaData', []).map(elem => elem.kind == 'Text' ? elem.text : '');
  const canAdvance = prizes.every(p => p.length > 0);

  const updatePrize = (index: number, value: string) => {
    props.setState<TreasureHuntMutimediaData[]>('multimediaData', (prev => {
      if (index < prev.length && index >= 0)
        prev[index] = { kind: 'Text', text: value };
      return prev;
    }), []);
  };

  const removePrize = (index: number) => {
    props.setState<TreasureHuntMutimediaData[]>('multimediaData', (prev => {
      if (index < prev.length && index >= 0)
        prev = prev.filter((_, i) => i !== index);
      return prev;
    }), []);
  };

  const addPrize = () => {
    props.setState<TreasureHuntMutimediaData[]>('multimediaData', (prev => {
      prev = [...prev, { kind: 'Text', text: '' }];
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
            {t('WhatIsYourPrizeForThePlayer')}
          </Question>
        </QuestionWrapper>
        <ClueWrapper>
          <PrizeStyle
            maxLength={400}
            placeholder={placeholder}
            onChange={(e) => updatePrize(selectedPrize, e.target.value)}
            value={prizes[selectedPrize]}
          />
        </ClueWrapper>
        <PrizePanelWrapper>
          <DotsWrapper>
            {prizes.map((_, i) =>
              <PrizeWrapper>
                <PrizeContainer
                  selected={i === selectedPrize}
                  onClick={() => setSelectedPrize(i)}
                  key={'env' + i}
                >
                  <InfoIconClosed />
                </PrizeContainer>
                {i >= 1 &&
                  <RemoveIcon onClick={() => {
                    removePrize(i);
                    setSelectedPrize(i - 1)
                  }} />

                }
              </PrizeWrapper>
            )}
            {prizes.length < 5 &&
              <AddPrizeIcon
                onClick={() => {
                  if (prizes.length < 5) {
                    addPrize();
                    setSelectedPrize(prizes.length);
                  }
                }}
              />
            }
          </DotsWrapper>
          <PrizesText>
            {t('PRIZES')}
          </PrizesText>
        </PrizePanelWrapper>

        <ControlsWrapper>
          <NextCornerButton
            type='previous'
            size='small'
            fontSize='0.65em'
            alignSelf='flex-start'
            margin='0'
            onNextClicked={props.prev}
          />
          {!props.isLast() &&
            <NextCornerButton
              size='small'
              //type='next'
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
          }
        </ControlsWrapper>
      </ReferencePanel>
    </Root>
  );
}

export default WritePrizesStep;