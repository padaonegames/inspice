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
import Popup from './PopUp';
import Modal from '../components/Modal';



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

const InformationText = styled.p`
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


const GiftBox = styled(Gift)`
  height: 6vh;
  width: auto;
  align-self: center;
`;

const GiftContainer = styled.button`
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
  gift: string[];
  artworkData: ArtworkData;
};


const ArtworkPopup: React.FC<Props> = ({ flipped, gift, artworkData }) => {

  const { t, i18n } = useTranslation('app');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (

    <CardContent
      flipped={flipped}>
      <CardBackground backgroundImage={artworkData.src} />

      <RevealText>
        <NameText>
          {t('WellDone')}
        </NameText>
        <GiftContainer
          onClick={() => { setModalOpen(true) }}>
          <GiftBox />
        </GiftContainer>
      </RevealText>
      <Modal modalOpen={modalOpen}>
        <Popup
          setModalOpen={setModalOpen}
          gift={gift}
          artworkData={artworkData}
        />
      </Modal>
    </CardContent>
  );
};

export default ArtworkPopup;