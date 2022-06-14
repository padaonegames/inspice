import styled, { css } from 'styled-components';
import { availableEmoji, Emoji, StoryPartEmoji, StoryPartTag } from '../../../../services/gamGameActivity.model';
import { Type } from '@styled-icons/bootstrap/Type';
import { Sticker } from '@styled-icons/fluentui-system-filled/Sticker';
import Draggable, { Position } from './Draggable';
import { useState } from 'react';
import { DetailArtworkDisplay } from '../generalStyles';
import { useTranslation } from 'react-i18next';

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
  border: 1px solid darkgray;
  background-color: ${props => props.theme.headerBackground};
  position: absolute;
  z-index: 10;
  height: 4.5em;
  @media (max-width: 768px) {
    width: 87.5vw;
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
  }

  @media (min-width: 768px) {
    width: min(87.5vw, 660px, fit-content);
    overflow-x: auto;
  }

  top: 95%;
  right: 1em;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  padding: 0 0.65em;
`;

const SelectionEmoji = styled.span`
  font-size: 2em;
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
  /** Controls if the panel can be edited. */
  editEnabled?: boolean;
  /** Path to find the source image of the artwork. */
  artworkSrc: string;
  /** Emojis shown in the panel. */
  emojis: StoryPartEmoji[];
  /** Tags shown in the panel. */
  tags: StoryPartTag[];
  /** Callback to the parent notifying when is added a new emoji. */
  onAddEmoji?: (emoji: Emoji) => void;
  /** Callback to the parent notifying when is added a new tag. */
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

/** Customizable panel where it can be added tags and emojis to an artwork piece. */
export const ArtworkDecorationPanel = (props: ArtworkDecorationPanelProps): JSX.Element => {

  const {
    editEnabled = true,
    artworkSrc,
    emojis,
    tags,
    onAddEmoji,
    onAddTag,
    onMoveEmoji,
    onMoveTag
  } = props;

  const { t } = useTranslation('gamGame');

  const [stickersOpen, setStickersOpen] = useState<boolean>(false);
  const [tagsOpen, setTagsOpen] = useState<boolean>(false);

  const [newTag, setNewTag] = useState<string>('');

  const [imageContainerRef, setImageContainerRef] = useState<HTMLDivElement | null>(null);

  const handleAddEmoji = (emoji: Emoji) => {
    setStickersOpen(false);
    if (onAddEmoji) {
      onAddEmoji(emoji);
    }
  };

  const handleEmojiEndDragging = (pos: Position, index: number) => {
    if (onMoveEmoji) {
      const rect = imageContainerRef?.getBoundingClientRect();
      if (!rect) return;

      const relX = pos.x / rect.width;
      const relY = pos.y / rect.height;

      onMoveEmoji(index, { x: relX, y: relY });
    }
  };

  const handleCreateTag = () => {
    setTagsOpen(false);
    setNewTag('');

    if (newTag.length === 0) {
      return;
    }

    if (onAddTag) {
      onAddTag(newTag);
    }
  };

  const handleTagEndDragging = (pos: Position, index: number) => {
    if (onMoveTag) {
      const rect = imageContainerRef?.getBoundingClientRect();
      if (!rect) return;

      const relX = pos.x / rect.width;
      const relY = pos.y / rect.height;

      onMoveTag(index, { x: relX, y: relY });
    }
  };

  const proportionToPixels = (dimension: 'x' | 'y', proportion: number): number | undefined => {
    const rect = imageContainerRef?.getBoundingClientRect();
    if (!rect) return undefined;
    return proportion * (dimension === 'x' ? rect.width : rect.height);
  };

  const computeDefaultPosition = (locationX: number, locationY: number): Position => {
    return { x: proportionToPixels('x', locationX) ?? 0, y: proportionToPixels('y', locationY) ?? 0 };
  };

  return (
    <DetailArtworkDisplay
      ref={newRef => setImageContainerRef(newRef)}
      backgroundImage={artworkSrc}
    >
      {editEnabled && (
        <ToolsRow>
          <ToolContainer onClick={() => setTagsOpen(prev => !stickersOpen && !prev)} >
            <TypeIcon />
          </ToolContainer>
          <ToolContainer onClick={() => setStickersOpen(prev => !tagsOpen && !prev)} >
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
      )}
      {editEnabled && tagsOpen &&
        <TagTypingContainer
          onKeyPress={(e) => {
            if (e.key === 'Enter')
              handleCreateTag();
          }}
        >
          <TagTypingBackground onClick={handleCreateTag} />
          <TagTypingInput
            placeholder={`${t('enterNewTag')}...`}
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
        </TagTypingContainer>
      }
      {imageContainerRef && emojis.map((emoji, i) => (
        <Draggable
          canDrag={editEnabled}
          key={emoji.emoji + '_' + i}
          defaultPosition={computeDefaultPosition(emoji.locationX, emoji.locationY)}
          onEndDragging={(pos) => handleEmojiEndDragging(pos, i)}
          parentRef={imageContainerRef}
        >
          <StoryEmojiSpan>
            {emoji.emoji}
          </StoryEmojiSpan>
        </Draggable>
      ))}
      {imageContainerRef && tags.map((tag, i) => (
        <Draggable
          canDrag={editEnabled}
          key={tag.tag + '_' + i}
          defaultPosition={computeDefaultPosition(tag.locationX, tag.locationY)}
          onEndDragging={(pos) => handleTagEndDragging(pos, i)}
          parentRef={imageContainerRef}
        >
          <StoryTagSpan>
            {tag.tag}
          </StoryTagSpan>
        </Draggable>
      ))}
    </DetailArtworkDisplay>
  );
};

export default ArtworkDecorationPanel;