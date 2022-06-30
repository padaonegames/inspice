import { useState } from "react";
import { default_puzzle, default_room, default_room_block, EditableItemProps, RoomBlock, RoomDefinition, SupportedPuzzle } from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";

import { multipleChoiceItemFactory, MultipleChoiceItemStageSlide } from "./MutipleChoiceItem";
import { waitingCodeItemFactory, WaitingCodeItemStageSlide } from "./WaitingCodeItem";
import { arScanItemFactory, ARScanItemStageSlide } from "./ARScanItem";
import { qrScanItemFactory, QRScanItemStageSlide } from "./QRScanItem";
import { loadSceneItemFactory, LoadSceneItemStageSlide } from "./LoadSceneItem";
import { narrativeItemFactory, NarrativeItemStageSlide } from "./NarrativeItem";
import { unlockPasswordItemFactory, UnlockPasswordItemStageSlide } from "./UnlockPasswordtem";

import { RoomSettingsEditor } from "./RoomSettingsEditor";
import { RoomPuzzleSettingsEditor } from "./RoomPuzzleSettingsEditor";
import { ItemToSlideProducerMapping, RoomBlockSlidesContainer } from "./RoomBlockSlidesContainer";
import { PromptField } from "./PromptField";


import styled from "styled-components";
import {Download} from "@styled-icons/bootstrap/Download"
import {AddCircle} from "@styled-icons/fluentui-system-regular/AddCircle"



const SettingsContainer = styled.div`
  position:relative;
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

interface SelectedProps {
  selected: boolean;
}

const Selected = styled.div<SelectedProps>`
  position: absolute;
  top: 5%;
  right: 5%;
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

  background-color: ${props => props.selected ? "yellow" : "white"};

  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // background-color:  rgba(255,0,0,1);
`;

//Components for the button to add a new Puzzle to the room block
const AddPuzzleButton = styled.div`

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
  
  display: flex;
  text-align: center;
  align-items: center;

  background-color: rgb(255, 255, 255);

  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  &:hover {
    transition: border 0.25s;
    border: 3px solid rgb(200, 200, 200);
  }

`;

const AddPuzzleIcon = styled(AddCircle)`
  color: ${props => props.theme.textColor};
  height: 1.75em;
  width: auto;
`;

const HintsIcon = styled(Download)`
  color: ${props => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.5em;
`;

const SelectedIcon = styled(Download)`
  color: ${props => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.5em;
`;

export const puzzleToSlidesMappings: ItemToSlideProducerMapping<SupportedPuzzle> = {
  "multiple-choice": MultipleChoiceItemStageSlide,
  "waiting-code" : WaitingCodeItemStageSlide,
  "qr-scan" : QRScanItemStageSlide,
  "ar-scan" : ARScanItemStageSlide,
  "load-scene": LoadSceneItemStageSlide,
  "narrative": NarrativeItemStageSlide,
  "unlock-password": UnlockPasswordItemStageSlide
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
  },
  "load-scene": {
    editingComponentProducer: loadSceneItemFactory.editingComponent,
    defaultStagePayload: loadSceneItemFactory.defaultDefinition
  },
  "narrative":{
    editingComponentProducer: narrativeItemFactory.editingComponent,
    defaultStagePayload: narrativeItemFactory.defaultDefinition
  },
  "unlock-password":{
    editingComponentProducer: unlockPasswordItemFactory.editingComponent,
    defaultStagePayload: unlockPasswordItemFactory.defaultDefinition
  },
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
  const [selectedPuzzleIndex, setSelectedPuzzleIndex] = useState<number>(-1);
  const [exitBlockIndex, setExitBlockIndex] = useState<number>(-1);

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
  }  //handleChangeBlockName

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
  }  //handleChangeBlockDescription

  const handleChangeExitBlock = (index:number) =>{
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      exitBlock:payload.blocks[index] 
    });

    setExitBlockIndex(index);
  }  //handleChangeExitBlock

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


  const handleSelectedPuzzleIndexChanged = (index:number) => {
    setSelectedPuzzleIndex(index);
  }


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
    {/* Top side of the screen with slides that represent the blocks avaliable in this room */}
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


      {/* Body of the screen with the editor of the specifcc block thar we are editing  */}
      {/* Editor for the room specific settings */}
      {selectedBlock === 'room-settings' &&
        <RoomSettingsEditor
          hints={hints}
          onHintsChanged={handleHintsChanged}
        />
      }

      {/* Sequence of puzzles that are avaliable in a specific room block */}
      {currentBlock && selectedBlock !== 'room-settings' && (
        <>
        {/* Element that contains the information relative to the room block */}
          <SettingsContainer onMouseEnter={ () => {setSelectedPuzzleIndex(-1)}}>
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
          

            {/* Button to control the block that lets you continue in the adventure */}
            <Selected  onClick={() => {handleChangeExitBlock(selectedBlock)}} selected ={selectedBlock === exitBlockIndex} >
              <SelectedIcon />
              Exit Block
            </Selected>

          </SettingsContainer>

          {/* In case we want to add a puzzle at the beginning of the room block*/}
          {selectedPuzzleIndex === -1 && (
            <CenteredContainer>
              <AddPuzzleButton onClick={() =>{handleAddNewPuzzle(selectedBlock,-1)}}>
                <AddPuzzleIcon/>
              </AddPuzzleButton>  
            </CenteredContainer>
          )}


          {/* Sequence of editors to configure a room's block of puzzles */}
          {currentBlock.puzzles.map((puzzle, i) => (
            <>
           <RoomPuzzleSettingsEditor puzzle={puzzle} index = {i} 
            handlePuzzlePayloadChanged = {(value)=>{handlePuzzlePayloadChanged(selectedBlock,i,value)}}
            handlePuzzleTypeChanged = {(value) => {handlePuzzleTypeChanged(selectedBlock,i,value)}}
            handlePuzzleDelete = {() => {handleDeletePuzzle(selectedBlock,i)}} 
            handlePuzzleDuplicate = {() => {handleDuplicatePuzzle(selectedBlock,i)}}
            handleSelectedPuzzleChanged = {() => {handleSelectedPuzzleIndexChanged(i)}}
            />

            {/* Button that allows to add a new puzzle right after the one specified by "selectedPuzzleIndex" */}
            {i === selectedPuzzleIndex ? 
              <>
                <CenteredContainer>
                  <AddPuzzleButton onClick={() =>{handleAddNewPuzzle(selectedBlock,i)}}>
                    <AddPuzzleIcon/>
                  </AddPuzzleButton>  
                </CenteredContainer>
              </> : 
              <></>}
            </>
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