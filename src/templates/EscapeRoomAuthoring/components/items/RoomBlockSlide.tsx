import { useState } from 'react';
import { RoomBlock, SupportedPuzzle } from "../../../../services/escapeRoomActivity.model";

import styled from "styled-components";
import {Bin} from "@styled-icons/icomoon/Bin";
import {Copy} from "@styled-icons/boxicons-regular/Copy";

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

  ${props => !props.selected && `
  border: 1px dashed black;
  `}
  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
  color: rgb(51, 51, 51);
  min-width: 141px;
  ${props => props.selected && `
  background-color: rgb(234, 244, 252);
  `}
  margin-right: 1em;
`;

//Entire slide of a puzzle
const PuzzleSlide = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 100%;
  background-color: transparent;
  user-select: none;
  padding: 12px 16px 12px 0px;
  margin: 0px 10px 0px 10px;
  display: flex;
  flex-direction: column;
  border: 0px none;
  border-radius: 0.5rem;

  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
  color: rgb(51, 51, 51);
  width: max-content;
  background-color: rgba(248, 188, 188);
`;

const SlideTitle = styled.div`
  display: flex;
  z-index: 999999;
  flex: 0 1 auto;
  -moz-box-pack: start;
  justify-content: flex-start;
  box-sizing: border-box;
  margin: 0.25em 0px 0.25em 1em;
  padding: 0px;
  border: 0px none;

  font-size: 0.75rem;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
`;

const SlideContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  height: calc(100% - 1.25rem);
  width: 100%;
  box-sizing: border-box;
  color: rgb(51, 51, 51);
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

  margin: 0.25em 0.5em;
  border: 1px solid rgb(229, 229, 229);
  border-radius: 0.25rem;

  background-color: ${props => props.selected ? 'white' : '#f2f2f1'};
  transition: border 0.25s;
  &:hover {
    transition: border 0.25s;
    ${props => !props.selected && `
    border: 3px solid rgb(200, 200, 200);
    `}
  }
`;


interface SliceButtonProps {
  X?: number;
  Y?: number;
}

const SliceButton = styled.div<SliceButtonProps>`
  position: absolute;
  left: ${props => props.X}%;
  top: ${props => props.Y}%;
  padding: 3px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  box-sizing: border-box;
  color: rgb(247, 0, 255);
  background-color:rgb(222, 222, 222);
  border-radius: 0.75rem;
  &:hover {
    transition: border background-color visibility  1s;
    border: 3px solid rgb(200, 200, 200);
    background-color:  rgb(180, 180, 180);
  }
`;

const DuplicateIcon = styled(Copy)`
  color: rgb(0, 0, 0);
  height: 1.25em;
  width: 1.25em;
`
const DeleteIcon = styled(Bin)`
  color: rgb(0, 0, 0);
  height: 1.25em;
  width: 1.25em;
`

//Container of the multiple slides that can be added to a block
const SlidesContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex: 0 0 0%;
  //height: calc(100% - 1.25rem);
  height: 100%;
 
  box-sizing: border-box;
  color: rgb(51, 51, 51);
  background-color: rgb(225, 132, 132);
`;


export type RoomPuzzleToSlideMappings<T extends SupportedPuzzle> = {
  [P in T['type']]?: (props: Extract<SupportedPuzzle, { type: P }>['payload']) => JSX.Element;
} // RoomPuzzleToSlideMappings

export interface RoomBlockSlideProps {
  /** whether this slide is currently selected */
  selected?: boolean;
  /** callback to parent notifying of slide being selected by the user */
  onSlideSelected?: () => void;
  /** callback to parent notifying that user wants to delete this block */
  onBlockDeleted?: () => void;
  /** callback to parent notifying that user wants to delete this block */
  onBlockDuplicated?: () => void;
  /** callback to parent notifying that user wants to delete this block */
  onDuplicatedPuzzle?: (blockIndex: number, puzzleIndex:number) => void;
  /** Block whose preview we wish to render */
  block: RoomBlock;
  blockIndex:number;
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
    onDuplicatedPuzzle
  } = props;

  return (
    <Root selected={selected} onMouseLeave = {()=>setMouseOverMe(false)}  onMouseEnter={()=>setMouseOverMe(true)}  onClick={onSlideSelected}>

      <SlidesContainer>
        {block.puzzles.map((puzzle, i) => {
          const slideRenderer = puzzleMappings[puzzle.type];
          return (
            <PuzzleSlide>
              <SlideTitle>{puzzle.type}</SlideTitle>
              <SlideContainer>
                <ItemPreview selected={selected}>
                  {slideRenderer && slideRenderer(puzzle.payload as any)}
                </ItemPreview>
              </SlideContainer>

            </PuzzleSlide>
          );
        })}

      </SlidesContainer>

      { mouseOverMe ? 
      <>
        {/* Duplicate slice button */}
        <SliceButton Y={5} X={95}  onClick={ e=>{onBlockDeleted && onBlockDeleted()}}>
          <DeleteIcon></DeleteIcon>
        </SliceButton>

        {/* Duplicate slice button */}
        <SliceButton Y={35} X={95}  onClick={ e=>{onBlockDuplicated && onBlockDuplicated()}}>
          <DuplicateIcon></DuplicateIcon>
        </SliceButton>
      </>
      :
      <></>
      }

    </Root>
  );
}; // RoomBlockSlide

export interface RoomSettingsSlideProps {
  /** whether this slide is currently selected */
  selected: boolean;
  /** callback to parent notifying of slide being selected by the user */
  onSlideSelected?: () => void;
}
export const RoomSettingsSlide = (props: RoomSettingsSlideProps): JSX.Element => {

  const {
    selected,
    onSlideSelected
  } = props;

  return (
    <Root
      onClick={onSlideSelected}
      selected={selected}
    >
      <PuzzleSlide>
        <SlideTitle>Room Settings</SlideTitle>
        <SlideContainer>
          <ItemPreview selected={selected} />
        </SlideContainer>
      </PuzzleSlide>
    </Root>
  );
}; // RoomSettingsSlide