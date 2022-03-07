import styled from 'styled-components';
import { useState } from 'react';
import { Emoji, GamGameStoryPart, StoryPartEmoji, StoryPartTag } from '../../../../services/gamGameActivity.model';
import { ArtworkDecorationPanel } from './ArtworkDecorationPanel';
import { Position } from './Draggable';
import { ArtworkAuthor, ArtworkListDottedLine, ArtworkTitle, InputArea, StoryDataContainer, StoryDisplayActionButton, StoryDisplayHeaderRow, StoryDisplayMainInfoPanel, StoryDisplayQuitIcon, StoryDisplaySelectionPanel, StoryDisplayUpperPanel } from '../generalStyles';
import ContainerCard from '../../../../components/Forms/Cards/ContainerCard';
import { ArtworkData } from '../../../../services/artwork.model';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation('gamGame');

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
      <StoryDisplaySelectionPanel>
        <StoryDisplayHeaderRow>
          <StoryDisplayQuitIcon onClick={onQuit} />
          <StoryDisplayActionButton
            onClick={handleSubmitPart}
            enabled={text.length > 0}
          >
            {t('done')}
          </StoryDisplayActionButton>
        </StoryDisplayHeaderRow>

        <ArtworkListDottedLine />

        <StoryDataContainer>
          <StoryDisplayUpperPanel>
            <StoryDisplayMainInfoPanel>
              <ArtworkTitle>{artwork.title}</ArtworkTitle>
              <ArtworkAuthor>{artwork.author}</ArtworkAuthor>
            </StoryDisplayMainInfoPanel>
          </StoryDisplayUpperPanel>

          <ArtworkListDottedLine />

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

          <ArtworkListDottedLine />

          <InputArea
            placeholder={t('writeYourStoryTextHere')}
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
      </StoryDisplaySelectionPanel>
    </ContainerCard>

  );
};

export default CreateStoryPart;