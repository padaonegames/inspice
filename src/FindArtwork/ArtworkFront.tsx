import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Mouse } from '@styled-icons/material-outlined/Mouse';
import { ArtworkData } from '../services/commonDefinitions';

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

const fadeInBlack = keyframes`
  from {
    background-color: rgba(0, 0, 0, 0);
  }

  to {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const fadeOutBlack = keyframes`
  from {
    background-color: rgba(0, 0, 0, 0.5);
  }

  to {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const fadeInText = keyframes`
  from {
    opacity: 0;
  }

  to {
    bopacity: 1;
  }
`;

const fadeOutText = keyframes`
  from {
    opacity: 1;
  }

  to {
    bopacity: 0;
  }
`;

const expandCorner = keyframes`
  from {
    width: 10%;
    height: 10%;
  }
  to {
    width: 20%;
    height: 20%;
  }
`;

const shrinkCorner = keyframes`
  to {
    width: 10%;
    height: 10%;
  }
  from {
    width: 20%;
    height: 20%;
  }
`;

const GoCornerIcon = styled(Mouse)`
  color: black;
  height: 82.5%;
  width: auto;
`;

const GoCorner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  overflow: hidden;
  top: 3.5%;
  right: 3.5%;
  background-color: white;
  border-style: solid;
  border-color: black;
  border-width: 1px 1px 1px 1px;
  border-radius: 45%;

  &:hover {
    cursor: pointer;
  }
`;

const DarkLayer = styled.div`
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface CardBackgroundProps {
  backgroundImage: string;
  flipped: boolean;
};

const CardBackground = styled.div<CardBackgroundProps>`
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: -webkit-transform ease 1s;
  transition: transform ease 1s;
  transform: ${props => props.flipped ? 'rotateY(0deg)' : 'rotateY(180deg)'};
  position: absolute;
  display: block;
  z-index: 2;

  height: 100%;
  width: 100%;
  background-image: ${props => `url(${props.backgroundImage})`};
  overflow: hidden;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: auto 95%;
  
  ${GoCorner} {
    animation: ${shrinkCorner} 0.5s linear;
    width: 10%;
    height: 10%;
    opacity: 0.7;
  }

  ${DarkLayer} {
    animation: ${fadeOutBlack} 0.5s linear;
    background-color: rgba(0, 0, 0, 0);
  }

  ${RevealText} {
    animation: ${fadeOutText} 0.5s linear;
    opacity: 0;
  }

  &:hover {
    ${GoCorner} {
      transition: opactiy 0.5s linear;
      opacity: 1;
      animation: ${expandCorner} 0.5s linear;
      width: 20%;
      height: 20%;
    }

    ${DarkLayer} {
      animation: ${fadeInBlack} 0.5s linear;
      background-color: rgba(0, 0, 0, 0.5);
    }

    ${RevealText} {
      animation: ${fadeInText} 0.5s linear;
      opacity: 1;
    }
  }
`;

interface ArtworkFrontProps {
  artworkData: ArtworkData;
  flipped: boolean;
  onArtworkSelected: () => void;
};

const ArtworkFront: React.FC<ArtworkFrontProps> = ({ artworkData, flipped, onArtworkSelected }) => {

  return (
    <CardBackground
      backgroundImage={artworkData.src}
      flipped={flipped}
    >
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
      <GoCorner onClick={onArtworkSelected}>
        <GoCornerIcon />
      </GoCorner>
    </CardBackground>
  );
};

export default ArtworkFront;