import styled from "styled-components";
import { EscapeRoomPuzzleDefinition } from "../../../../services/escapeRoomActivity.model";

interface RootProps {
  selected?: boolean;
}
const Root = styled.div<RootProps>`
  box-sizing: border-box;
  height: 100%;
  background-color: transparent;
  user-select: none;
  padding: 12px 16px 12px 0px;
  display: block;
  border: 0px none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
  color: rgb(51, 51, 51);
  min-width: 141px;
  ${props => props.selected && `
  background-color: rgb(234, 244, 252);
  `}
`;

const SlideTitle = styled.div`
  display: flex;
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

interface PuzzlePreviewProps {
  selected?: boolean;
}
const PuzzlePreview = styled.div<PuzzlePreviewProps>`
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

type RoomPuzzleSlidePropsBase<T extends EscapeRoomPuzzleDefinition> = {
  [P in T['type']]: {
    puzzle: Extract<EscapeRoomPuzzleDefinition, { type: P }>;
    /** whether this slide is currently selected */
    selected: boolean;
    /** component to render the contents of the slide based on the puzzle payload */
    slidePreviewProducer?: (props: Extract<EscapeRoomPuzzleDefinition, { type: P }>['payload']) => JSX.Element;
    /** callback to parent notifying of slide being selected by the user */
    onSlideSelected?: () => void;
  }
} // RoomPuzzleSlidePropsBase

export type RoomPuzzleSlideProps = RoomPuzzleSlidePropsBase<EscapeRoomPuzzleDefinition>[keyof RoomPuzzleSlidePropsBase<EscapeRoomPuzzleDefinition>];

export const RoomPuzzleSlide = (props: RoomPuzzleSlideProps): JSX.Element => {

  const {
    puzzle,
    selected,
    slidePreviewProducer,
    onSlideSelected
  } = props;

  return (
    <Root
      onClick={onSlideSelected}
      selected={selected}
    >
      <SlideTitle>{puzzle.type}</SlideTitle>
      <SlideContainer>
        <PuzzlePreview selected={selected}>
          {slidePreviewProducer && slidePreviewProducer(puzzle.payload as any)}
        </PuzzlePreview>
      </SlideContainer>
    </Root>
  );
}; // RoomPuzzleSlide

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
      <SlideTitle>Room Settings</SlideTitle>
      <SlideContainer>
        <PuzzlePreview selected={selected}>
          
        </PuzzlePreview>
      </SlideContainer>
    </Root>
  );
}; // RoomPuzzleSlide