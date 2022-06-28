import { default_puzzle, default_room, default_room_block, EditableItemProps, RoomBlock, RoomDefinition, SupportedPuzzle } from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";
import { multipleChoiceItemFactory, MultipleChoiceItemStageSlide } from "./MutipleChoiceItem";
import { waitingCodeItemFactory, WaitingCodeItemStageSlide } from "./WaitingCodeItem";
import { useState } from "react";
import { RoomSettingsEditor } from "./RoomSettingsEditor";
import { RoomPuzzleSettingsEditor } from "./RoomPuzzleSettingsEditor";
import { PuzzleEntryPointEditor } from "./PuzzleEntryPointEditor";
import { ItemToSlideProducerMapping, RoomBlockSlidesContainer } from "./RoomBlockSlidesContainer";
import { qrScanItemFactory, QRScanItemStageSlide } from "./QRScanItem";
import { pull } from "lodash";
import { arScanItemFactory, ARScanItemStageSlide } from "./ARScanItem";


import styled from "styled-components";
import {Download} from "@styled-icons/bootstrap/Download"


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

//Components for the button to download the QR
const DownloadButton = styled.div`

  position: relative;

  font-size: 1em;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;

 

  margin-top: 0.25em;
  margin-bottom: 0.25em;
  padding: 0.75em 1.25em;
  border-top: none;
  color: black;
  line-height: 135%;
  width: fit-content;
  text-align: center;

  display: flex;
  align-items: center;

  background-color: rgb(75, 170, 100);

  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  &:hover {
    transition: border 0.25s;
    border: 3px solid rgb(200, 200, 200);
  }

`;
const DownloadIcon = styled(Download)`
  color: ${props => props.theme.textColor};
  height: 1.75em;
  width: auto;
`;




export const puzzleToSlidesMappings: ItemToSlideProducerMapping<SupportedPuzzle> = {
  "multiple-choice": MultipleChoiceItemStageSlide,
  "waiting-code" : WaitingCodeItemStageSlide,
  "qr-scan" : QRScanItemStageSlide,
  "ar-scan" : ARScanItemStageSlide
}; // puzzleToSlidesMappings

export type PuzzleToEditorProducerMapping<T extends SupportedPuzzle> = {
  /** What type of puzzle we are working with here*/
  [P in T['type']]: {
    /** Generation logic to use to create a form editing component */
    editingComponentProducer: (editingFormProps: EditableItemProps<Extract<T, { type: P }>['payload']>) => JSX.Element;
    /** Default value for StagePayload */
    defaultStagePayload: Extract<T, { type: P }>['payload'];
  }
}; // PuzzleToEditorProducerMapping

export const puzzleToEditorsMappings: PuzzleToEditorProducerMapping<SupportedPuzzle> = {
  "multiple-choice": {
    editingComponentProducer: multipleChoiceItemFactory.editingComponent,
    defaultStagePayload: multipleChoiceItemFactory.defaultDefinition
  },
  "waiting-code": {
    editingComponentProducer: waitingCodeItemFactory.editingComponent,
    defaultStagePayload: waitingCodeItemFactory.defaultDefinition
  },
  "qr-scan": {
    editingComponentProducer: qrScanItemFactory.editingComponent,
    defaultStagePayload: qrScanItemFactory.defaultDefinition
  },
  "ar-scan": {
    editingComponentProducer: arScanItemFactory.editingComponent,
    defaultStagePayload: arScanItemFactory.defaultDefinition
  }
}; // puzzleToEditorsMappings

export interface EditableRoomItemContentProps extends EditableItemProps<RoomDefinition> {

} // EditableRoomItemContentProps

export const EditableRoomItemContent = (props: EditableRoomItemContentProps): JSX.Element => {

  const {
    payload,
    onPayloadChanged
  } = props;

  const {
    exitBlock,
    blocks,
    hints
  } = payload;

  const [selectedBlock, setSelectedBlock] = useState<number | 'room-settings'>('room-settings');

  const handleHintsChanged = (value: string[]) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      hints: value
    })
  }; // handleHintsChanged

  const handleAddBlock = () => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      blocks: [
        ...blocks,
        default_room_block
      ]
    });
  }; // handleAddBlock

  const handleDeleteBlock = (index: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      blocks: [
        ...blocks.slice(0, index),
        ...blocks.slice(index + 1, blocks.length)
      ]
    });
  }; // handleDeleteBlock

  const handleDuplicateBlock = (index: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      blocks: [
        ...blocks.slice(0, index + 1),
        blocks[index],
        ...blocks.slice(index + 1, blocks.length)
      ]
    });
  }; // handleDuplicateBlock


  const handleDuplicatePuzzle = (blockIndex: number, puzzleIndex: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      blocks: [
        ...blocks.slice(0, blockIndex),
        {
          ...blocks[blockIndex],
          puzzles: [
            ...blocks[blockIndex].puzzles.slice(0, puzzleIndex +1),
            blocks[blockIndex].puzzles[puzzleIndex],
            ...blocks[blockIndex].puzzles.slice(puzzleIndex + 1, blocks[blockIndex].puzzles.length)
          ]
        },
        ...blocks.slice(blockIndex + 1, blocks.length)
      ]
    });
  }

  const handleDeletePuzzle = (blockIndex: number, puzzleIndex: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      blocks: [
        ...blocks.slice(0, blockIndex),
        {
          ...blocks[blockIndex],
          puzzles: [
            ...blocks[blockIndex].puzzles.slice(0, puzzleIndex),
            ...blocks[blockIndex].puzzles.slice(puzzleIndex + 1, blocks[blockIndex].puzzles.length)
          ]
        },
        ...blocks.slice(blockIndex + 1, blocks.length)
      ]
    });
  }


  const handlePuzzlePayloadChanged = (blockIndex: number, puzzleIndex: number, puzzlePayload: SupportedPuzzle['payload']) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      blocks: [
        ...blocks.slice(0, blockIndex),
        {
          ...blocks[blockIndex],
          puzzles: [
            ...blocks[blockIndex].puzzles.slice(0, puzzleIndex),
            {
              ...blocks[blockIndex].puzzles[puzzleIndex],
              payload: puzzlePayload
            },
            ...blocks[blockIndex].puzzles.slice(puzzleIndex + 1, blocks[blockIndex].puzzles.length)
          ]
        },
        ...blocks.slice(blockIndex + 1, blocks.length)
      ] as RoomBlock[]
    });
  }; // handlePuzzlePayloadChanged

  const handlePuzzleTypeChanged = (blockIndex: number, puzzleIndex: number, puzzleNewType: SupportedPuzzle['type']) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      blocks: [
        ...blocks.slice(0, blockIndex),
        {
          ...blocks[blockIndex],
          puzzles: [
            ...blocks[blockIndex].puzzles.slice(0, puzzleIndex),
            {
              ...blocks[blockIndex].puzzles[puzzleIndex],
              type: puzzleNewType,
              payload: puzzleToEditorsMappings[puzzleNewType].defaultStagePayload
            },
            ...blocks[blockIndex].puzzles.slice(puzzleIndex + 1, blocks[blockIndex].puzzles.length)
          ]
        },
        ...blocks.slice(blockIndex + 1, blocks.length)
      ] as RoomBlock[]
    });
  }; // handlePuzzlePayloadChanged


  const handleAddNewPuzzle = (blockIndex:number, puzzleIndex: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      blocks: [
        ...blocks.slice(0, blockIndex),
        {
          ...blocks[blockIndex],
          puzzles: [
            ...blocks[blockIndex].puzzles.slice(0, puzzleIndex+1),
            default_puzzle,
            ...blocks[blockIndex].puzzles.slice(puzzleIndex + 1, blocks[blockIndex].puzzles.length)
          ]
        },
        ...blocks.slice(blockIndex + 1, blocks.length)
      ]
    });
  }


  const currentBlock = selectedBlock !== 'room-settings' ? blocks[selectedBlock] : undefined;

  return (
    <>
    {/* List of blocks on the top of the editor */}
      <RoomBlockSlidesContainer
        itemMappings={puzzleToSlidesMappings}
        selectedBlockIndex={selectedBlock}
        onSelectRoomSettings={() => setSelectedBlock('room-settings')}
        onSelectBlock={setSelectedBlock}
        onAddBlock={handleAddBlock}
        onDeleteBlock = {handleDeleteBlock}
        onDuplicateBlock = {handleDuplicateBlock}
        onDuplicatePuzzle = {handleDuplicatePuzzle}
        blocks={blocks}
      />

      {/* Editor for the room specific settings */}
      {selectedBlock === 'room-settings' &&
        <RoomSettingsEditor
          hints={hints}
          onHintsChanged={handleHintsChanged}
        />
      }

      {/* Entry point of the block and sequence of puzzles after that */}
      {currentBlock && selectedBlock !== 'room-settings' && (
        <>

          {/* Sequence of editors to configure a rooms block of puzzles */}
          {currentBlock.puzzles.map((puzzle, i) => (

           <RoomPuzzleSettingsEditor puzzle={puzzle} index = {i} 
            handlePuzzlePayloadChanged = {(value)=>{handlePuzzlePayloadChanged(selectedBlock,i,value)}}
            handlePuzzleTypeChanged = {(value) => {handlePuzzleTypeChanged(selectedBlock,i,value)}}
            handlePuzzleDelete = {() => {handleDeletePuzzle(selectedBlock,i)}} 
            handlePuzzleDuplicate = {() => {handleDuplicatePuzzle(selectedBlock,i)}}
            handleAddNewPuzzle = {(value) => {handleAddNewPuzzle(selectedBlock,value)}}
            />
           ))}

            {/* <DownloadButton onClick={() =>{handleAddNewPuzzle(selectedBlock.toString() === 'room-settings' ? 0 : selectedBlock as number, 0)}}>
                <DownloadIcon/>
            </DownloadButton>   */}
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
  defaultDefinition: default_room
}; // roomItemFactory

export default EditableRoomItemContent;