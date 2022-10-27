import { useState } from "react";
import {
  RoomBlock,
  SupportedPuzzle,
} from "../../../../services/escapeRoomActivity.model";

import styled from "styled-components";
import { DeleteForever } from "@styled-icons/material-twotone/DeleteForever";
import { Copy } from "@styled-icons/boxicons-regular/Copy";
import { Settings } from "@styled-icons/fluentui-system-filled/Settings";
import { Exit } from "@styled-icons/icomoon/Exit";

import { CaretRightFill } from "@styled-icons/bootstrap/CaretRightFill";
import React from "react";

const RightArrowIcon = styled(CaretRightFill)`
  color: ${(props) => props.theme.frameColor};
  height: 1.75em;
  width: 1.75em;
  margin: auto;
`;

const SettingsIcon = styled(Settings)`
  margin: auto;
  height: 5em;
  width: 5em;
  color: ${(props) => props.theme.frameColor};
`;

// Container of the multiple slides that can be added to a block
const SlidesContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: 0 0.75em 0 1.25em;
  height: 100%;

  border-radius: 0 0 0.25rem 0.25rem;
`;

interface ItemPreviewProps {
  selected?: boolean;
}

// Preview inside puzzle block
const ItemPreview = styled.div<ItemPreviewProps>`
  height: 100%;
  width: 100%;
  max-height: 100px;
  padding: 0.25rem 0.5rem;
  color: rgb(178, 178, 178);
  border-radius: 0.25rem;
  color: rgb(51, 51, 51);
  border: 2px solid ${(props) => props.theme.frameColor};
  align-self: start;
  display: flex;
  flex-direction: column;

  background-color: ${(props) =>
    props.selected ? "white" : "#f2f2f1"}; //"#f2f2f1"
`;

// Entire slide of a puzzle
const Slide = styled.div`
  position: relative;
  width: 150px;
  height: 90%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  top: 50%;
  transform: translate(0, -50%);
`;

interface RootProps {
  selected?: boolean;
}

const SlideRoot = styled.div<RootProps>`
  padding: 0.525em 0.75em;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0px none;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  max-height: 141px;

  ${SlidesContainer} {
    background-color: #f2f2f2;
  }

  ${(props) =>
    props.selected &&
    `
    background-color: rgb(234, 244, 252);
    ${SlidesContainer} {
      background-color: white;
    }
  `}

  &:hover {
    ${SlidesContainer} {
      ${(props) =>
        !props.selected &&
        `
      border: 2px solid ${props.theme.frameColor};
      border-top: 0px;
      border-radius: 0 0 0.25rem 0.25rem;
      transition: all 0s;
      `}
    }
  }
`;

const SlideTitle = styled.div`
  position: relative;
  height: 20%;
  width: 100%;
  background-color: ${(props) => props.theme.frameColor};
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
  color: white;
  border-radius: 0.25rem 0.25rem 0 0;
  cursor: pointer;
`;

const DuplicateIcon = styled(Copy)`
  position: absolute;
  left: 0rem;
  top: 30%;
  height: 1.75em;
  width: 1.75em;
  border-radius: 50%;
  padding: 0.15em;
  background-color: white;
  border: 2px solid ${(props) => props.theme.frameColor};
  cursor: pointer;

  color: ${(props) => props.theme.frameColor};
  z-index: 999;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const DeleteIcon = styled(DeleteForever)`
  position: absolute;
  left: 0rem;
  top: 60%;
  height: 1.75em;
  width: 1.75em;
  border-radius: 50%;
  padding: 0.15em;
  background-color: white;
  border: 2px solid ${(props) => props.theme.frameColor};
  cursor: pointer;
  z-index: 999;

  color: ${(props) => props.theme.frameColor};
  &:hover {
    background-color: #f2f2f2;
  }
`;

const ExitIcon = styled(Exit)`
  color: rgb(255, 255, 255);
  height: 90%;
  margin: 0.2rem 0;
  margin-right: 0.5rem;
`;

export type RoomPuzzleToSlideMappings<T extends SupportedPuzzle> = {
  [P in T["type"]]?: (
    props: Extract<SupportedPuzzle, { type: P }>["payload"]
  ) => JSX.Element;
}; // RoomPuzzleToSlideMappings

export interface RoomBlockSlideProps {
  /** whether this slide is currently selected */
  selected?: boolean;
  /** whether this slide represents an exit block */
  isExitBlock?: boolean;
  /** callback to parent notifying of slide being selected by the user */
  onSlideSelected?: () => void;
  /** callback to parent notifying that user wants to delete this block */
  onBlockDeleted?: () => void;
  /** callback to parent notifying that user wants to delete this block */
  onBlockDuplicated?: () => void;
  /** Block whose preview we wish to render */
  block: RoomBlock;
  /** Mappings between block puzzle types and slide view producers (instructions on how to render a given preview) */
  puzzleMappings: RoomPuzzleToSlideMappings<SupportedPuzzle>;
} // RoomBlockSlideProps

export const RoomBlockSlide = (props: RoomBlockSlideProps): JSX.Element => {
  const [mouseOverMe, setMouseOverMe] = useState<boolean>(false);

  const {
    puzzleMappings,
    selected = false,
    isExitBlock = false,
    block,
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
      {!isExitBlock && (mouseOverMe || selected) ? (
        <>
          <DuplicateIcon
            onClick={() => {
              onBlockDuplicated && onBlockDuplicated();
            }}
          ></DuplicateIcon>

          <DeleteIcon
            onClick={() => {
              onBlockDeleted && onBlockDeleted();
            }}
          ></DeleteIcon>
        </>
      ) : (
        <></>
      )}
      <SlideTitle onClick={onSlideSelected}>
        {isExitBlock ? (
          <>
            Exit Block
            <ExitIcon />
          </>
        ) : (
          block.blockName
        )}
      </SlideTitle>
      <SlidesContainer onClick={onSlideSelected}>
        {React.Children.toArray(
          block.puzzles.map((puzzle, i) => {
            const slideRenderer = puzzleMappings[puzzle.type];
            return (
              <>
                <Slide key={puzzle.type + "_" + i}>
                  <ItemPreview selected={selected}>
                    {slideRenderer && slideRenderer(puzzle.payload as any)}
                  </ItemPreview>
                </Slide>
                {i !== block.puzzles.length - 1 && (
                  <RightArrowIcon key={"arrow_" + i} />
                )}
              </>
            );
          })
        )}
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
    <SlideRoot onClick={onSlideSelected} selected={selected}>
      <SlideTitle>Settings</SlideTitle>
      <SlidesContainer>
        <Slide>
          <SettingsIcon />
        </Slide>
      </SlidesContainer>
    </SlideRoot>
  );
}; // RoomSettingsSlide
