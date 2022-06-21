import styled from "styled-components";
import { EditableItemProps, EscapeRoomPuzzleDefinition, RoomDefinition } from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";
import { PuzzleToSlideProducerMapping, RoomPuzzleSlidesContainer } from "./RoomPuzzleSlidesContainer";
import { MultipleChoiceItemStageSlide } from "./MutipleChoiceItem";
import { useState } from "react";
import { RoomSettingsEditor } from "./RoomSettingsEditor";

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

export const puzzleMappings: PuzzleToSlideProducerMapping<EscapeRoomPuzzleDefinition> = {
  "multiple-choice": MultipleChoiceItemStageSlide
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

  const handlePuzzleDefinitionChanged = (index: number, puzzleDefinition: EscapeRoomPuzzleDefinition) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      puzzles: [
        ...puzzles.slice(0, index),
        puzzleDefinition,
        ...puzzles.slice(index + 1, puzzles.length)
      ]
    });
  }; // handlePuzzleDefinitionChanged

  return (
    <>
      <RoomPuzzleSlidesContainer
        puzzleMappings={puzzleMappings}
        selectedPuzzleIndex={selectedPuzzle}
        onSelectRoomSettings={() => setSelectedPuzzle('room-settings')}
        onSelectPuzzle={setSelectedPuzzle}
        puzzles={puzzles}
        onAddPuzzle={handleAddPuzzle}
      />
      <RoomSettingsEditor
        hints={hints}
        exitCode={exitCode}
        onHintsChanged={handleHintsChanged}
        onExitCodeChanged={handleEditExitCode}
      />
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