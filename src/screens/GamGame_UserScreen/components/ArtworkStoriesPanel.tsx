import styled from 'styled-components';
import { Image } from '@styled-icons/ionicons-solid/Image';
import { GamGameStoryDefinition } from '../../../services/gamGameActivity.model';
import StoryListDisplay from './StoryListDisplay';
import { ArtworkData } from '../../../services/artwork.model';
import { useParams, useNavigate } from 'react-router-dom';

const Root = styled.div`
  display: flex;
  
  @media (max-width: 768px) {
    width: 100%;
    align-self: center;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    padding: 16px;
    width: 85%;
    max-width: 1200px;
    align-items: left;
    margin-bottom: 15px;
    padding: 0;
    flex-direction: row;
  }

  background-color: ${props => props.theme.cardBackground};
`;

const UpperPanel = styled.div`
  display: flex;
  flex-direction: row;
`;

const MainInfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const DetailsPanel = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  color: ${props => props.theme.textColor};
  text-align: center;
  font-size: 0.65em;
  font-weight: 400;
  letter-spacing: +1px;
  font-family: 'EB Garamond';
  text-transform: uppercase;
  cursor: pointer;
`;

const DetailsIcon = styled(Image)`
  color: ${props => props.theme.textColor};
  width : 28px;
  height: 28px;
  margin-bottom: 5px;
`;

const SelectionPanel = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 550px;
  margin: 0;

  @media (max-width: 768px) {
    width: 100%;
    padding: 3%;
  }

  @media (min-width: 768px) {
    width: 50%;
    padding: 1.5%;
    padding-top: 3%;
  }
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

export interface ArtworkStoriesPanelProps {
  artworks: ArtworkData[];
  stories: GamGameStoryDefinition[];
  onDetailsClicked?: () => void;
};

export const ArtworkStoriesPanel = (props: ArtworkStoriesPanelProps): JSX.Element => {

  const { artworks, stories } = props;
  const { artworkId } = useParams();
  const navigate = useNavigate();

  const artworkData = artworks.find(elem => elem.id === artworkId);

  if (!artworkData) {
    return (
      <Root>
        No artwork found.
      </Root>
    );
  }

  return (
    <Root>
      <SelectionPanel>
        <UpperPanel>
          <MainInfoPanel>
            <ArtworkTitle>
              {artworkData.title}
            </ArtworkTitle>
            <ArtworkAuthor>
              {artworkData.author}
            </ArtworkAuthor>
            <ArtworkDate>
              {artworkData.date}
            </ArtworkDate>
          </MainInfoPanel>
          <DetailsPanel>
            <DetailsIcon onClick={() => navigate('../detail')} />
            Details
          </DetailsPanel>
        </UpperPanel>

        <ArtworkListDottedLine />
        
        <ArtworkDataContainer>
          {stories.map(elem => (
            <StoryListDisplay
              storyData={elem}
              artworkData={artworkData}
            />
          ))}
        </ArtworkDataContainer>
      </SelectionPanel>
    </Root>

  );
};

export default ArtworkStoriesPanel;