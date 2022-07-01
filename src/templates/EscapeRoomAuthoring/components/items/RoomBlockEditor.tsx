import { useState } from "react";
import EditableCheckBoxInput from "../EditableCheckBoxInput";
import { PromptField } from "./PromptField";


import styled from "styled-components";
import {Download} from "@styled-icons/bootstrap/Download"
import {AddCircle} from "@styled-icons/fluentui-system-regular/AddCircle"
import { Question } from "@styled-icons/evil/Question";
import { Password } from "@styled-icons/fluentui-system-regular/Password";
import { default_puzzle, default_room, default_room_block, EditableItemProps, RoomBlock, RoomDefinition, SupportedPuzzle } from "../../../../services/escapeRoomActivity.model";

import { RoomPuzzleSettingsEditor } from "./RoomPuzzleSettingsEditor";
import { puzzleToEditorsMappings } from "./RoomItem";

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

export interface RoomBlockEditorProps {
  block: RoomBlock;
  blockIndex:number,
  onPayloadChanged: (blockIndex:number, exitBlock:RoomBlock)=>void;
}

export const RoomBlockEditor = (props: RoomBlockEditorProps): JSX.Element => {

  const {
    block,
    blockIndex,
    onPayloadChanged
  } = props;

  const [selectedPuzzleIndex, setSelectedPuzzleIndex] = useState<number>(-1);


  /////////////////////////////Methods to manipulate the entire block data //////////////////////
  const handleChangeBlockName = (name: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged(blockIndex,
      {
      ...block,
      blockName:name
    });
  }  //handleChangeBlockName

  const handleChangeBlockDescription = (description: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged(blockIndex,
      {
      ...block,
      blockDescription:description
    });
  }  //handleChangeBlockDescription

  /////////////////////////////Methods to manipulate the entire block data //////////////////////

  /////////////////////////////Methods to manipulate the puzzles inside this block
const handleDuplicatePuzzle = (puzzleIndex: number) => {
  if (!onPayloadChanged) return;
  onPayloadChanged(blockIndex,
    {
    ...block,
        puzzles: [
          ...block.puzzles.slice(0, puzzleIndex +1),
          block.puzzles[puzzleIndex],
          ...block.puzzles.slice(puzzleIndex + 1, block.puzzles.length)
        ]
  });
} //handleDuplicatePuzzle

const handleDeletePuzzle = (puzzleIndex: number) => {
  if (!onPayloadChanged) return;
  onPayloadChanged(blockIndex,
    {
    ...block,
    puzzles: [
      ...block.puzzles.slice(0, puzzleIndex),
      ...block.puzzles.slice(puzzleIndex + 1, block.puzzles.length)
    ]
  });
} //handleDeletePuzzle

const handlePuzzlePayloadChanged = (puzzleIndex: number, puzzlePayload: SupportedPuzzle['payload']) => {
  if (!onPayloadChanged) return;
  onPayloadChanged(blockIndex, 
    {
    ...block,
        puzzles: [
          ...block.puzzles.slice(0, puzzleIndex),
          {
            ...block.puzzles[puzzleIndex],
            payload: puzzlePayload
          },
          ...block.puzzles.slice(puzzleIndex + 1, block.puzzles.length)
        ]as SupportedPuzzle[]
  });
}; // handlePuzzlePayloadChanged

const handlePuzzleTypeChanged = ( puzzleIndex: number, puzzleNewType: SupportedPuzzle['type']) => {
  if (!onPayloadChanged) return;
  onPayloadChanged(blockIndex,
    {
    ...block,
        puzzles: [
          ...block.puzzles.slice(0, puzzleIndex),
          {
            ...block.puzzles[puzzleIndex],
            type: puzzleNewType,
            payload: puzzleToEditorsMappings[puzzleNewType].defaultStagePayload
          },
          ...block.puzzles.slice(puzzleIndex + 1, block.puzzles.length)
        ] as SupportedPuzzle[]
  });
}; // handlePuzzleTypeChanged


const handleSelectedPuzzleIndexChanged = (index:number) => {
  setSelectedPuzzleIndex(index);
}

const handleAddNewPuzzle = (puzzleIndex: number) => {
  if (!onPayloadChanged) return;
  onPayloadChanged(blockIndex,
    {
    ...block,
    puzzles: [
      ...block.puzzles.slice(0, puzzleIndex+1),
      default_puzzle,
      ...block.puzzles.slice(puzzleIndex + 1,block.puzzles.length)
    ]
  });
} //handleAddNewPuzzle

  /////////////////////////////Methods to manipulate the puzzles inside this block


  return (
<>
        {/* Element that contains the information relative to the room block */}
          <SettingsContainer onMouseEnter={ () => {setSelectedPuzzleIndex(-1)}}>
            <TitleContainer>
              <HintsIcon />
              Block Title
            </TitleContainer>
            <PromptField promptText={block.blockName} promptPlaceholder='Give this block a title' onPromptChange={(value) => {handleChangeBlockName(value)}} />
            <TitleContainer>
              <HintsIcon />
              Block Description
            </TitleContainer>
            <PromptField promptText={block.blockDescription} promptPlaceholder='Give this block a description' onPromptChange={(value) => {handleChangeBlockDescription(value)}} />

          </SettingsContainer>

          {/* In case we want to add a puzzle at the beginning of the room block*/}
          {selectedPuzzleIndex === -1 && (
            <CenteredContainer>
              <AddPuzzleButton onClick={() =>{handleAddNewPuzzle(-1)}}>
                <AddPuzzleIcon/>
              </AddPuzzleButton>  
            </CenteredContainer>
          )}


          {/* Sequence of editors to configure a room's block of puzzles */}
          {block.puzzles.map((puzzle, i) => (
            <>
           <RoomPuzzleSettingsEditor puzzle={puzzle} index = {i} 
            handlePuzzlePayloadChanged = {(value)=>{handlePuzzlePayloadChanged(i,value)}}
            handlePuzzleTypeChanged = {(value) => {handlePuzzleTypeChanged(i,value)}}
            handlePuzzleDelete = {() => {handleDeletePuzzle(i)}} 
            handlePuzzleDuplicate = {() => {handleDuplicatePuzzle(i)}}
            handleSelectedPuzzleChanged = {() => {handleSelectedPuzzleIndexChanged(i)}}
            />

            {/* Button that allows to add a new puzzle right after the one specified by "selectedPuzzleIndex" */}
            {i === selectedPuzzleIndex ? 
              <>
                <CenteredContainer>
                  <AddPuzzleButton onClick={() =>{handleAddNewPuzzle(i)}}>
                    <AddPuzzleIcon/>
                  </AddPuzzleButton>  
                </CenteredContainer>
              </> : 
              <></>}
            </>
           ))}
        </>
  );
}; // RoomSettingsEditor