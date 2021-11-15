import React from 'react';
import styled, { keyframes } from 'styled-components';
import { CheckboxBlankCircle } from '@styled-icons/remix-fill/CheckboxBlankCircle';
import { ArtworkData } from '../services/artwork.model';

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
    width: 32px;
    height: 32px;
  }
  from {
    width: 27px;
    height: 27px;
  }
`;

const GoCornerIcon = styled(CheckboxBlankCircle)`
  color: white;
  height: 27px;
  width: 27px;
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
  border-radius: 50%;

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
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: block;
  z-index: 2;

  height: 100%;
  width: 100%;
  background-image: ${props => `url(${props.backgroundImage})`};
  overflow: hidden;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: auto 110%;
  
  ${GoCorner} {
    animation: ${shrinkCorner} 0.5s linear;
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
      width: 32px;
      height: 32px;
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

export interface ArtworkFrontProps {
  artworkData: ArtworkData;
  flipped: boolean;
  onArtworkSelected: () => void;
  /**
   * Callback to the parent of this panel indicating that an artwork has been clicked from the panel.
   * Note that this is different from selection, as clicking on an artwork just means that the user wishes
   * to explore it (e.g. to get more information about it).
   */
  onArtworkClicked?: () => void;
};

export const ArtworkFront: React.FC<ArtworkFrontProps> = ({
  artworkData,
  flipped,
  onArtworkSelected,
  onArtworkClicked,
}) => {

  return (
    <CardBackground
      backgroundImage={artworkData.src}
      flipped={flipped}
    >
      <DarkLayer onClick={onArtworkClicked}>
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