import React from 'react';
import styled from 'styled-components';
import ArtworkRecomendation from './ArtworkRecomendation';
import { ArtworkData } from '../services/commonDefinitions';

interface RootProps {
  selected: boolean;
};

const Root = styled.div<RootProps>`
  width: 175px;
  height: 350px;
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