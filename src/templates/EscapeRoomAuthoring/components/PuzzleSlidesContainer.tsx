import styled from "styled-components";
import { RoomPuzzle } from "../../../services/escapeRoomActivity.model";
import { PuzzleSlide } from "./PuzzleSlide";

const Root = styled.div`
  position: fixed;
  left: 0;
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

const SlidesContainer = styled.div`
  display: block;
  position: relative;
  z-index: 4;
  height: 80%;
  width: 100%;
  overflow-y: auto;
  margin: 0px 0px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  -moz-box-align: center;
  align-items: center;
  -moz-box-pack: start;
  justify-content: flex-start;
  min-width: 100%;
  padding: 0px 1.5rem 1.5rem 1.5rem;
  position: absolute;
  bottom: 0;
  z-index: 9999;
`;

const AddItemButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(255, 255, 255) none repeat scroll 0% 0%;
  transition: all 0.2s ease 0s;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const AddItemButton = styled.button`
  width: 100%;
  margin: 0px;
  border: 0px none;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  box-shadow: rgba(0, 0, 0, 0.25) 0px -4px inset;

  background: rgb(19, 104, 206) none repeat scroll 0% 0%;
  color: rgb(255, 255, 255);
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;

  font-family: ${props => props.theme.contentFont};
  text-align: center;
  text-decoration: none;
  min-width: 42px;
  min-height: 42px;
  padding: 0px 16px 4px;
  position: relative;

  transition: all 0s;
  &:hover {
    transition: all 0s;
    min-height: 40px;
    margin-top: 2px;
    padding-bottom: 2px;
    background-color: rgb(18, 96, 190);
    box-shadow: rgba(0, 0, 0, 0.25) 0px -2px inset;
  }
`;

export interface PuzzleSlidesContainerProps {
  /** list of puzzles currently included in active room */
  puzzles: RoomPuzzle[];
  /** index of currently selected puzzle in puzzles */
  selectedPuzzleIndex: number;
  /** Callback to parent component specifying that user wishes to add a new puzzle to the room */
  onAddPuzzle?: () => void;
  /** Callback to parent component specifying that user wishes to select a given puzzle from the room */
  onSelectPuzzle?: (index: number) => void;
} // PuzzleSlidesContainerProps

export const PuzzleSlidesContainer = (props: PuzzleSlidesContainerProps): JSX.Element => {

  const {
    puzzles,
    selectedPuzzleIndex,
    onAddPuzzle,
    onSelectPuzzle
  } = props;

  const handleSelectPuzzle = (index: number) => {
    if (onSelectPuzzle) {
      onSelectPuzzle(index);
    }
  }; // handleSelectPuzzle

  return (
    <Root>
      <SlidesContainer>
        {puzzles.map((p, i) => (
          <PuzzleSlide
            key={p.type + '_' + p.promptText + 'i'}
            selected={i == selectedPuzzleIndex}
            prompt={p.promptText ?? 'Prompt'}
            puzzleType={p.type}
            onSlideSelected={() => handleSelectPuzzle(i)}
          />
        ))}
      </SlidesContainer>
      <ButtonsContainer>
        <AddItemButtonContainer>
          <AddItemButton onClick={onAddPuzzle}>Add Puzzle</AddItemButton>
        </AddItemButtonContainer>
      </ButtonsContainer>
    </Root>
  );
}; // PuzzleSlidesContainer