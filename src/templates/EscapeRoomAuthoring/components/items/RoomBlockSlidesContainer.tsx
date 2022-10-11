import {
  RoomBlock,
  SupportedPuzzle,
} from "../../../../services/escapeRoomActivity.model";
import {
  RoomBlockSlide,
  RoomBlockSlideProps,
  RoomSettingsSlide,
} from "./RoomBlockSlide";

import styled, { css } from "styled-components";
import { Add } from "@styled-icons/fluentui-system-filled/Add";

const Root = styled.div`
  position: absolute;
  top: 0;
  z-index: 101;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  -moz-box-align: center;
  align-blocks: center;
  width: 96%;
  // height: 8.5rem;
  height: 10rem;

  border-radius: 0 0 1.25rem 1.25rem;
  border-top: none;
  box-shadow: #d3d4d5 0px -4px 2px 2px inset;
  background-color: ${(props) => props.theme.cardBackground};
  padding: 0 0.5rem;
`;

const VerticalSpace = styled.div`
  height: 0;
  margin-top: 6rem;
`;

const SlidesContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  padding-left: 0.5rem;
  z-index: 4;
  height: 100%;
  width: 90%;
  overflow-x: scroll;
  overflow-y: clip;
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 0 0 0.5rem 1rem;
  border-right: 1px solid #e8e8e8;

  scrollbar-gutter: stable;
  ::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  -moz-box-align: center;
  align-blocks: center;
  -moz-box-pack: start;
  justify-content: center;
  min-height: 100%;
  padding: 0px 1.5rem 1.5rem 1.5rem;
  position: absolute;
  right: 0;
  z-index: 9999;
`;

const AddBlockButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  transition: all 0.2s ease 0s;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const AddBlockButton = styled.button`
  font-family: ${(props) => props.theme.contentFont};
  font-size: ${(props) => props.theme.contentFontSize};
  cursor: pointer;
  background-color: hsl(10, 80%, 80%);
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  height: fit-content;
  text-align: center;
  padding: 0.65em;
  color: white;
  width: fit-content;
  margin: 1em auto;
`;

export const fieldTypeIcon = css`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
`;

const AddBlockIcon = styled(Add)`
  ${fieldTypeIcon}
  cursor: pointer;
  color: white;
`;

export type ItemToSlideProducerMapping<T extends SupportedPuzzle> = {
  /** What type of puzzle we are working with here*/
  [P in T["type"]]: (
    slidePreviewProps: Extract<T, { type: P }>["payload"]
  ) => JSX.Element;
};

export interface RoomBlockSlidesContainerProps {
  /** list of blocks currently included in the room */
  blocks: RoomBlock[];
  /** block that lets the user exit a room */
  exitBlock: RoomBlock;
  /** index of currently selected block in blocks */
  selectedBlockIndex: number | "room-settings" | "exit-block";
  /** What  mappings we are working with in this slides list (available puzzle types and how to render their previews) */
  itemMappings: ItemToSlideProducerMapping<SupportedPuzzle>;
  /** Callback to parent component specifying that user wishes to add a new block to the room */
  onAddBlock?: () => void;
  /** Callback to parent component specifying that user wishes to select a given block from the room blocks */
  onSelectBlock?: (index: number) => void;
  /** Callback to parent component specifying that user wishes to go back to the room settings editor */
  onSelectRoomSettings?: () => void;
  /** Callback to parent component specifying that user wishes to go to the room's exit block */
  onSelectRoomExitBlock?: () => void;
  /** Callback to parent component specifying that user wishes to delete a block of puzzles from current room */
  onDeleteBlock?: (index: number) => void;
  /** Callback to parent component specifying that user wishes to delete a block of puzzles from current room */
  onDuplicateBlock?: (index: number) => void;
} // RoomBlockSlidesContainerProps

export const RoomBlockSlidesContainer = (
  props: RoomBlockSlidesContainerProps
): JSX.Element => {
  const {
    blocks,
    exitBlock,
    selectedBlockIndex,
    itemMappings,
    onAddBlock,
    onSelectBlock,
    onSelectRoomSettings,
    onSelectRoomExitBlock,
    onDeleteBlock,
    onDuplicateBlock,
  } = props;

  const handleSelectBlock = (index: number) => {
    if (onSelectBlock) {
      onSelectBlock(index);
    }
  }; // handleSelectBlock

  const handleDeleteBlock = (index: number) => {
    if (onDeleteBlock) {
      onDeleteBlock(index);
    }
  }; // handleDeleteBlock

  const handleDuplicateBlock = (index: number) => {
    if (onDuplicateBlock) {
      onDuplicateBlock(index);
    }
  }; // handleDeleteBlock

  return (
    <>
      <Root>
        <SlidesContainer>
          <RoomSettingsSlide
            key="room_settings_slide"
            selected={selectedBlockIndex === "room-settings"}
            onSlideSelected={onSelectRoomSettings}
          />
          <RoomBlockSlide
            key="exit_block_slide"
            isExitBlock
            selected={selectedBlockIndex === "exit-block"}
            block={exitBlock}
            puzzleMappings={itemMappings}
            onSlideSelected={onSelectRoomExitBlock}
          />
          {blocks.map((block, i) => {
            // This is "unsafe", but in reality due to how itemMappings is defined
            // it will never really be problematic (s and itemMappings[s.type] are forcefully consistent)
            const slideProps: RoomBlockSlideProps = {
              puzzleMappings: itemMappings,
              selected: i == selectedBlockIndex,
              block: block,
              onSlideSelected: () => handleSelectBlock(i),
              onBlockDeleted: () => handleDeleteBlock(i),
              onBlockDuplicated: () => handleDuplicateBlock(i),
            };

            return <RoomBlockSlide key={i} {...slideProps} />;
          })}
        </SlidesContainer>

        {/* Button to the upper right side of the editor to add a new block of puzzles to the room */}
        <ButtonsContainer>
          <AddBlockButtonContainer>
            <AddBlockButton onClick={onAddBlock} title="Add Block">
              <AddBlockIcon />
            </AddBlockButton>
          </AddBlockButtonContainer>
        </ButtonsContainer>
      </Root>
      <VerticalSpace />
    </>
  );
}; // RoomBlockSlidesContainer
