import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Artwork } from '../../services/viewpointsArtwork.model';

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
};

const CardBackground = styled.div<CardBackgroundProps>`
  margin-top: 3px;
  margin-bottom: 6px;
  width: 100%;
  height: 200px;
  transform-style: preserve-3d;
  perspective: 1000px;
  background-image: url("https://spice.kmi.open.ac.uk/demos/imma_api/main.php?action=artworkimage&filename=${props => props.backgroundImage}");
  background-color: black;
  border: 1px solid black;

  overflow: hidden;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: auto 110%;

  cursor: pointer;

  ${DarkLayer} {
    animation: ${fadeOutBlack} 0.5s linear;
    background-color: rgba(0, 0, 0, 0);
  }

  ${RevealText} {
    animation: ${fadeOutText} 0.5s linear;
    opacity: 0;
  }

  &:hover {
    ${DarkLayer} {
      animation: ${fadeInBlack} 0.5s linear;
      background-color: rgba(0, 0, 0, 0.5);
    }

    ${RevealText} {
      animation: ${fadeInText} 0.5s linear;
      opacity: 1;
    }
`;

interface ArtworkCardProps {
  /** Data of the artwork shown. */
  artworkData: Artwork;
  /** Callback to notify the parent if the artwork card has been selected. */
  onArtworkSelected?: () => void;
};

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artworkData, onArtworkSelected }) => {

  return (
    <CardBackground
      backgroundImage={artworkData.image}
      onClick={onArtworkSelected}
    >
      <DarkLayer>
        <RevealText>
          <NameText>
            {artworkData.name}
          </NameText>
          <InformationText>
            {artworkData.artist}
          </InformationText>
          <InformationText>
            {artworkData.date.toDateString()}
          </InformationText>
          <InformationText>
            {artworkData.imageLoc}
          </InformationText>
        </RevealText>
      </DarkLayer>
    </CardBackground>
  );
};

export default ArtworkCard;