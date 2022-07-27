import { useState } from "react";
import {
  RoomBlock,
  SupportedPuzzle,
} from "../../../../services/escapeRoomActivity.model";

import styled from "styled-components";
import { DeleteForever } from "@styled-icons/material-twotone/DeleteForever";
import { Copy } from "@styled-icons/boxicons-regular/Copy";
import { Settings } from "@styled-icons/fluentui-system-filled/Settings";
import {
  ItemPreview,
  Slide,
  SlideRoot,
  SlidesContainer,
} from "./RoomExitBlockSlide";

import { CaretRightFill } from "@styled-icons/bootstrap/CaretRightFill";
const RightArrowIcon = styled(CaretRightFill)`
  color: rgb(15, 90, 188);
  height: 1.75em;
  width: 1.75em;
  margin: auto;
`;

const SettingsIcon = styled(Settings)`
  position: absolute;
  left: 50%;
  top: 50%;
  color: rgb(19, 104, 206);
  transform: translate(-50%, -30%);
  width: 50%;
`;

interface RootProps {
  selected?: boolean;
}

const SettingsSlideRoot = styled.div<RootProps>`
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 150px;
  background-color: rgb(255, 2255, 255);
  user-select: none;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  border: 2px solid rgb(19, 104, 206);
  border-radius: 0.5rem;
  overflow: hidden;

  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  color: rgb(51, 51, 51);
  min-width: 141px;
  margin-right: 1em;
  ${(props) =>
    props.selected &&
    `
  background-color: rgb(255, 2255, 255);
  `}
  &:hover {
    background-color: rgb(220, 220, 220);
  }
`;

const SettingsSlideTitle = styled.div`
  position: relative;
  height: 20%;
  width: 100%;
  background-color: rgb(19, 104, 206);
  padding-top: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.5rem;

  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  font-family: ${(props) => props.theme.contentFont};
  color: rgb(255, 255, 255);
`;

const DuplicateIcon = styled(Copy)`
  position: absolute;
  right: 0%;
  top: 30%;
  cursor: pointer;
  z-index: 20;
  height: 1.75em;
  width: 1.75em;
  border-radius: 0.25rem;
  border: 2px solid rgb(15, 90, 188);
  background-color: rgb(19, 104, 206);
  color: white;
  &:hover {
    background-color: rgb(49, 134, 236);
  }
`;
const DeleteIcon = styled(DeleteForever)`
  position: absolute;
  right: 0%;
  top: 60%;
  cursor: pointer;
  z-index: 20;

  height: 1.75em;
  width: 1.75em;
  border-radius: 0.25rem;
  border: 2px solid rgb(15, 90, 188);
  background-color: rgb(19, 104, 206);
  color: white;
  &:hover {
    background-color: rgb(49, 134, 236);
  }
`;

export const SlideTitle = styled.div`
  position: relative;
  height: 100%;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  font-family: ${(props) => props.theme.contentFont};
  color: rgb(255, 255, 255);
`;

export type RoomPuzzleToSlideMappings<T extends SupportedPuzzle> = {
  [P in T["type"]]?: (
    props: Extract<SupportedPuzzle, { type: P }>["payload"]
  ) => JSX.Element;
}; // RoomPuzzleToSlideMappings

export interface RoomBlockSlideProps {
  /** whether this slide is currently selected */
  selected?: boolean;
  /** callback to parent notifying of slide being selected by the user */
  onSlideSelected?: () => void;
  /** callback to parent notifying that user wants to delete this block */
  onBlockDeleted?: () => void;
  /** callback to parent notifying that user wants to delete this block */
  onBlockDuplicated?: () => void;
  /** Block whose preview we wish to render */
  block: RoomBlock;
  blockIndex: number;
  /** Mappings between block puzzle types and slide view producers (instructions on how to render a given preview) */
  puzzleMappings: RoomPuzzleToSlideMappings<SupportedPuzzle>;
} // RoomBlockSlideProps

export const RoomBlockSlide = (props: RoomBlockSlideProps): JSX.Element => {
  const [mouseOverMe, setMouseOverMe] = useState<boolean>(false);

  const {
    puzzleMappings,
    selected = false,
    block,
    blockIndex,
    onSlideSelected,
    onBlockDeleted,
    onBlockDuplicated,
  } = props;

  return (
    <SlideRoot
      selected={selected}
      onMouseLeave={() => setMouseOverMe(false)}
      onMouseEnter={() => setMouseOverMe(true)}
    >
      {mouseOverMe ? (
        <>
          <DuplicateIcon
            onClick={(e) => {
              onBlockDuplicated && onBlockDuplicated();
            }}
          ></DuplicateIcon>

          <DeleteIcon
            onClick={(e) => {
              onBlockDeleted && onBlockDeleted();
            }}
          ></DeleteIcon>
        </>
      ) : (
        <></>
      )}
      <SettingsSlideTitle>
        <SlideTitle>{block.blockName}</SlideTitle>
      </SettingsSlideTitle>
      <SlidesContainer onClick={onSlideSelected}>
        {block.puzzles.map((puzzle, i) => {
          const slideRenderer = puzzleMappings[puzzle.type];
          return (
            <>
              <Slide>
                <ItemPreview selected={selected}>
                  {slideRenderer && slideRenderer(puzzle.payload as any)}
                </ItemPreview>
              </Slide>
              {i !== block.puzzles.length - 1 && <RightArrowIcon />}
            </>
          );
        })}
      </SlidesContainer>
    </SlideRoot>
  );
}; // RoomBlockSlide

export interface RoomSettingsSlideProps {
  /** whether this slide is currently selected */
  selected: boolean;
  /** callback to parent notifying of slide being selected by the user */
  onSlideSelected?: () => void;
}
export const RoomSettingsSlide = (
  props: RoomSettingsSlideProps
): JSX.Element => {
  const { selected, onSlideSelected } = props;

  return (
    <SettingsSlideRoot onClick={onSlideSelected} selected={selected}>
      <SettingsSlideTitle>Settings</SettingsSlideTitle>
      <SettingsIcon></SettingsIcon>
    </SettingsSlideRoot>
  );
}; // RoomSettingsSlide
