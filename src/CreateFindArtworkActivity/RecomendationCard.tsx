import React from 'react';
import styled from 'styled-components';
import ArtworkRecomendation from './ArtworkRecomendation';
import { ArtworkData } from '../services/commonDefinitions';

interface RootProps {
  selected: boolean;
};

const Root = styled.div<RootProps>`
  width: 17%;
  height: 50vh;
  align-self: center;
  flex-direction: column;
  margin-top: 1.5%;
  margin-bottom: 1.5%;
  display: flex;
  vertical-align: top;
  border: ${props => props.selected ? '2px solid #f49997' : '1px solid #e0e0e0' };
`;

const ArtContainer = styled.div`
  width: 100%;
  height: 50%;
  perspective: 1000px;
  background-color: transparent;
`;

const GoBottom = styled.div`
  justify-content: left;
  align-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
  padding: 3.5%;
  padding-top: 5%;
  border-top: 1px solid #e0e0e0;
`;

const AddIcon = styled.button`
  color: rgb(255, 255, 255);
  font-size: 15px; 
  line-height: 15px; 
  padding: 5px; 
  border-radius: 10px; 
  font-family: Georgia, serif; 
  font-weight: normal; 
  text-decoration: none; 
  font-style: normal; 
  font-variant: normal; 
  text-transform: none; 
  background-image: linear-gradient(to right, rgb(28, 110, 164) 0%, rgb(35, 136, 203) 50%, rgb(20, 78, 117) 100%);
  box-shadow: rgb(0, 0, 0) 5px 5px 15px 5px; 
  border: 2px solid rgb(28, 110, 164); 
  display: inline-block;
  margin-top: 2vh;

  &:hover {
    background: #1C6EA4; 
  }
  &:active {
    background: #144E75;
  }
`;

const NameText = styled.h3`
  font-family: 'EB Garamond';
  font-size: 1em;
  font-style: italic;
  font-weight: 850;
  color: black;
  margin-bottom: 2vh;
  text-align: left;

`;

const InformationText = styled.p`
  font-family: 'EB Garamond';
  margin: 1%;
  color: black;
  font-size: 0.8em;
  font-weight: 575;
  max-width: 85%;
  text-align: left;
`;

interface RecomendationCardProps {
  artworkData: ArtworkData;
  selected: boolean;
  onCardSelected: () => void;
  onCardDeselected: () => void;
};

const RecomendationCard: React.FC<RecomendationCardProps> = ({ artworkData, selected, onCardSelected, onCardDeselected }) => {

  return (
    <Root selected={selected}>
      <ArtContainer>
        <ArtworkRecomendation
          onArtworkSelected={onCardSelected}
          onArtworkDeselected={onCardDeselected}
          artworkData={artworkData}
          selected={selected}
        />
      </ArtContainer>
      <GoBottom>
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
      </GoBottom>
    </Root>
  );
}

export default RecomendationCard;