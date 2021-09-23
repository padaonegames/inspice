import React from 'react';
import styled from 'styled-components';
import { useAsyncRequest } from '../services/useAsyncRequest';
import { viewpointsArtworksService } from '../services';
import { useHistory } from 'react-router-dom';
import lineBackground from './../components/line-header-point.png'
import ArtworksComponent from '../Viewpoints/ArtworksComponent';
import ImmaLogo from '../assets/img/IMMA30_LOGO_RGB_small.png';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 35px;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
`;

const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  padding: 16px;
  background-color: white;
  width: 85%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  margin-bottom: 15px;
`;

const VerticalSeparator = styled.div`
  width: 85%;
  max-width: 960px;
  height: 1px;
  background: url(${lineBackground}) repeat-x 0 center;
  margin-bottom: 25px;
  margin-top: 25px;
`;

const TitleText = styled.h2`
  color: #3f3c2d;
  letter-spacing: +0.5px;
  font-family: Raleway;
  margin-top: 10px;
  text-transform: uppercase;
  margin-left: 7.5%;
`;

const LeadText = styled.h3`
  align-self: center;
  color: #3f3c2d;
  letter-spacing: +0.5px;
  font-family: Raleway;
  margin-bottom: 40px;
`;

const ExplanatoryText = styled.p`
  max-width: 1200px;
  width: 85%;
  align-self: center;
  text-align: justify;
  font-size: 1em;
  color: #3f3c2d;
  letter-spacing: +0.2px;
  font-family: Raleway;
  line-height: 25px;
  margin-bottom: 25px;
  b {
    font-weight: 700;
  }
`;

const ClickableText = styled.p`
  max-width: 1200px;
  align-self: left;
  margin-left: 7.5%;
  text-align: justify;
  font-size: 1em;
  color: #865600;
  letter-spacing: +0.2px;
  font-family: Raleway;
  line-height: 25px;
  margin-bottom: 25px;
  text-decoration: underline;
  cursor: pointer;
  b {
    font-weight: 700;
  }
`;

const ViewpointsScreen: React.FC = () => {

  let history = useHistory();

  const fetchArtworks = async () => {
    return await viewpointsArtworksService.fetchArtworks();
  };

  const [fetchArtworksStatus] = useAsyncRequest(fetchArtworks, []);


  if (!(fetchArtworksStatus.kind === 'success' && fetchArtworksStatus.result.kind === 'ok')) {
    return <p>Fetching artworks...</p>;
  }

  const artworks = fetchArtworksStatus.result.data;

  return (
    <Root>
      <a href="https://imma.ie/" target="_blank"><img src={ImmaLogo} /></a><br />
      <LeadText>
        Welcome to IMMA Viewpoints. Find out more about IMMA artworks.
        How do IMMA artworks make you think? How do they make other people think?
      </LeadText>
      <Card>
        <TitleText>Find Out More</TitleText>
        <ExplanatoryText>
          Find out more about IMMA artworks. Share your own responses to
          IMMA artworks and view the responses of others.
        </ExplanatoryText>
        <ExplanatoryText>
          Below are some of the artworks in the grounds of IMMA. When you find one of the artworks tap on
          its image below. You will be given some new information about the artwork. You will then be asked a question
          about your response to the artwork. There are no right or wrong answers.
        </ExplanatoryText>
        <ExplanatoryText>
          By taking part you give IMMA permission to share any of your responses anonymously on the public display
          in the convivial space and online, including social media. There is a link to the public display
          in the Other People section of this page. But first, seek out the artworks below.
        </ExplanatoryText>
      </Card>
      <VerticalSeparator />
      <Card>
        <TitleText>Take Part</TitleText>
        <ExplanatoryText>
          When you find one of the artworks below in the IMMA grounds, tap on its image. Find out more
          about the artwork, read a description and answer a question. There are no right
          or wrong answers.
        </ExplanatoryText>

        <ArtworksComponent artworks={artworks} />
      </Card>
      <VerticalSeparator />
      <Card>
        <TitleText>Other People</TitleText>
        <ClickableText onClick={() => history.push('/results')}>Find out how others have responded to these artworks.</ClickableText>
      </Card>
    </Root>
  );
}

export default ViewpointsScreen;