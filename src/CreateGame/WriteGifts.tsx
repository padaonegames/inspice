import React, { useState } from 'react';
import styled from 'styled-components';

import { Gift } from '@styled-icons/boxicons-solid/Gift';
import { PlusCircle } from '@styled-icons/boxicons-regular/PlusCircle';
import { Clock } from '@styled-icons/evaicons-solid/Clock';
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
  background-color: rgba(11, 11, 11, 0.85);
  margin: auto;
  width: 55%;
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

const GiftStyle = styled.textarea`
  font-size: 0.9em;
  letter-spacing: +1px;
  font-family: Raleway;
  color: white;
  line-height: 3.5vh;
  background-color: rgba(11, 11, 11, 0.85);
  width: 90%;
  height: 27.5vh;
  resize: none;
  border: solid 1px #F8F8F8;
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

const GiftPanelWrapper = styled.div`
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

const InfoIconClosed = styled(Gift)`
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

const EnvelopeContainer = styled.div<IconProps>`
  position: relative;
  margin-left: 0.2vw;
  margin-right: 0.2vw;
  cursor: ${props => props.selected ? 'default' : 'pointer'};
  color: ${props => props.selected ? 'white' : 'darkgray'};

  &:hover {
    color: ${props => props.selected ? 'white' : 'lightgray'};
  }
`;

const AddGiftIcon = styled(PlusCircle)`
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

const GiftsText = styled.p`
  font-size: 0.7em;
  font-weight: 500;
  letter-spacing: +1px;
  font-family: Raleway;
  align-self: center;
  margin-top: 1vh;
  color: white;
`;

interface WriteGiftsProps {
  gifts: string[];
  imageSrc: string;
  onAddNewGift: () => void;
  onRemoveGift: (index: number) => void;
  onUpdateGift: (text: string, index: number) => void;
  canClickNext: boolean;
  onNextClicked: () => void;
  onBackClicked: () => void;
};

const WriteGifts: React.FC<WriteGiftsProps> = ({
  gifts,
  imageSrc,
  onAddNewGift,
  onRemoveGift,
  onUpdateGift,
  canClickNext,
  onBackClicked,
  onNextClicked
}) => {

  const { t, i18n } = useTranslation('app');

  const [selectedGift, setSelectedGift] = useState<number>(0);

  const placeholder = selectedGift > 0 ?
    t('What is your gift for the player') :
    t('Write a message for the player to read after completing the game...');

  const canAdvance = gifts.every(h => h.length > 0);

  return (

    <Root
      backgroundImage={imageSrc}
    >
      <ReferencePanel>
        <QuestionWrapper>
          <Question>
            {t('What is Your Gift For The Player?')}
          </Question>
        </QuestionWrapper>
        <ClueWrapper>
          <GiftStyle
            maxLength={400}
            placeholder={placeholder}
            onChange={(e) => onUpdateGift(e.target.value, selectedGift)}
            value={gifts[selectedGift]}
          />
        </ClueWrapper>
        <GiftPanelWrapper>
          <DotsWrapper>
            {gifts.map((_, i) =>
              <EnvelopeContainer
                selected={i === selectedGift}
                onClick={() => setSelectedGift(i)}
                key={'env' + i}
              >
                <InfoIconClosed />
                {gifts[i].length == 0 &&
                  <ExclamationIcon />
                }
              </EnvelopeContainer>
            )}
            <AddGiftIcon
              onClick={onAddNewGift}
            />
          </DotsWrapper>
          <GiftsText>
            {t('GIFTS')}
          </GiftsText>
        </GiftPanelWrapper>

        <ControlsWrapper>
          <NextCornerButton
            type='previous'
            size='small'
            fontSize='0.65em'
            alignSelf='flex-start'
            margin='0'
            onNextClicked={onBackClicked}
          />
          {canClickNext &&
            <NextCornerButton
              size='small'
              //type='next'
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
          }
        </ControlsWrapper>
      </ReferencePanel>
    </Root>
  );
}

export default WriteGifts;