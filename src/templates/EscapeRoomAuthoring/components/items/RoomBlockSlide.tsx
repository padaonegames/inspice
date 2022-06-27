import styled from "styled-components";
import { RoomBlock, SupportedPuzzle } from "../../../../services/escapeRoomActivity.model";

interface RootProps {
  selected?: boolean;
}
const Root = styled.div<RootProps>`
  box-sizing: border-box;
  height: 100%;
  background-color: transparent;
  user-select: none;
  padding: 12px 16px 12px 0px;
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  border: 0px none;
  border-radius: 0.5rem;

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

const PuzzleSlide = styled.div`
  box-sizing: border-box;
  height: 100%;
  background-color: transparent;
  user-select: none;
  padding: 12px 16px 12px 0px;
  display: flex;
  flex-direction: column;
  border: 0px none;
  border-radius: 0.5rem;

  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
  color: rgb(51, 51, 51);
  width: auto;
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

export type RoomPuzzleToSlideMappings<T extends SupportedPuzzle> = {
  [P in T['type']]?: (props: Extract<SupportedPuzzle, { type: P }>['payload']) => JSX.Element;
} // RoomPuzzleToSlideMappings

export interface RoomBlockSlideProps {
  /** whether this slide is currently selected */
  selected?: boolean;
  /** callback to parent notifying of slide being selected by the user */
  onSlideSelected?: () => void;
  /** Block whose preview we wish to render */
  block: RoomBlock;
  /** Mappings between block puzzle types and slide view producers (instructions on how to render a given preview) */
  puzzleMappings: RoomPuzzleToSlideMappings<SupportedPuzzle>;
} // RoomBlockSlideProps


export const RoomBlockSlide = (props: RoomBlockSlideProps): JSX.Element => {

  const {
    puzzleMappings,
    selected = false,
    block,
    onSlideSelected
  } = props;

  return (
    <Root
      onClick={onSlideSelected}
      selected={selected}
    >
      {block.puzzles.map((puzzle, _) => {
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