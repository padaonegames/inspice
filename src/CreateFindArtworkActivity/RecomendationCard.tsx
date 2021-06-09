import React from 'react';
import styled from 'styled-components';
import ArtworkRecomendation from './ArtworkRecomendation';
import { ArtworkData } from '../services/commonDefinitions';
import { ControllerNext } from '@styled-icons/entypo/ControllerNext';

const ArtworkGrid = styled.div`
  width: 15%;
  height: auto;
  flex-wrap: wrap;
  align-self: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid black;
  flex: 0 auto auto;
  text-align:center;
  display:inline-block;
  vertical-align:top;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const ArtContainer = styled.div`
  flex: 0 0 auto; 
  display: block;
  position: relative;
  width: Auto;
  height: 25vh;
  transform-style: preserve-3d;
  perspective: 1000px;
  background-color: transparent;

`;

const GoBottom = styled.div`
  position: relative;
  overflow: hidden;
  justify-content: center;
  align-content: center;
  display: flex;
  flex-direction: column;
  width: auto;
  height: 10%;

  &:hover {    
    color: lightgray;
    cursor: pointer;
  }
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
background: #1C6EA4; }
&:active {
background: #144E75; }
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
};

const RecomendationCard: React.FC<RecomendationCardProps> = ({ artworkData, selected, onCardSelected }) => {
    return (
        <ArtworkGrid>
            <ArtContainer>
                <ArtworkRecomendation
                    onArtworkSelected={onCardSelected}
                    artworkData={artworkData}
                    flipped={!selected}
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
                <AddIcon>Add Item</AddIcon>
            </GoBottom>
        </ArtworkGrid>
    );
}

export default RecomendationCard;