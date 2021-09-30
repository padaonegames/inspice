import React from 'react';
import styled from 'styled-components';
import { Artwork } from '../services/viewpointsArtwork.model';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;

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
  background-color: rgba(15, 15, 15, 0.75);
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
  font-size: 1em;
  font-weight: 400;
  line-height: 1.5;
  font-family: Raleway;
  color: white;
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
  font-family: Raleway;
  color: white;
`;

const ArtworkAuthor = styled.p`
  font-size: 1em;
  font-weight: 700;
  font-style: bold;
  letter-spacing: +0.5px;
  font-family: Raleway;
  color: white;
`;

const ArtworkDate = styled.p`
  font-size: 1em;
  letter-spacing: +0.5px;
  font-family: Raleway;
  color: white;
`;

const ArtworkNotes = styled.p`
  font-size: 0.9em;
  font-weight: 400;
  font-style: italic;
  font-family: Raleway;
  color: white;
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
  background-color: black;
`;

const ClickableText = styled.p`
  font-size: 0.9em;
  font-weight: 400;
  font-family: Raleway;
  color: #FFFF00;
  margin-bottom: 15px;
  text-decoration: underline;
  cursor: pointer;
`;

interface ArtworkDetailProps {
  artworkData: Artwork;
  theme?: 'dark' | 'light';
};

const ArtworkDetail: React.FC<ArtworkDetailProps> = ({ artworkData, theme = 'dark' }) => {

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
          <source src={`/audio/${artworkData.audio}`} type='audio/mp4' />
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

/*

<CardBackground>
      <CardImage
        src={`https://spice.kmi.open.ac.uk/demos/imma_api/main.php?action=artworkimage&filename=${artworkData.image}`}
        alt={artworkData.image}
      />
      <NameText>
        {artworkData.name}
      </NameText>
      <InformationText>
        {artworkData.artist}
      </InformationText>
      <InformationText>
        {artworkData.date}
      </InformationText>
      <InformationText>
        {artworkData.imageLoc}
      </InformationText>
    </CardBackground>


<div class="row px-4">
  <div class="col">
    <div *ngIf="artwork" class="card my-3 shadow-sm rounded">
    <img src="{{'https://spice.kmi.open.ac.uk/demos/imma_api/main.php?action=artworkimage&filename=' + artwork.image}}" class="card-img-top" alt="{{artwork.name}}">
      <div class="card-body">
        <h5 class="card-title fst-italic">{{ artwork.name }}</h5>
        <p>
          <span class="fw-bold">{{ artwork.artist }}</span><br />
          <span>{{ artwork.date }}</span>
        </p>
        <audio controls style="width: 100%">
          <source src="assets/audio/{{artwork.audio}}" type="audio/mp4">
          Your browser does not support audio.
        </audio>
        <p [innerHTML]="artwork.description"></p>
      <p>
        <small><em>{{ artwork.notes }}</em></small><br />
        <span *ngIf="artwork.URL">
        <a href="{{artwork.URL}}" target="_blank"> <small>Find this work in the IMMA Collection</small></a>
      </span>
    </p>
  </div>
</div>
  </div >
</div >*/