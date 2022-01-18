import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

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
  font-size: 0.85em;
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

export interface ArtworkCorrectProps {
  flipped: boolean;
  image: string;
  title: string;
};

/**
 * <img src="media://ArtworkCorrect.PNG" alt="ArtworkCorrect">
 */
export const ArtworkCorrect: React.FC<ArtworkCorrectProps> = ({ flipped, image, title }) => {

  const { t } = useTranslation('app');

  return (
    <CardContent
      flipped={flipped}
    >
      <CardBackground backgroundImage={image} />
      <DarkLayer />
      <RevealText>
        <NameText>
          {title}
        </NameText>
        <InformationText>
          {t('correctArtworkAudioHere')}
        </InformationText>
      </RevealText>
    </CardContent>
  );
};

export default ArtworkCorrect;
