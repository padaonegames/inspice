import React from 'react';
import styled from 'styled-components';
import { Artwork } from '../services/viewpointsArtwork.model';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${props => props.theme.cardBackground};

  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  padding: 16px;
  width: 85%;
  max-width: 1200px;
  align-items: left;
  margin-bottom: 15px;
  padding: 0;
`;

const SelectionPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  max-height: 550px;
  margin: 0;
  padding: 1.5%;
  padding-top: 3%;
`;

const ArtworkListDottedLine = styled.div`
  height: 0.5vh;
  width: 100%;
  border-style: dotted;
  border-color: lightgray;
  border-width: 0px 0px 1px 0px;
  margin-bottom: 2.5%;
`;


const ArtworkDataContainer = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  overflow-y: scroll;
  height: auto;
`;

const ArtworkDescription = styled.div`
  font-weight: 400;
  line-height: 1.5;
  transition: color 0.5s ease;
  margin: auto 0 auto 0;
  word-wrap: break-word;
  padding-right: 15px;
`;

const ArtworkTitle = styled.p`
  font-size: 1.25em;
  font-weight: 500;
  font-style: italic;
  letter-spacing: +0.5px;
  margin-bottom: 5px;
`;

const ArtworkAuthor = styled.p`
  font-weight: 700;
  font-style: bold;
  letter-spacing: +0.5px;
  margin-bottom: 5px;
`;

const ArtworkDate = styled.p`
  letter-spacing: +0.5px;
  margin-bottom: 5px;
`;

const ArtworkNotes = styled.p`
  font-size: 0.9em;
  font-weight: 400;
  font-style: italic;
`;

interface ArtworkDisplayProps {
  backgroundImage: string;
};

const ArtworkDisplay = styled.div<ArtworkDisplayProps>`
  width: 50%;
  background-image: ${props => `url(${props.backgroundImage})`};
  overflow: hidden;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-color: ${props => props.theme.artworkDisplayBackground};
`;

const ClickableText = styled.p`
  font-size: 0.9em;
  font-weight: 400;
  color: ${props => props.theme.clickableTextFontColor};
  margin-bottom: 15px;
  margin-top: 5px;
  text-decoration: underline;
  cursor: pointer;
`;

interface ArtworkDetailProps {
  artworkData: Artwork;
};

const ArtworkDetail: React.FC<ArtworkDetailProps> = ({ artworkData }) => {

  return (
    <Root>
      <SelectionPanel>
        <ArtworkTitle>
          {artworkData.name}
        </ArtworkTitle>
        <ArtworkAuthor>
          {artworkData.artist}
        </ArtworkAuthor>
        <ArtworkDate>
          {artworkData.date}
        </ArtworkDate>
        <ArtworkListDottedLine />
        <audio controls>
          <source src={`${process.env.PUBLIC_URL}/audio/${artworkData.audio}`} type='audio/mp4' />
          Your browser does not support audio.
        </audio>
        <ArtworkDataContainer>
          <ArtworkDescription dangerouslySetInnerHTML={{ __html: artworkData.description }} />
        </ArtworkDataContainer>
        <ArtworkNotes>
          {artworkData.notes}
        </ArtworkNotes>
        <ClickableText onClick={() => window.open(artworkData.URL)}>
          Find this work in the IMMA Collection
        </ClickableText>
      </SelectionPanel>
      <ArtworkDisplay
        backgroundImage={`https://spice.kmi.open.ac.uk/demos/imma_api/main.php?action=artworkimage&filename=${artworkData.image}`}
      />
    </Root>

  );
};

export default ArtworkDetail;