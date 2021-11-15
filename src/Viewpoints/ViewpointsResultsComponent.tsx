import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAsyncRequest } from '../services/useAsyncRequest';
import { viewpointsArtworksService, viewpointsResponseService } from '../services';
import lineBackground from './../components/line-header-point.png';
import { LoaderCircle } from '@styled-icons/boxicons-regular/LoaderCircle';
import { Response } from '../services/viewpointsResponse.model';
import { Artwork } from '../services/viewpointsArtwork.model';
import ArtworksComponent from './ArtworksComponent';
import ResponsesPopup from './ResponsesPopUp';
import ContentCard, { CardExplanatoryText } from '../components/Layout/ContentCard';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 35px;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
`;

const VerticalSeparator = styled.div`
  width: 85%;
  max-width: 960px;
  height: 1px;
  background: url(${lineBackground}) repeat-x 0 center;
  margin-bottom: 25px;
  margin-top: 25px;
`;

const LeadText = styled.h3`
  align-self: center;
  letter-spacing: +0.5px;
  font-family: Raleway;
  font-weight: 500;
  width: 57.5%;
  text-align: center;
  line-height: 1.5;
  background-color: ${props => props.theme.cardBackground};
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  padding: 15px;
  margin-bottom: 15px;
`;

const ClickableText = styled.span`
  max-width: 1200px;
  align-self: left;
  text-align: justify;
  color: ${props => props.theme.clickableTextFontColor};
  letter-spacing: +0.2px;
  line-height: 25px;
  margin-bottom: 25px;
  text-decoration: underline;
  cursor: pointer;
  b {
    font-weight: 700;
  }
`;

const LoadingIndicator = styled.div`
  margin: 15px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 180px;
  font-size: 1em;
  align-items: center;
  letter-spacing: +0.5px;
  font-family: Raleway;
  color: #3f3c2d;
`;

const SpinAnimation = keyframes`
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
`;

const LoadingIcon = styled(LoaderCircle)`
  color: #3f3c2d;
  height: 35px;
  width: auto;

  animation: ${SpinAnimation} 2s linear infinite;
`;

export interface ArtworkResponses {
  artwork: Artwork;
  responses: Response[];
};

const randomCommentCount = 5;
const recentArtworkCount = 10;

const ViewpointsResultsComponent: React.FC = () => {

  const [selectedArtwork, setSelectedArtwork] = useState<string | undefined>(undefined);

  const fetchArtworks = async () => {
    return await viewpointsArtworksService.fetchArtworks();
  };

  const fetchResponses = async () => {
    return await viewpointsResponseService.getApprovedResponses();
  };

  const [fetchArtworksStatus] = useAsyncRequest(fetchArtworks, []);
  const [fetchResponsesStatus] = useAsyncRequest(fetchResponses, []);

  if (!(fetchArtworksStatus.kind === 'success' && fetchArtworksStatus.result.kind === 'ok')) {
    return <p>Fetching artworks...</p>;
  }

  if (!(fetchResponsesStatus.kind === 'success' && fetchResponsesStatus.result.kind === 'ok')) {
    return <p>Fetching responses...</p>;
  }

  const artworks = fetchArtworksStatus.result.data;
  const responses = fetchResponsesStatus.result.data.sort((a, b) => (new Date(b.datetimeSubmitted).getTime() - new Date(a.datetimeSubmitted).getTime()));

  let responsesByArtwork: ArtworkResponses[] = [];

  const generateResponsesByArtwork = () => {
    for (const artwork of artworks) {
      responsesByArtwork.push({ artwork, responses: responses.filter(resp => resp.artworkID === artwork._id) });
    }
  };

  generateResponsesByArtwork();

  return (
    <Root>
      <LeadText>
        Find out how others have responded to IMMA artworks.
      </LeadText>
      <VerticalSeparator />
      <ContentCard>
        <CardExplanatoryText>
          A selection of responses to these artworks are listed below. Read a selection of randomly chosen responses and
          see if you can guess which artworks they relate to, or take a look at some of the recent responses given for each artwork. Do you
          agree with them?
        </CardExplanatoryText>
        <CardExplanatoryText>
          Follow <ClickableText onClick={() => window.open('https://twitter.com/ImmaViewpoints')}>@IMMAViewpoints</ClickableText> on Twitter to keep track of the responses of others.
        </CardExplanatoryText>
      </ContentCard>
      {/*(artworksLoading || responsesLoading) &&
        <LoadingIndicator>
          Loading data...
          <LoadingIcon />
      </LoadingIndicator> */}
      <VerticalSeparator />
      <ContentCard cardTitle='Recent responses'>
        {/* <ResponsesAccordion responsesByArtwork={responsesByArtwork}/> */}
        <ArtworksComponent
          artworks={artworks}
          onArtworkClicked={(id) => setSelectedArtwork(id)}
        />
      </ContentCard>
      <VerticalSeparator />
      {selectedArtwork &&
        <ResponsesPopup
          responses={responsesByArtwork.find(elem => elem.artwork._id === selectedArtwork)?.responses || []}
          togglePopup={() => setSelectedArtwork(undefined)}
        />
      }
    </Root>
  );
}

export default ViewpointsResultsComponent;