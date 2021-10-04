import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Medal } from '@styled-icons/remix-line/Medal';
import { useState } from 'react';
import Popup from './PopUp';
import Modal from '../components/Modal';
import { ArtworkData } from '../services/artwork.model';

const RevealText = styled.div`
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

const NameText = styled.h3`
  font-family: 'EB Garamond';
  font-size: 1.2em;
  font-style: italic;
  font-weight: 850;
  color: white;
  margin-bottom: 2vh;
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


const PrizeBox = styled(Medal)`
  height: 6vh;
  width: auto;
  align-self: center;
`;

const PrizeContainer = styled.button`
  position: relative;
  margin-left: 0.2vw;
  margin-right: 0.2vw;
  color:rgb(255, 255, 255);

  &:hover {
    color: rgb(207, 207, 207);
  }
`;

type Props = {
  flipped: boolean;
  prize: string[];
  artworkData: ArtworkData;
};


const ArtworkPopup: React.FC<Props> = ({ flipped, prize, artworkData }) => {

  const { t } = useTranslation('app');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (

    <CardContent
      flipped={flipped}>
      <CardBackground backgroundImage={artworkData.src} />

      <RevealText>
        <NameText>
          {t('WellDone')}
        </NameText>
        <PrizeContainer
          onClick={() => { setModalOpen(true) }}>
          <PrizeBox />
        </PrizeContainer>
      </RevealText>
      <Modal modalOpen={modalOpen}>
        <Popup
          setModalOpen={setModalOpen}
          prize={prize}
          artworkData={artworkData}
        />
      </Modal>
    </CardContent>
  );
};

export default ArtworkPopup;