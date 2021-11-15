import React from 'react';
import styled, { keyframes } from 'styled-components';
import { CheckboxCircle } from '@styled-icons/remix-fill/CheckboxCircle';
import { ArtworkData } from '../../services/artwork.model';

const RemoveCornerIcon = styled(CheckboxCircle)`
  color: white;
  height: 27px;
  width: 27px;
`;

const RemoveCorner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  overflow: hidden;
  top: 3.5%;
  right: 3.5%;
  background-color: black;
  border-style: solid;
  border-color: black;
  border-width: 1px 1px 1px 1px;
  border-radius: 50%;

  &:hover {
    cursor: pointer;
  }
`;

const expandCorner = keyframes`
  from {
    width: 27px;
    height: 27px;
  }
  to {
    width: 32px;
    height: 32px;
  }
`;

const shrinkCorner = keyframes`
  to {
    width: 27px;
    height: 27px;
  }
  from {
    width: 32px;
    height: 32px;
  }
`;

const RevealText = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  word-wrap: break-word;
  position: absolute;
  align-self: center;
  padding: 5%;
  width: 90%;
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
  margin: 1%;
  color: white;
  font-size: 0.8em;
  font-weight: 575;
  max-width: 77.5%;
`;

const DarkLayer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid #f49997;
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
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: block;

  height: 100%;
  width: 100%;

  ${RemoveCorner} {
    animation: ${shrinkCorner} 0.5s linear;
    width: 11.5%;
    height: 11.5%;
    opacity: 0.9;
  }

  &:hover {
    ${RemoveCorner} {
      transition: opactiy 0.5s linear;
      opacity: 1;
      animation: ${expandCorner} 0.5s linear;
      width: 32px;
      height: 32px;
      cursor: pointer;
    }
  }
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


interface ArtworkSelectedCardProps {
  flipped: boolean;
  artworkData: ArtworkData;
  onArtworkDeselected: () => void;
};

const ArtworkSelectedCard: React.FC<ArtworkSelectedCardProps> = ({ flipped, artworkData, onArtworkDeselected }) => {

  return (
    <CardContent
      flipped={flipped}
    >
      <CardBackground backgroundImage={artworkData.src} />
      <DarkLayer>
        <RevealText>
          <NameText>
            {artworkData.title}
          </NameText>
          <InformationText>
            {artworkData.author}
          </InformationText>
          <InformationText>
            {artworkData.info}
          </InformationText>
          <InformationText>
            {artworkData.date}
          </InformationText>
          <InformationText>
            {artworkData.location}
          </InformationText>
        </RevealText>
      </DarkLayer>
      <RemoveCorner onClick={onArtworkDeselected}>
        <RemoveCornerIcon />
      </RemoveCorner>
    </CardContent>
  );
};

export default ArtworkSelectedCard;
