import React from 'react';
import styled from 'styled-components';
import { useAsyncRequest } from '../services/useAsyncRequest';
import { viewpointsArtworksService } from '../services';
import { useNavigate } from 'react-router-dom';
import lineBackground from './../components/line-header-point.png';
import ArtworksComponent from '../Viewpoints/ArtworksComponent';
import ImmaLogo from '../assets/img/IMMA30_LOGO_RGB_small.png';
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
  text-align: center;
  line-height: 1.5;
  background-color: ${props => props.theme.cardBackground};
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  padding: 15px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (min-width: 768px) {
    width: 57.5%;
  }
`;

const ClickableText = styled.p`
  max-width: 1200px;
  align-self: left;
  margin-left: 5%;
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

const LogoImage = styled.img`
  background-color: white;
  margin-bottom: 35px;
  border: 1px solid #e5e5e5;
  cursor: pointer;
  width: 80%;
  height: auto;

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  }
`;

const HomeComponent: React.FC = () => {

  let navigate = useNavigate();

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
      <LogoImage src={ImmaLogo} onClick={() => window.open('https://imma.ie/')} />
      <LeadText>
        Welcome to IMMA Viewpoints. Find out more about IMMA artworks.
        How do IMMA artworks make you think? How do they make other people think?
      </LeadText>
      <VerticalSeparator />
      <ContentCard cardTitle='Find out more'>
        <CardExplanatoryText>
          Find out more about IMMA artworks. Share your own responses to
          IMMA artworks and view the responses of others.
        </CardExplanatoryText>
        <CardExplanatoryText>
          Below are some of the artworks in the grounds of IMMA. When you find one of the artworks tap on
          its image below. You will be given some new information about the artwork. You will then be asked a question
          about your response to the artwork. There are no right or wrong answers.
        </CardExplanatoryText>
        <CardExplanatoryText>
          By taking part you give IMMA permission to share any of your responses anonymously on the public display
          in the convivial space and online, including social media. There is a link to the public display
          in the Other People section of this page. But first, seek out the artworks below.
        </CardExplanatoryText>
      </ContentCard>
      <VerticalSeparator />
      <ContentCard cardTitle='Take Part'>
        <CardExplanatoryText>
          When you find one of the artworks below in the IMMA grounds, tap on its image. Find out more
          about the artwork, read a description and answer a question. There are no right
          or wrong answers.
        </CardExplanatoryText>

        <ArtworksComponent
          artworks={artworks}
          onArtworkClicked={(id) => navigate(`/viewpoints/consumer/answer/${id}`)}
        />
      </ContentCard>
      <VerticalSeparator />
      <ContentCard cardTitle='Other People'>
        <ClickableText onClick={() => navigate('/viewpoints/consumer/results')}>Find out how others have responded to these artworks.</ClickableText>
      </ContentCard>
    </Root>
  );
}

export default HomeComponent;