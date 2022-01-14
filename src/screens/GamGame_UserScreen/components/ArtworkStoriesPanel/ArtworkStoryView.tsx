import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { StoriesContext } from './StoriesContext';
import { Cross } from '@styled-icons/entypo/Cross';
import ArtworkDecorationPanel from './ArtworkDecorationPanel';

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
  align-items: center;
  width: 80%;
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

const StoryListDottedLine = styled.div`
  height: 0.5vh;
  width: 100%;
  border-style: dotted;
  border-color: lightgray;
  border-width: 0px 0px 1px 0px;
  margin-bottom: 5px;
`;

const StoryDataContainer = styled.div`
  margin-bottom: 5px;
  overflow-y: scroll;
  height: auto;
`;

const StoryDescription = styled.p`
  font-weight: 400;
  line-height: 1.5;
  transition: color 0.5s ease;
  margin: auto 0 auto 0;
  word-wrap: break-word;
  padding: 5px 15px;
`;

const StoryTitle = styled.p`
  font-size: 1.25em;
  font-weight: 500;
  font-style: italic;
  letter-spacing: +0.5px;
  margin-bottom: 5px;
`;

const StoryAuthor = styled.p`
  font-weight: 700;
  font-style: bold;
  letter-spacing: +0.5px;
  margin-bottom: 5px;
`;

interface StoryDisplayProps {
  backgroundImage: string;
};

const StoryDisplay = styled.div<StoryDisplayProps>`

  @media (max-width: 768px) {
    width: 100vw;
    height: 100vw;
    object-fit: contain;
    margin-bottom: 3vh;
  }

  @media (min-width: 768px) {
    width: 50%;
  }

  position: relative;

  background-image: ${props => `url(${props.backgroundImage})`};
  overflow: hidden;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-color: ${props => props.theme.artworkDisplayBackground};
`;

interface StoryEmojiProps {
  locX: number;
  locY: number;
}
const StoryEmojiContainer = styled.div<StoryEmojiProps>`
  position: absolute;
  z-index: 1;
  left: ${props => props.locX * 100}%;
  top: ${props => props.locY * 100}%;
`;

const StoryEmoji = styled.span`
  font-size: 50px;
  margin: auto;
`;

const StoryTag = styled.span`
  -webkit-text-stroke: 1px black;
  font-size: 35px;
  font-weight: 800;
  font-family: Verdana, sans-serif;
  margin: auto;
  color: white;
`;

const QuitIcon = styled(Cross)`
  color: ${props => props.theme.textColor};
  height: 28px;
  width: 35px;
  cursor: pointer;
  margin-right: 10px;
  align-self: center;
`;

export const ArtworkStoryView = (): JSX.Element => {

  const { stories, artwork } = useContext(StoriesContext);
  const { storyId } = useParams();
  const navigate = useNavigate();

  const storyData = stories.find(elem => elem._id === storyId);

  console.log(stories)

  if (!storyData) {
    return (
      <Root>
        No story found.
      </Root>
    );
  }

  return (
    <Root>
      <SelectionPanel>
        <UpperPanel>
          <QuitIcon onClick={() => navigate('..')} />
          <MainInfoPanel>
            <StoryTitle>
              {storyData.GamGameStoryTitle}
            </StoryTitle>
            <StoryAuthor>
              {storyData.GamGameStoryAuthor}
            </StoryAuthor>
          </MainInfoPanel>
        </UpperPanel>

        <StoryListDottedLine />
        <StoryDataContainer>
          {storyData.multimediaData.text && (
            <StoryDescription>
              {storyData.multimediaData.text}
            </StoryDescription>
          )}
        </StoryDataContainer>
      </SelectionPanel>
      <ArtworkDecorationPanel
        editEnabled={false}
        artworkSrc={artwork.src}
        emojis={storyData.multimediaData.emojis ?? []}
        tags={storyData.multimediaData.tags ?? []}
      />
    </Root>

  );
};

export default ArtworkStoryView;