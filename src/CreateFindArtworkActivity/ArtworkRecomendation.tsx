import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ArtworkData } from '../services/commonDefinitions';
import { CheckboxCircle } from '@styled-icons/remix-fill/CheckboxCircle';
import { CheckboxBlankCircle } from '@styled-icons/remix-fill/CheckboxBlankCircle';

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
    opacity: 0.7;
  }

  &:hover {
    ${GoCorner}, ${RemoveCorner} {
      transition: opactiy 0.5s linear;
      opacity: 1;
      animation: ${expandCorner} 0.5s linear;
      width: 32px;
      height: 32px;
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