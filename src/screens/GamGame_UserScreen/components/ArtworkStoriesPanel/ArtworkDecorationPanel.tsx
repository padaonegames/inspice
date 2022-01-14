import styled, { css } from 'styled-components';
import { availableEmoji, Emoji, StoryEmoji, StoryTag } from '../../../../services/gamGameActivity.model';
import { Type } from '@styled-icons/bootstrap/Type';
import { Sticker } from '@styled-icons/fluentui-system-filled/Sticker';
import Draggable, { Position } from './Draggable';
import { useRef, useState } from 'react';

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

const StoryEmojiSpan = styled.span`
  font-size: 50px;
  margin: auto;
  cursor: drag;
`;

const StoryTagSpan = styled.span`
  -webkit-text-stroke: 1px black;
  font-size: 35px;
  font-weight: 800;
  font-family: Verdana, sans-serif;
  margin: auto;
  color: white;
`;

const ToolsRow = styled.div`
  position: absolute;
  width: auto;
  z-index: 9999;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 3%;
`;

const ToolContainer = styled.div`
  border-radius: 50%;
  background-color: black;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 7px;
  cursor: pointer;
`;

const ToolStyle = css`
  color: white;
  margin: auto;
  width: 65%;
  height: 65%;
`;

const StickerIcon = styled(Sticker)`
  ${ToolStyle}
  position: relative;
`;

const TypeIcon = styled(Type)`
  ${ToolStyle}
`;

const StickerSelectorContainer = styled.div`
  border-radius: 15px;
  border: 1px solid black;
  background-color: ${props => props.theme.headerBackground};
  position: absolute;
  z-index: 50;
  height: 65px;
  width: 90vw;
  top: 95%;
  right: 3vw;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  overflow-x: scroll;
  padding: 3%;
`;

const SelectionEmoji = styled.span`
  font-size: 32px;
`;

const TagTypingContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TagTypingBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 50;
`;

const TagTypingInput = styled.input`
  -webkit-text-stroke: 1px black;
  font-size: 30px;
  font-weight: 800;
  font-family: Verdana, sans-serif;
  color: white;
  background-color: transparent;
  z-index: 100;
  width: 85%;
  text-align: center;
`;

export interface ArtworkDecorationPanelProps {
  artworkSrc: string;
  emojis: StoryEmoji[];
  tags: StoryTag[];
  onAddEmoji?: (emoji: Emoji) => void;
  onAddTag?: (tag: string) => void;
  /**
   * Called with position expressed in relative terms (% of image's height and width)
   */
  onMoveEmoji?: (index: number, pos: Position) => void;
  /**
   * Called with position expressed in relative terms (% of image's height and width)
   */
  onMoveTag?: (index: number, pos: Position) => void;
}

export const ArtworkDecorationPanel = (props: ArtworkDecorationPanelProps): JSX.Element => {

  const {
    artworkSrc,
    emojis,
    tags,
    onAddEmoji,
    onAddTag,
    onMoveEmoji,
    onMoveTag
  } = props;

  const [stickersOpen, setStickersOpen] = useState<boolean>(false);
  const [tagsOpen, setTagsOpen] = useState<boolean>(false);

  const [newTag, setNewTag] = useState<string>('');

  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleAddEmoji = (emoji: Emoji) => {
    setStickersOpen(false);
    if (onAddEmoji) {
      onAddEmoji(emoji);
    }
  };

  const handleEmojiEndDragging = (pos: Position, index: number) => {
    if (onMoveEmoji) {
      const rect = imageContainerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const relX = pos.x / rect.width;
      const relY = pos.y / rect.height;

      onMoveEmoji(index, { x: relX, y: relY });
    }
  };

  const handleCreateTag = () => {
    setTagsOpen(false);
    setNewTag('');

    if (newTag.length == 0) {
      return;
    }

    if (onAddTag) {
      onAddTag(newTag);
    }
  };

  const handleTagEndDragging = (pos: Position, index: number) => {
    if (onMoveTag) {
      const rect = imageContainerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const relX = pos.x / rect.width;
      const relY = pos.y / rect.height;

      onMoveTag(index, { x: relX, y: relY });
    }
  };

  return (
    <StoryDisplay
      ref={imageContainerRef}
      backgroundImage={artworkSrc}
    >
      <ToolsRow>
        <ToolContainer onClick={() => setTagsOpen(prev => !prev)} >
          <TypeIcon />
        </ToolContainer>
        <ToolContainer onClick={() => setStickersOpen(prev => !prev)} >
          <StickerIcon />
          {stickersOpen &&
            <StickerSelectorContainer>
              {availableEmoji.map(elem =>
                <SelectionEmoji key={elem} onClick={() => handleAddEmoji(elem)}>
                  {elem}
                </SelectionEmoji>
              )}
            </StickerSelectorContainer>
          }
        </ToolContainer>
      </ToolsRow>
      {tagsOpen &&
        <TagTypingContainer
          onKeyPress={(e) => {
            if (e.key === 'Enter')
              handleCreateTag();
          }}
        >
          <TagTypingBackground onClick={handleCreateTag} />
          <TagTypingInput
            placeholder='Enter a new tag...'
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
        </TagTypingContainer>
      }
      {emojis.map((emoji, i) => (
        <Draggable
          key={emoji.emoji + '_' + i}
          defaultPosition={{ x: emoji.locationX, y: emoji.locationY }}
          onEndDragging={(pos) => handleEmojiEndDragging(pos, i)}
          parentRef={imageContainerRef}
        >
          <StoryEmojiSpan>
            {emoji.emoji}
          </StoryEmojiSpan>
        </Draggable>
      ))}
      {tags.map((tag, i) => (
        <Draggable
          key={tag.tag + '_' + i}
          defaultPosition={{ x: tag.locationX, y: tag.locationY }}
          onEndDragging={(pos) => handleTagEndDragging(pos, i)}
          parentRef={imageContainerRef}
        >
          <StoryTagSpan>
            {tag.tag}
          </StoryTagSpan>
        </Draggable>
      ))}
    </StoryDisplay>
  );
};

export default ArtworkDecorationPanel;