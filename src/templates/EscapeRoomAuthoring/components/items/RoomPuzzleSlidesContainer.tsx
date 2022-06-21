import styled from "styled-components";
import { EscapeRoomPuzzleDefinition } from "../../../../services/escapeRoomActivity.model";
import { RoomPuzzleSlide, RoomPuzzleSlideProps, RoomSettingsSlide } from "./RoomPuzzleSlide";
import { Add } from "@styled-icons/fluentui-system-filled/Add";

const Root = styled.div`
  position: absolute;
  top: 0;
  z-index: 101;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  -moz-box-align: center;
  align-items: center;
  bottom: unset;
  width: 96%;
  height: 8.5rem;

  background-color: white;

  border-radius: 0 0 1.25rem 1.25rem;
  box-shadow: #d3d4d5 0px -4px 0px 0px inset;
  padding: 0 0.75rem;
`;

const VerticalSpace = styled.div`
  height: 0;
  margin-top: 7rem;
`;

const SlidesContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  z-index: 4;
  height: 85%;
  width: 90%;
  overflow-x: auto;
  margin: 0px 0px;
`;

const AddIcon = styled(Add)`
  color: white;
  height: 1.75em;
  width: 1.75em;
  margin: auto;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  -moz-box-align: center;
  align-items: center;
  -moz-box-pack: start;
  justify-content: center;
  min-height: 100%;
  padding: 0px 1.5rem 1.5rem 1.5rem;
  position: absolute;
  right: 0;
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
  padding: 0px;
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

export type PuzzleToSlideProducerMapping<T extends EscapeRoomPuzzleDefinition> = {
  /** What type of puzzle we are working with here*/
  [P in T['type']]: ((slidePreviewProps: Extract<T, { type: P }>['payload']) => JSX.Element) | undefined;
}

export interface RoomPuzzleSlidesContainerProps {
  /** list of puzzles currently included in the activity */
  puzzles: EscapeRoomPuzzleDefinition[];
  /** index of currently selected puzzle in puzzles */
  selectedPuzzleIndex: number | 'room-settings';
  /** What  mappings we are working with in this slides list (available puzzle types and how to render their previews) */
  puzzleMappings: PuzzleToSlideProducerMapping<EscapeRoomPuzzleDefinition>;
  /** Callback to parent component specifying that user wishes to add a new puzzle to the activity */
  onAddPuzzle?: () => void;
  /** Callback to parent component specifying that user wishes to select a given puzzle from the activity */
  onSelectPuzzle?: (index: number) => void;
  /** Callback to parent component specifying that user wishes to go back to the room settings editor */
  onSelectRoomSettings?: () => void;
} // RoomPuzzleSlidesContainerProps

export const RoomPuzzleSlidesContainer = (props: RoomPuzzleSlidesContainerProps): JSX.Element => {

  const {
    puzzles,
    selectedPuzzleIndex,
    puzzleMappings,
    onAddPuzzle,
    onSelectPuzzle,
    onSelectRoomSettings
  } = props;

  const handleSelectPuzzle = (index: number) => {
    if (onSelectPuzzle) {
      onSelectPuzzle(index);
    }
  }; // handleSelectPuzzle

  return (
    <>
      <Root>
        <SlidesContainer>
          <RoomSettingsSlide
            selected={selectedPuzzleIndex === 'room-settings'}
            onSlideSelected={onSelectRoomSettings}
          />
          {puzzles.map((s, i) => {
            // This is "unsafe", but in reality due to how puzzleMappings is defined
            // it will never really be problematic (s and puzzleMappings[s.type] are forcefully consistent)
            const slideProps = {
              selected: i == selectedPuzzleIndex,
              puzzle: s,
              slidePreviewProducer: puzzleMappings[s.type],
              onSlideSelected: () => handleSelectPuzzle(i)
            } as RoomPuzzleSlideProps;

            return (
              <RoomPuzzleSlide
                key={s.type + '_' + i}
                {...slideProps}
              />
            );
          })}
        </SlidesContainer>
        <ButtonsContainer>
          <AddItemButtonContainer>
            <AddItemButton onClick={onAddPuzzle}><AddIcon /></AddItemButton>
          </AddItemButtonContainer>
        </ButtonsContainer>
      </Root>
      <VerticalSpace />
    </>
  );
}; // RoomPuzzleSlidesContainer