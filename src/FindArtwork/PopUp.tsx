import React from 'react';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Medal } from '@styled-icons/remix-line/Medal';
import { ControllerNext } from '@styled-icons/entypo/ControllerNext';
import { useState } from 'react';
import { ArtworkData } from '../services/artwork.model';


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

const PrizeStyle = styled.textarea`
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

const PrizeBox = styled(Medal)`
  height: 6vh;
  width: auto;
  align-self: center;
`;

const PrizeContainer = styled.div<IconProps>`
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

const PrizesText = styled.p`
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
  position: absolute;
  align-self: auto;
  padding: 5%;
  width: 25%;
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
  flex-wrap:wrap;
`;

const InformationText = styled.p`
  font-family: 'EB Garamond';
  margin: 1%;
  color: white;
  font-size: 0.8em;
  font-weight: 575;
  max-width: 77.5%;
`;

type Props = {
  prize: string[];
  artworkData: ArtworkData;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Popup: React.FC<Props> = ({ prize, artworkData, setModalOpen }) => {
  const { t } = useTranslation('app');
  const [selectedPrize, setSelectedPrize] = useState<number>(0);
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
          {artworkData.title}
        </NameText>
      </RevealText>
      <ReferencePanel>
        <TitleWrapper>
          <Title>
            {t('WellDone')}
          </Title>
        </TitleWrapper>
        <ClueWrapper>
          <PrizeStyle
            maxLength={400}
            value={t(prize[selectedPrize]).toString()}
          />
        </ClueWrapper>
        <PrizePanelWrapper>
          <DotsWrapper>
            {
              prize.map((_, i) =>
                <PrizeContainer
                  selected={i === selectedPrize}
                  onClick={() => setSelectedPrize(i)}
                  key={'env' + i}
                >
                  <PrizeBox />
                </PrizeContainer>
              )}
            <CloseIcon
              onClick={() => setModalOpen(false)}
            />
          </DotsWrapper>
          <PrizesText>
            {t('prizes')}
          </PrizesText>

        </PrizePanelWrapper>
      </ReferencePanel>
    </Root >
  );
};

export default Popup;