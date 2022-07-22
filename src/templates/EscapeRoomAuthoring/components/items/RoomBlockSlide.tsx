import { useState } from "react";
import {
  RoomBlock,
  SupportedPuzzle,
} from "../../../../services/escapeRoomActivity.model";

import styled from "styled-components";
import { DeleteForever } from "@styled-icons/material-twotone/DeleteForever";
import { Copy } from "@styled-icons/boxicons-regular/Copy";
import { Settings } from "@styled-icons/fluentui-system-filled/Settings";
import { SlideRoot, SlidesContainer } from "./RoomExitBlockSlide";

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
const Root = styled.div<RootProps>`
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: min-content;
  background-color: transparent;
  user-select: none;
  padding: 10px 0px 10px 0px;
  display: flex;
  flex-direction: row;
  flex: 0 0 auto;
  justify-content: space-around;
  border: 0px none;
  border-radius: 1.25rem;

  ${(props) =>
    !props.selected &&
    `
  border: 1px dashed black;
  `}
  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  color: rgb(51, 51, 51);
  min-width: 141px;
  ${(props) =>
    props.selected &&
    `
  background-color: rgb(234, 244, 252);
  `}
  margin-right: 1em;
`;

const SettingsSlideRoot = styled.div<RootProps>`
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: min-content;
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
  height: 25%;
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

const Slide = styled.div`
  position: relative;

  height: 80%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  top: 50%;
  transform: translate(0, -50%);
`;

const PuzzleSlideTitle = styled.div`
  display: flex;
  height: 15%;
  width: 100%;
  -moz-box-pack: start;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 3px 0px 0px 10px;
  border: 0px none;
  border-radius: 0.25rem 0.25rem 0 0;
  background-color: rgb(15, 90, 188);
  color: white;
  text-align: center;

  font-size: 0.75rem;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
`;

const SlideContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 0 0 0.25rem 0.25rem;
  color: rgb(51, 51, 51);
  border: 2px solid rgb(15, 90, 188);
`;

interface ItemPreviewProps {
  selected?: boolean;
}

//Preview inside puzzle block
const ItemPreview = styled.div<ItemPreviewProps>`
  display: flex;
  flex-direction: column;
  -moz-box-pack: justify;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  max-width: 100%;
  flex: 1 1 0%;
  padding: 0.25rem 0.5rem;
  color: rgb(178, 178, 178);

  border: 1px solid rgb(229, 229, 229);
  border-radius: 0.25rem;

  background-color: ${(props) => (props.selected ? "white" : "#f2f2f1")};
  transition: border 0.25s;
  &:hover {
    transition: border 0.25s;
    ${(props) =>
      !props.selected &&
      `
    border: 3px solid rgb(200, 200, 200);
    `}
  }
`;

const SlideButtons = styled.div`
  padding-right: 10px;
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  border-radius: 0.75rem;
`;

const DuplicateIcon = styled(Copy)`
  color: rgb(255, 255, 255);
  height: 100%;
  margin-right: 10px;
  box-sizing: content-box;
  border-radius: 100%;
  padding: 3px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;
const DeleteIcon = styled(DeleteForever)`
  color: rgb(255, 255, 255);
  height: 90%;
  box-sizing: content-box;
  border-radius: 100%;
  padding: 3px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
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
      onClick={onSlideSelected}
    >
      <SettingsSlideTitle>
        <SlideTitle>{block.blockName}</SlideTitle>
        {mouseOverMe ? (
          <SlideButtons>
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
          </SlideButtons>
        ) : (
          <></>
        )}
      </SettingsSlideTitle>
      <SlidesContainer>
        {block.puzzles.map((puzzle, i) => {
          const slideRenderer = puzzleMappings[puzzle.type];
          return (
            <>
              <Slide>
                {/* <SlideTitleV2>{puzzle.type}</SlideTitleV2> */}
                <SlideContainer>
                  <ItemPreview selected={selected}>
                    {slideRenderer && slideRenderer(puzzle.payload as any)}
                  </ItemPreview>
                </SlideContainer>
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
