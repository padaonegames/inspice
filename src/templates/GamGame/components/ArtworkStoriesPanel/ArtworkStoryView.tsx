import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { StoriesContext } from './StoriesContext';
import { Cross } from '@styled-icons/entypo/Cross';
import ArtworkDecorationPanel from './ArtworkDecorationPanel';
import ContainerCard from '../../../../components/Forms/Cards/ContainerCard';

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
      <>No story found.</>
    );
  }

  return (
    <ContainerCard upperDecorator>
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
    </ContainerCard>
  );
};

export default ArtworkStoryView;