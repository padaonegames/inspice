import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { StoriesContext } from './StoriesContext';
import { CompletedGamGameStoryDefinition, Emoji, InProgressGamGameStoryDefinition } from '../../../../services/gamGameActivity.model';
import { GamGameActivityContext } from '../../UserPerspective/Screen';
import { ArtworkDecorationPanel } from './ArtworkDecorationPanel';
import { Position } from './Draggable';
import { Cross } from '@styled-icons/entypo/Cross';
import { useAsyncRequest } from '../../../../services/useAsyncRequest';
import { gamGameApi } from '../../../../services';
import { ArtworkAuthor, ArtworkTitle, InputArea } from '../generalStyles';
import ContainerCard from '../../../../components/Forms/Cards/ContainerCard';

const UpperPanel = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%
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
  margin: 0;
  width: 100%;

  @media (min-width: 768px) {
    padding: 0.5em;
  }
`;

const StoryListDottedLine = styled.div`
  height: 0.5em;
  width: 97.5%;
  align-self: center;
  border-style: dotted;
  border-color: lightgray;
  border-width: 0px 0px 1px 0px;
  margin-bottom: 0.5em;
`;

const StoryDataContainer = styled.div`
  margin-bottom: 0.5em;
  height: auto;
  padding: 1em;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 12px;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0 5px 0;
`;

const QuitIcon = styled(Cross)`
  color: ${props => props.theme.textColor};
  height: 1.5em;
  width: 1.2em;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

interface SubmitStoryButtonProps {
  enabled?: boolean;
}
const SubmitStoryButton = styled.button<SubmitStoryButtonProps>`
  border-radius: 15px;
  background-color: ${props => props.enabled ? 'rgb(196, 76, 73)' : 'rgba(196, 76, 73, 0.5)'};
  color: ${props => props.enabled ? 'white' : 'rgb(230, 230, 230)'};
  font-weight: 700;
  padding: 6px 10px;
  cursor: ${props => props.enabled ? 'pointer' : 'default'};
`;

const TemplateRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface TemplateSelectorProps {
  enabled?: boolean;
}
const TemplateSelector = styled.button<TemplateSelectorProps>`
  border-radius: 15px;
  background-color: ${props => props.enabled ? 'rgb(196, 76, 73)' : 'rgba(196, 76, 73, 0.5)'};
  color: ${props => props.enabled ? 'white' : 'rgb(230, 230, 230)'};
  font-weight: 500;
  font-size: 0.8em;
  padding: 0.5em 1em;
  margin: 0 0.2em;
  max-width: 33%;
  height: 3.25em;
  cursor: ${props => props.enabled ? 'default' : 'pointer'};

  &:hover {
    background-color: ${props => props.enabled ? 'rgb(196, 76, 73)' : 'rgba(196, 76, 73, 0.85)'};
    color: white;
  }
`;

export const CreateArtworkStory = (): JSX.Element => {

  const { artwork } = useContext(StoriesContext);
  const { activity } = useContext(GamGameActivityContext);
  const navigate = useNavigate();

  const templates = ['It makes me think about', 'It reminds me of', 'It makes me feel'] as const;
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[number]>('It makes me think about');

  const [storyDefinition, setStoryDefinition] = useState<InProgressGamGameStoryDefinition>({
    GamGameStoryAuthor: '',
    GamGameStoryTitle: '',
    activityId: activity._id,
    artworkId: artwork.id,
    multimediaData: {}
  });

  const [triggerSubmitStory, setTriggerSubmitStory] = useState<boolean>(false);

  const handleSubmitStory = async () => {
    if (!canSubmitStory() || !triggerSubmitStory) return Promise.reject();

    const completedStory = storyDefinition as CompletedGamGameStoryDefinition
    return gamGameApi.submitGamGameStoryDefinition(completedStory);
  };

  const canSubmitStory = () => {
    return !!storyDefinition.GamGameStoryAuthor && storyDefinition.GamGameStoryAuthor.length > 0 &&
      !!storyDefinition.GamGameStoryTitle && storyDefinition.GamGameStoryTitle.length > 0 &&
      !!storyDefinition.multimediaData?.text && storyDefinition.multimediaData.text.length > 0;
  }

  const [submitStoryRequest] = useAsyncRequest(handleSubmitStory, [triggerSubmitStory]);

  useEffect(() => {
    if (submitStoryRequest.kind === 'success') {
      window.confirm('Story uploaded succesfully');
      navigate(-1);
    }
  }, [submitStoryRequest, navigate]);

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
      console.log(copy, pos)
      return copy;
    });
  };

  const handleMoveTag = (index: number, pos: Position) => {
    setStoryDefinition(prev => {
      let copy: InProgressGamGameStoryDefinition = JSON.parse(JSON.stringify(prev));
      if (copy.multimediaData?.tags && index >= 0 && index < copy.multimediaData.tags.length) {
        copy.multimediaData.tags[index].locationX = pos.x;
        copy.multimediaData.tags[index].locationY = pos.y;
        console.log(copy, pos)
      }
      return copy;
    });
  };

  return (
    <ContainerCard upperDecorator>
      <SelectionPanel>
        <HeaderRow>
          <QuitIcon onClick={() => navigate(-1)} />
          <SubmitStoryButton
            onClick={() => {
              if (submitStoryRequest.kind !== 'running' && !triggerSubmitStory) {
                setTriggerSubmitStory(true);
              }
            }}
            enabled={canSubmitStory()}
          >
            Done
          </SubmitStoryButton>
        </HeaderRow>

        <StoryListDottedLine />

        <StoryDataContainer>
          <UpperPanel>
            <MainInfoPanel>
              <ArtworkTitle>{artwork.title}</ArtworkTitle>
              <ArtworkAuthor>{artwork.author}</ArtworkAuthor>
            </MainInfoPanel>
          </UpperPanel>

          <StoryListDottedLine />

          <TemplateRow>
            {templates.map(elem =>
              <TemplateSelector
                enabled={elem === selectedTemplate}
                onClick={() => setSelectedTemplate(elem)}
              >
                {elem}...
              </TemplateSelector>
            )}
          </TemplateRow>

          <StoryListDottedLine />

          <InputArea
            placeholder='Write your story text here...'
            value={`${selectedTemplate}... ${storyDefinition.multimediaData?.text ?? ''}`}
            onChange={(e) => setStoryDefinition(prev => ({
              ...prev,
              multimediaData: { ...prev.multimediaData, text: e.target.value.slice(selectedTemplate.length + 4) }
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
    </ContainerCard>

  );
};

export default CreateArtworkStory;