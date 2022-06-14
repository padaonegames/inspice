import styled from "styled-components";
import { RoomPuzzle } from "../../../services/escapeRoomActivity.model";
import { PuzzleSlide } from "./PuzzleSlide";

const Root = styled.div`
  position: fixed;
  left: 0px;
  z-index: 101;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  -moz-box-align: center;
  align-items: center;
  bottom: unset;
  width: 12rem;
  height: 100%;
  background: rgb(255, 255, 255) none repeat scroll 0% 0%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
  padding-top: 0;
`;

export interface PuzzleSlidesContainerProps {
  /** list of puzzles currently included in active room */
  puzzles: RoomPuzzle[];
  /** index of currently selected puzzle in puzzles */
  selectedPuzzleIndex: number;
} // PuzzleSlidesContainerProps

export const PuzzleSlidesContainer = (props: PuzzleSlidesContainerProps): JSX.Element => {

  const {
    puzzles,
    selectedPuzzleIndex
  } = props;

  return (
    <Root>
      {puzzles.map((p, i) => (
        <PuzzleSlide
          key={p.type + '_' + p.promptText + 'i'}
          selected={i == selectedPuzzleIndex}
          prompt={p.promptText ?? 'Prompt'}
          puzzleType={p.type}
        />
      ))}
    </Root>
  );
}; // PuzzleSlidesContainer