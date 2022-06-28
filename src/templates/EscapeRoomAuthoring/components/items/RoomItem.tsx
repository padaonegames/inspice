import { default_puzzle, default_room, default_room_block, EditableItemProps, RoomBlock, RoomDefinition, SupportedPuzzle } from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";
import { multipleChoiceItemFactory, MultipleChoiceItemStageSlide } from "./MutipleChoiceItem";
import { waitingCodeItemFactory, WaitingCodeItemStageSlide } from "./WaitingCodeItem";
import { useState } from "react";
import { RoomSettingsEditor } from "./RoomSettingsEditor";
import { RoomPuzzleSettingsEditor } from "./RoomPuzzleSettingsEditor";
import { ItemToSlideProducerMapping, RoomBlockSlidesContainer } from "./RoomBlockSlidesContainer";
import { qrScanItemFactory, QRScanItemStageSlide } from "./QRScanItem";
import { arScanItemFactory, ARScanItemStageSlide } from "./ARScanItem";


import styled from "styled-components";
import {Download} from "@styled-icons/bootstrap/Download"
import { PromptField } from "./PromptField";


const SettingsContainer = styled.div`
  margin-top: 5px;
  display: flex;
  background-color: transparent;
  flex-direction: column;
  align-items: left;

  border-bottom: 2px solid #dadce0;
  padding: 0.75em;

  background-color:  #dbdbdb;

  border-radius: 1.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const TitleContainer = styled.div`
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

  background-color: white;

  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const HintsIcon = styled(Download)`
  color: ${props => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.5em;
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


    //////////////////////////////Methods to manipulate room settings ////////////////////////////


  const handleHintsChanged = (value: string[]) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      hints: value
    })
  }; // handleHintsChanged

  //////////////////////////////Methods to manipulate room settings ////////////////////////////



  //////////////////////////////Methods to manipulate entire blocks ////////////////////////////

  const handleChangeBlockName = (index:number, name: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      blocks: [
        ...blocks.slice(0, index),
        { ...blocks[index],
          blockName: name
        },
        ...blocks.slice(index + 1, blocks.length)
      ]
    });
  }

  const handleChangeBlockDescription = (index:number, description: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      blocks: [
        ...blocks.slice(0, index),
        { ...blocks[index],
          blockDescription: description
        },
        ...blocks.slice(index + 1, blocks.length)
      ]
    });
  }

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

  //////////////////////////////Methods to manipulate entire blocks ////////////////////////////


  //////////////////////////////Methods to manipulate block puzzles////////////////////////////

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
  } //handleDuplicatePuzzle

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
  } //handleDeletePuzzle


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
  }; // handlePuzzleTypeChanged


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
  } //handleAddNewPuzzle

  //////////////////////////////Methods to manipulate block puzzles////////////////////////////


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

          <SettingsContainer>
            {/* Block name and description */}
            <TitleContainer>
              <HintsIcon />
              Block Title
            </TitleContainer>
            <PromptField promptText={currentBlock.blockName} promptPlaceholder='Give this block a title' onPromptChange={(value) => {handleChangeBlockName(selectedBlock, value)}} />
            <TitleContainer>
              <HintsIcon />
              Block Description
            </TitleContainer>
            <PromptField promptText={currentBlock.blockDescription} promptPlaceholder='Give this block a description' onPromptChange={(value) => {handleChangeBlockDescription(selectedBlock, value)}} />
          </SettingsContainer>

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