import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ArtworkData } from '../services/commonDefinitions';
import { Mouse } from '@styled-icons/material-outlined/Mouse';
import { DocumentRemove } from '@styled-icons/heroicons-outline/DocumentRemove';

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

const RemoveCornerIcon = styled(DocumentRemove)`
  color: white;
  height: 82.5%;
  width: auto;
`;

const RemoveCorner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  overflow: hidden;
  top: 3.5%;
  right: 3.5%;
  background-color: red;
  border-style: solid;
  border-color: black;
  border-width: 1px 1px 1px 1px;
  border-radius: 45%;

  &:hover {
    cursor: pointer;
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

interface CardBackgroundProps {
  backgroundImage: string;
  selected: boolean;
};

const CardBackground = styled.div<CardBackgroundProps>`
  height: 100%;
  width: 100%;
  background-image: ${props => `url(${props.backgroundImage})`};
  overflow: hidden;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: auto 95%;
  
  ${GoCorner}, ${RemoveCorner} {
    animation: ${shrinkCorner} 0.5s linear;
    width: 10%;
    height: 10%;
    opacity: 0.7;
  }

  &:hover {
    ${GoCorner}, ${RemoveCorner} {
      transition: opactiy 0.5s linear;
      opacity: 1;
      animation: ${expandCorner} 0.5s linear;
      width: 20%;
      height: 20%;
    }
  }
`;

interface ArtworkRecomendationProps {
  artworkData: ArtworkData;
  selected: boolean;
  onArtworkSelected: () => void;
  onArtworkDeselected: () => void;
};

const ArtworkRecomendation: React.FC<ArtworkRecomendationProps> = ({ artworkData, selected, onArtworkSelected, onArtworkDeselected }) => {

  return (
    <CardBackground
      backgroundImage={artworkData.src}
      selected={selected}
    >
      {selected &&
        <RemoveCorner onClick={onArtworkDeselected}>
          <RemoveCornerIcon />
        </RemoveCorner>
      }
      {!selected &&
        <GoCorner onClick={onArtworkSelected}>
          <GoCornerIcon />
        </GoCorner>
      }
    </CardBackground>
  );
};

export default ArtworkRecomendation;