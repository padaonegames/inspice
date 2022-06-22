import styled from "styled-components";
import { EditableItemProps, EscapeRoomPuzzleDefinition, RoomDefinition } from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";
import { PuzzleToSlideProducerMapping, RoomPuzzleSlidesContainer } from "./RoomPuzzleSlidesContainer";
import { multipleChoiceItemFactory, MultipleChoiceItemStageSlide } from "./MutipleChoiceItem";
import { useState } from "react";
import { RoomSettingsEditor } from "./RoomSettingsEditor";
import { PuzzleEntryPointEditor } from "./PuzzleEntryPointEditor";

interface InputAreaProps {
  width?: string;
  height?: string;
  dimBackground?: boolean;
}
export const InputArea = styled.textarea<InputAreaProps>`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;
  width: ${props => props.width ?? '100%'};
  height: ${props => props.height ?? '6em'};
  margin-top: 10px;
  color: ${props => props.theme.textColor};
  border: none;
  outline: none;
  padding: 0.65em;
  background-color: ${props => props.dimBackground ? '#f8f9fa' : 'transparent'};
  resize: none;
  overflow-y: hidden;

  text-align: center;

  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  &:focus {
    box-shadow: #c44c49 0px -4px 0px 0px inset;
  }
`;

export const puzzleToSlidesMappings: PuzzleToSlideProducerMapping<EscapeRoomPuzzleDefinition> = {
  "multiple-choice": MultipleChoiceItemStageSlide
};

export type PuzzleToEditorProducerMapping<T extends EscapeRoomPuzzleDefinition> = {
  /** What type of puzzle we are working with here*/
  [P in T['type']]: {
    /** Generation logic to use to create a form editing component */
    editingComponentProducer: (editingFormProps: EditableItemProps<Extract<T, { type: P }>['payload']>) => JSX.Element;
    /** Default value for StagePayload */
    defaultStagePayload: Extract<T, { type: P }>['payload'];
  }
}

export const puzzleToEditorsMappings: PuzzleToEditorProducerMapping<EscapeRoomPuzzleDefinition> = {
  "multiple-choice": {
    editingComponentProducer: multipleChoiceItemFactory.editingComponent,
    defaultStagePayload: multipleChoiceItemFactory.defaultDefinition
  }
};

const sample_puzzle: EscapeRoomPuzzleDefinition = {
  entryPoint: {
    type: 'qr-scan',
    text: 'sample QR text'
  },
  type: 'multiple-choice',
  payload: {
    prompt: '',
    answers: []
  }
};

export interface EditableRoomItemContentProps extends EditableItemProps<RoomDefinition> {

} // EditableRoomItemContentProps

export const EditableRoomItemContent = (props: EditableRoomItemContentProps): JSX.Element => {

  const {
    payload,
    onPayloadChanged
  } = props;

  const {
    exitCode,
    puzzles,
    hints
  } = payload;

  const [selectedPuzzle, setSelectedPuzzle] = useState<number | 'room-settings'>('room-settings');

  const handleEditExitCode = (value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      exitCode: value
    })
  }; // handleEditExitCode

  const handleHintsChanged = (value: string[]) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      hints: value
    })
  }; // handleHintsChanged

  const handleAddPuzzle = () => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      puzzles: [
        ...puzzles,
        sample_puzzle
      ]
    });
  }; // handleAddPuzzle

  const handleDeletePuzzle = (index: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      puzzles: [
        ...puzzles.slice(0, index),
        ...puzzles.slice(index + 1, puzzles.length)
      ]
    });
  }; // handleDeletePuzzle

  const handleDuplicatePuzzle = (index: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      puzzles: [
        ...puzzles.slice(0, index + 1),
        puzzles[index],
        ...puzzles.slice(index + 1, puzzles.length)
      ]
    });
  }; // handleDuplicatePuzzle

  const handlePuzzlePayloadChanged = (index: number, puzzlePayload: EscapeRoomPuzzleDefinition['payload']) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      puzzles: [
        ...puzzles.slice(0, index),
        {
          ...puzzles[index],
          payload: puzzlePayload
        },
        ...puzzles.slice(index + 1, puzzles.length)
      ]
    });
  }; // handlePuzzlePayloadChanged

  const currentPuzzle = selectedPuzzle !== 'room-settings' ? puzzles[selectedPuzzle] : undefined;

  return (
    <>
      <RoomPuzzleSlidesContainer
        puzzleMappings={puzzleToSlidesMappings}
        selectedPuzzleIndex={selectedPuzzle}
        onSelectRoomSettings={() => setSelectedPuzzle('room-settings')}
        onSelectPuzzle={setSelectedPuzzle}
        puzzles={puzzles}
        onAddPuzzle={handleAddPuzzle}
      />
      {selectedPuzzle === 'room-settings' &&
        <RoomSettingsEditor
          hints={hints}
          exitCode={exitCode}
          onHintsChanged={handleHintsChanged}
          onExitCodeChanged={handleEditExitCode}
        />
      }
      {currentPuzzle && selectedPuzzle !== 'room-settings' && (
        <>
          <PuzzleEntryPointEditor />
          {puzzleToEditorsMappings[currentPuzzle.type].editingComponentProducer({
            payload: currentPuzzle.payload as any,
            onPayloadChanged: (value) => handlePuzzlePayloadChanged(selectedPuzzle, value)
          })}
        </>
      )}
    </>
  );
}; // EditableRoomItemContent

export const roomItemFactory: AbstractActivityItemFactory<RoomDefinition> = {
  editingComponent: (editingProps) => (
    <EditableRoomItemContent
      {...editingProps}
    />
  ),
  defaultDefinition: {
    exitCode: '',
    hints: [],
    puzzles: []
  }
}; // multipleChoiceItemFactory

export default EditableRoomItemContent;