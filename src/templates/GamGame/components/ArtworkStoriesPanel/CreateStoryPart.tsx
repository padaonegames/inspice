import styled from 'styled-components';
import { useState } from 'react';
import { Emoji, GamGameStoryPart, StoryPartEmoji, StoryPartTag } from '../../../../services/gamGameActivity.model';
import { ArtworkDecorationPanel } from './ArtworkDecorationPanel';
import { Position } from './Draggable';
import { Cross } from '@styled-icons/entypo/Cross';
import { ArtworkAuthor, ArtworkTitle, InputArea } from '../generalStyles';
import ContainerCard from '../../../../components/Forms/Cards/ContainerCard';
import { ArtworkData } from '../../../../services/artwork.model';

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

  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 0.5rem 0px;
  }
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

interface CreateStoryPartProps {
  /** Artwork over which the current part will talk about */
  artwork: ArtworkData;
  /** Callback to parent that will be triggered when the user clicks on Done with a valid part definition (passed as part param) */
  onSubmitPart?: (part: GamGameStoryPart) => void;
  /** Callback to parent specifying that the user wishes to give up on this story */
  onQuit?: () => void;
};

export const CreateStoryPart = (props: CreateStoryPartProps): JSX.Element => {

  const {
    artwork,
    onSubmitPart,
    onQuit
  } = props;

  const templates = ['It makes me think about', 'It reminds me of', 'It makes me feel'] as const;
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[number]>('It makes me think about');
  const [text, setText] = useState<string>('');
  const [emojis, setEmojis] = useState<StoryPartEmoji[]>([]);
  const [tags, setTags] = useState<StoryPartTag[]>([]);

  const handleSubmitPart = () => {
    if (text.length === 0 || !onSubmitPart) return;

    const part: GamGameStoryPart = {
      artworkId: artwork.id,
      multimediaData: {
        text,
        emojis,
        tags,
        textTemplate: selectedTemplate
      }
    };

    onSubmitPart(part);
  };

  const handleAddEmoji = (emoji: Emoji) => {
    setEmojis(prev => ([
      ...prev,
      {
        locationX: 0.375,
        locationY: 0.3,
        emoji
      }
    ]));
  };

  const handleAddTag = (tag: string) => {
    setTags(prev => ([
      ...prev,
      {
        locationX: 0.375,
        locationY: 0.3,
        tag
      }
    ]));
  };

  const handleMoveEmoji = (index: number, pos: Position) => {
    setEmojis(prev => {
      let copy: StoryPartEmoji[] = JSON.parse(JSON.stringify(prev));
      if (index >= 0 && index < copy.length) {
        copy[index].locationX = pos.x;
        copy[index].locationY = pos.y;
      }
      return copy;
    });
  };

  const handleMoveTag = (index: number, pos: Position) => {
    setTags(prev => {
      let copy: StoryPartTag[] = JSON.parse(JSON.stringify(prev));
      if (index >= 0 && index < tags.length) {
        tags[index].locationX = pos.x;
        tags[index].locationY = pos.y;
      }
      return copy;
    });
  };

  return (
    <ContainerCard upperDecorator>
      <SelectionPanel>
        <HeaderRow>
          <QuitIcon onClick={onQuit} />
          <SubmitStoryButton
            onClick={handleSubmitPart}
            enabled={text.length > 0}
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
            value={`${selectedTemplate}... ${text}`}
            onChange={(e) => setText(e.target.value.slice(selectedTemplate.length + 4))}
            rows={4}
          />
        </StoryDataContainer>

        <ArtworkDecorationPanel
          artworkSrc={artwork.src}
          emojis={emojis}
          tags={tags}
          onAddEmoji={handleAddEmoji}
          onMoveEmoji={handleMoveEmoji}
          onAddTag={handleAddTag}
          onMoveTag={handleMoveTag}
        />
      </SelectionPanel>
    </ContainerCard>

  );
};

export default CreateStoryPart;