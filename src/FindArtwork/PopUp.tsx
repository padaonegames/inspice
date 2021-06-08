import React from 'react';

import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import { Mouse } from '@styled-icons/material-outlined/Mouse';
import { ArtworkData, StageData } from '../services/commonDefinitions';
import { PlusCircle } from '@styled-icons/boxicons-regular/PlusCircle';
import { Gift } from '@styled-icons/boxicons-solid/Gift';
import { ControllerNext } from '@styled-icons/entypo/ControllerNext';
import { useState } from 'react';


///////

interface RootProps {
    backgroundImage: string;
};

const Root = styled.div<RootProps>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(11, 11, 11, 0.95);
  background-image: ${props => `url(${props.backgroundImage})`};
  overflow: hidden;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: auto 80%;
`;

const ReferencePanel = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(11, 11, 11, 0.85);
  margin: auto;
  width: 55%;
  height: 55%;
  padding: 1.5%;
  padding-top: 3%;
  justify-content: center;
  align-content: center;
  position: absolute;
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

const TitleWrapper = styled.div`
  align-self: center;
  text-align: center;
  width: 70%;
  height: auto;
  margin-bottom: 1vh;
  margin-top: 1vh;
`;

const Title = styled.p`
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

const GiftBox = styled(Gift)`
  height: 6vh;
  width: auto;
  align-self: center;
`;



const GiftContainer = styled.div<IconProps>`
  position: relative;
  margin-left: 0.2vw;
  margin-right: 0.2vw;
  cursor: ${props => props.selected ? 'default' : 'pointer'};
  color: ${props => props.selected ? 'white' : 'darkgray'};

  &:hover {
    color: ${props => props.selected ? 'white' : 'lightgray'};
  }
`;

const CloseIcon = styled(ControllerNext)`
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

const RevealText = styled.div`
  display: flex;
  justify-content: right;
  align-content: right;
  flex-direction: column-reverse;
  word-wrap: break-word;
  position: absolute;
  align-self: auto;
  padding: 5%;
  width: 90%;
  height: 100%;
  left:10px;
`;

const NameText = styled.h3`
  font-family: 'EB Garamond';
  font-size: 0.85em;
  font-style: italic;
  font-weight: 850;
  color: white;
  margin-bottom: 2vh;
`;

const InformationText = styled.p`
  font-family: 'EB Garamond';
  margin: 1%;
  color: white;
  font-size: 0.8em;
  font-weight: 575;
  max-width: 77.5%;
`;

const RewardText = styled.h1`
  font-family: 'EB Garamond';
  display: flex;
  justify-content: center;
  align-content: center;
  word-wrap: break-word;
  position: relative;
  align-self: auto;
  padding: 5%;
  width: 90%;
  height: 100%;
  margin: 1%;
  color: white;
  font-size: 1.5em;
  font-weight: 575;
  max-width: 77.5%;
`;




interface PopupBackgroundProps {
    backgroundImage: string;
};

const PopupBackground = styled.div<PopupBackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: black;
  background-image: ${props => `url(${props.backgroundImage})`};
  overflow: hidden;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: auto 80%;
  `
const CorrectRevealText = styled.div`
display: flex;
text-align: center;
justify-content: center;
align-content: center;
flex-direction: column;
word-wrap: break-word;
position: absolute;
align-self: center;
padding: 5%;
width: 100%;
height: 100%;
`;

const CorrectNameText = styled.h3`
font-family: 'EB Garamond';
font-size: 0.85em;
font-style: italic;
font-weight: 850;
color: white;
margin-bottom: 2vh;
`;

const CorrectInformationText = styled.p`
font-family: 'EB Garamond';
color: white;
font-size: 0.8em;
font-weight: 575;
`;




const DarkLayer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface CardContentProps {
    flipped: boolean;
};

const CardContent = styled.div<CardContentProps>`
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: -webkit-transform ease 1s;
  transition: transform ease 1s;
  transform: ${props => props.flipped ? 'rotateY(0deg)' : 'rotateY(-180deg)'};
  position: absolute;
  display: block;

  height: 100%;
  width: 100%;
`;

interface CardBackgroundProps {
    backgroundImage: string;
};

const CardBackground = styled.div<CardBackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${props => `url(${props.backgroundImage})`};
  background-size: cover;
  background-position: 0% 20%;
  filter: blur(1.5px);
  -webkit-filter: blur(1.5px);
  overflow: hidden;
`;

type Props = {
    gift: string[];
    artworkData: ArtworkData;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Popup: React.FC<Props> = ({ gift, artworkData, setModalOpen }) => {
    const { t, i18n } = useTranslation('app');
    const [selectedGift, setSelectedGift] = useState<number>(0);
    return (
        <Root
            backgroundImage={artworkData.src}
        >
            <RevealText>
                <InformationText>
                    {artworkData.location}
                </InformationText>
                <InformationText>
                    {artworkData.date}
                </InformationText>
                <InformationText>
                    {artworkData.info}
                </InformationText>
                <InformationText>
                    {artworkData.author}
                </InformationText>
                <NameText>
                    {i18n.language === 'en' ? artworkData.title_en : artworkData.title}
                </NameText>
            </RevealText>
            <ReferencePanel>
                <TitleWrapper>
                    <Title>
                        {t('WellDone')}
                    </Title>
                </TitleWrapper>
                <ClueWrapper>
                    <GiftStyle
                        maxLength={400}
                        value={t(gift[selectedGift]).toString()}
                    />
                </ClueWrapper>
                <GiftPanelWrapper>
                    <DotsWrapper>
                        {
                            gift.map((_, i) =>
                                <GiftContainer
                                    selected={i === selectedGift}
                                    onClick={() => setSelectedGift(i)}
                                    key={'env' + i}
                                >
                                    <GiftBox />
                                </GiftContainer>
                            )}
                        <CloseIcon
                            onClick={() => setModalOpen(false)}
                        />
                    </DotsWrapper>
                    <GiftsText>
                        {t('gifts')}
                    </GiftsText>

                </GiftPanelWrapper>
            </ReferencePanel>
        </Root >
    );
};

export default Popup;