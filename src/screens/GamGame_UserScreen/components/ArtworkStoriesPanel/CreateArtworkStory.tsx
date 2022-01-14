import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { StoriesContext } from './StoriesContext';
import { Emoji, InProgressGamGameStoryDefinition } from '../../../../services/gamGameActivity.model';
import { ArtworksContext } from '../../MenuScreen';
import { ArtworkDecorationPanel } from './ArtworkDecorationPanel';
import { Position } from './Draggable';

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
  width: 100%;
  margin-bottom: 10px;
`;

const SelectionPanel = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 550px;
  margin: 0;

  @media (max-width: 768px) {
    width: 100%;
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
  margin-bottom: 2.5%;
`;

const StoryDataContainer = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  overflow-y: scroll;
  height: auto;
  padding: 3%;
  padding-top: 1%;
`;

const StoryDescription = styled.textarea`
  font-weight: 400;
  line-height: 1.2;
  transition: color 0.5s ease;
  margin: auto 0 auto 0;
  word-wrap: break-word;
  padding: 5px 15px;
  width: 100%;
`;

const StoryTitle = styled.input`
  font-size: 1.25em;
  font-weight: 500;
  font-style: italic;
  letter-spacing: +0.5px;
  margin-bottom: 5px;
  padding: 5px 15px;
  width: 100%;
`;

const StoryAuthor = styled.input`
  font-weight: 700;
  font-style: bold;
  letter-spacing: +0.5px;
  margin-bottom: 5px;
  padding: 5px 15px;
  width: 100%;
`;

export const CreateArtworkStory = (): JSX.Element => {

  const { artwork } = useContext(StoriesContext);
  const { activity } = useContext(ArtworksContext);
  const navigate = useNavigate();

  const [storyDefinition, setStoryDefinition] = useState<InProgressGamGameStoryDefinition>({
    GamGameStoryAuthor: '',
    GamGameStoryTitle: '',
    activityId: activity._id,
    artworkId: artwork.id,
    multimediaData: {}
  });

  const handleAddEmoji = (emoji: Emoji) => {
    setStoryDefinition(prev => ({
      ...prev,
      multimediaData: {
        ...prev.multimediaData,
        emojis: [
          ...prev.multimediaData?.emojis ?? [],
          {
            locationX: 0.375,
            locationY: 0.3,
            emoji
          }
        ]
      }
    }));
  };

  const handleAddTag = (tag: string) => {
    setStoryDefinition(prev => ({
      ...prev,
      multimediaData: {
        ...prev.multimediaData,
        tags: [
          ...prev.multimediaData?.tags ?? [],
          {
            locationX: 0.375,
            locationY: 0.3,
            tag
          }
        ]
      }
    }));
  };

  const handleMoveEmoji = (index: number, pos: Position) => {
    setStoryDefinition(prev => {
      let copy: InProgressGamGameStoryDefinition = JSON.parse(JSON.stringify(prev));
      if (copy.multimediaData?.emojis && index >= 0 && index < copy.multimediaData.emojis.length) {
        copy.multimediaData.emojis[index].locationX = pos.x;
        copy.multimediaData.emojis[index].locationY = pos.y;
      }
      return copy;
    });
  };

  const handleMoveTag = (index: number, pos: Position) => {
    setStoryDefinition(prev => {
      let copy: InProgressGamGameStoryDefinition = JSON.parse(JSON.stringify(prev));
      if (copy.multimediaData?.tags && index >= 0 && index < copy.multimediaData.tags.length) {
        copy.multimediaData.tags[index].locationX = pos.x;
        copy.multimediaData.tags[index].locationY = pos.y;
      }
      return copy;
    });
  };

  return (
    <Root>
      <SelectionPanel>
        <StoryDataContainer>
          <UpperPanel>
            <MainInfoPanel>
              <StoryTitle
                value={storyDefinition.GamGameStoryTitle}
                placeholder='Enter a title for your story...'
                onChange={(e) => setStoryDefinition(prev => ({ ...prev, GamGameStoryTitle: e.target.value }))}
                maxLength={25}
              />
              <StoryAuthor
                value={storyDefinition.GamGameStoryAuthor}
                placeholder='Enter your name or nickname...'
                onChange={(e) => setStoryDefinition(prev => ({ ...prev, GamGameStoryAuthor: e.target.value }))}
                maxLength={25}
              />
            </MainInfoPanel>
          </UpperPanel>

          <StoryListDottedLine />

          <StoryDescription
            placeholder='Write your story text here...'
            value={storyDefinition.multimediaData?.text || ''}
            onChange={(e) => setStoryDefinition(prev => ({
              ...prev,
              multimediaData: { ...prev.multimediaData, text: e.target.value }
            }))}
            rows={4}
          />
        </StoryDataContainer>

        <ArtworkDecorationPanel
          artworkSrc={artwork.src}
          emojis={storyDefinition.multimediaData?.emojis ?? []}
          tags={storyDefinition.multimediaData?.tags ?? []}
          onAddEmoji={handleAddEmoji}
          onMoveEmoji={handleMoveEmoji}
          onAddTag={handleAddTag}
          onMoveTag={handleMoveTag}
        />
      </SelectionPanel>

    </Root>

  );
};

export default CreateArtworkStory;