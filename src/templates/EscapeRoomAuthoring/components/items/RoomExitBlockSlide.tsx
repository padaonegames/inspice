import {
  RoomBlock,
  SupportedPuzzle,
} from "../../../../services/escapeRoomActivity.model";

import styled from "styled-components";
import { Exit } from "@styled-icons/icomoon/Exit";
import { CaretRightFill } from "@styled-icons/bootstrap/CaretRightFill";

const RightArrowIcon = styled(CaretRightFill)`
  color: rgb(15, 90, 188);
  height: 1.75em;
  width: 1.75em;
  margin: auto;
`;

const ExitIcon = styled(Exit)`
  color: rgb(255, 255, 255);
  height: 100%;
  padding-left: 0.5rem;
`;

interface RootProps {
  selected?: boolean;
}
const Root = styled.div<RootProps>`
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: min-content;
  // background-color: transparent;
  background-color: rgba(255, 255, 0, 1);
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

//Entire slide of a puzzle
export const Slide = styled.div`
  position: relative;
  height: 90%;
  width: 150px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  top: 50%;
  transform: translate(0, -50%);
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
  font-family: ${(props) => props.theme.contentFont};
`;

const SlideContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
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
export const ItemPreview = styled.div<ItemPreviewProps>`
  height: 100%;
  width: 100%;
  max-height: 100px;
  padding: 0.25rem 0.5rem;
  color: rgb(178, 178, 178);
  border-radius: 0 0 0.25rem 0.25rem;
  color: rgb(51, 51, 51);
  border: 2px solid rgb(15, 90, 188);
  align-self: start;
  display: flex;
  flex-direction: column;

  background-color: ${(props) =>
    props.selected ? "white" : "#f2f2f1"}; //"#f2f2f1"
`;

//Container of the multiple slides that can be added to a block
export const SlidesContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: 0px 10px 0px 10px;
  height: 100%;
  z-index: 19;

  box-sizing: border-box;
  color: rgb(51, 51, 51);
`;

export const SlideRoot = styled.div<RootProps>`
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

export const SettingsSlideTitle = styled.div`
  position: relative;
  height: 20%;
  width: 100%;
  background-color: rgb(19, 104, 206);
  padding-top: 3px;
  align-items: center;

  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  font-family: ${(props) => props.theme.contentFont};
  color: rgb(255, 255, 255);
`;
export const SlideTitleContent = styled.div`
  position: relative;
  height: 100%;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 0.5rem;

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

export interface RoomExitBlockSlideProps {
  /** whether this slide is currently selected */
  selected?: boolean;
  /** callback to parent notifying of slide being selected by the user */
  onSlideSelected?: () => void;
  /** callback to parent notifying that user wants to delete this block */
  onBlockDeleted?: () => void;
  /** callback to parent notifying that user wants to delete this block */
  onBlockDuplicated?: () => void;
  /** callback to parent notifying that user wants to delete this block */
  onDuplicatedPuzzle?: (blockIndex: number, puzzleIndex: number) => void;
  /** Block whose preview we wish to render */
  exitBlock: RoomBlock;

  blockIndex: number;
  /** Mappings between block puzzle types and slide view producers (instructions on how to render a given preview) */
  puzzleMappings: RoomPuzzleToSlideMappings<SupportedPuzzle>;
} // RoomBlockSlideProps

export const RoomExitBlockSlide = (
  props: RoomExitBlockSlideProps
): JSX.Element => {
  const {
    puzzleMappings,
    selected = false,
    exitBlock,
    blockIndex,
    onSlideSelected,
  } = props;

  return (
    <SlideRoot selected={selected}>
      {/* Title with exit icon */}
      <SettingsSlideTitle>
        <SlideTitleContent>
          {"\t  Exit Block"}
          <ExitIcon />
        </SlideTitleContent>
      </SettingsSlideTitle>
      {/* Puzzles of this block */}
      <SlidesContainer onClick={onSlideSelected}>
        {exitBlock.puzzles.map((puzzle, i) => {
          const slideRenderer = puzzleMappings[puzzle.type];
          return (
            <>
              <Slide>
                <ItemPreview selected={selected}>
                  {slideRenderer && slideRenderer(puzzle.payload as any)}
                </ItemPreview>
              </Slide>
              {i !== exitBlock.puzzles.length - 1 && <RightArrowIcon />}
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
    <Root onClick={onSlideSelected} selected={selected}>
      <Slide>
        <SlideTitle>Room Settings</SlideTitle>
        <SlideContainer>
          <ItemPreview selected={selected} />
        </SlideContainer>
      </Slide>
    </Root>
  );
}; // RoomExitBlockSlide
