import { useEffect, useState } from "react";
import { Question } from "@styled-icons/evil/Question";
import { multipleChoiceItemFactory } from "./MutipleChoiceItem";
import { waitingCodeItemFactory } from "./WaitingCodeItem";
import { qrScanItemFactory } from "./QRScanItem";
import { arScanItemFactory } from "./ARScanItem";
import { AvailableEscapeRoomStageType, escapeRoomStageTypes,escapeRoomPuzzleTypes, SupportedStage, SupportedPuzzle, EditableItemProps } from "../../../../services/escapeRoomActivity.model";

import {stageMappings} from "../../Screen"


import styled, { css } from "styled-components";
import { Delete } from '@styled-icons/fluentui-system-regular/Delete';
import {Copy} from "@styled-icons/boxicons-regular/Copy";
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import {Download} from "@styled-icons/bootstrap/Download"




const HintsIcon = styled(Question)`
  color: ${props => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.5em;
`;


const CheckboxTitle = styled.div`
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

const PuzzleCard = styled.div`
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

const HorizontalContainer = styled.div`
  display: flex;
  background-color: transparent;
  flex-direction: row;
  align-items: left;
  // background-color: rgb(0,0,255);
  border-bottom: 2px solid #dadce0;

  border-radius: 1.25rem;
`;

const HorizontalLine = styled.div`
  display: flex;
  border-bottom: 2px solid #dadce0;
  width: 100%;
  height: 1px;
  background-color:  rgb(180,180,180);
  padding-top: 1px;
`;


////////////////////////////////////////////////////////////////////////////////////////

export const fieldTypeIcon = css`
  color: ${props => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.75em;
`;


// const HorizontalLine = styled.div`
//   height: 1px;
//   width: 100;
//   padding-top: 0.5em;
//   border-style: solid;
//   border-color: rgb(255,0,0);
//   border-width: 0px 2px 0px 0px;
//   margin: 0 0.5em;
// `;

const DeleteIcon = styled(Delete)`
  ${fieldTypeIcon}
  cursor: pointer;
`;

const CopyIcon = styled(Copy)`
  ${fieldTypeIcon}
  cursor: pointer;
`;


//DropDown

const ExpandDropdownIcon = styled(ChevronDown)`
  ${fieldTypeIcon}
  margin-left: auto;
`;

const DropdownMenu = styled.div`
  position: absolute;
  left: 0;
  top: 2.5em;
  background-color: ${props => props.theme.cardBackground};
  min-width: 160px;
  width: 100%;
  box-shadow: rgba(37, 7, 107, 0.35) 0px 2px 4px 0px;
  z-index: 25;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
`;

const DropdownMenuItem = styled.a`
  color: ${props => props.theme.textColor};
  padding: 0.5em 0.85em;
  margin-top: 0.2em;
  margin-bottom: 0.2em;
  text-decoration: none;
  height: 2.5em;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  font-family: ${props => props.theme.contentFont};

  &:hover {
    background-color: #eeeeee;
  }
`;

const SelectFieldTypeDropdownButton = styled.span`
  position: absolute;
  right:0;
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;
  margin-top: 10px;
  cursor: pointer;
  color: ${props => props.theme.textColor};

  position: relative;

  height: 2.5em;
  width: 50%;

  background-color: transparent;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.1rem 0px;
  border: 1px solid #dadce0;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.85em;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 0.25rem 0px;
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



export interface RoomPuzzleSettingsEditorProps {

  puzzle: SupportedPuzzle;
  index: number;
  /** callback to parent component notifying that the user wants to change a puzzle's settings */
  handlePuzzlePayloadChanged: (puzzlePayload: SupportedPuzzle['payload']) => void;
  /** callback to parent component notifying that the user wants to change the type of a puzzle */
  handlePuzzleTypeChanged: (puzzleNewType: SupportedPuzzle['type']) => void;
  /** callback to parent component notifying that the user wants to delete a puzzle */
  handlePuzzleDelete: () => void;
  /** callback to parent component notifying that the user wants to duplicate a puzzle */
  handlePuzzleDuplicate: () => void;

  handleAddNewPuzzle: (index:number) =>void;
}

export const RoomPuzzleSettingsEditor = (props: RoomPuzzleSettingsEditorProps): JSX.Element => {

  const {
    puzzle,
    index,
    handlePuzzlePayloadChanged,
    handlePuzzleTypeChanged,
    handlePuzzleDelete,
    handlePuzzleDuplicate,
    handleAddNewPuzzle
  } = props;

  const [stageTypeDropdownOpen, setStageTypeDropdownOpen] = useState<boolean>(false);
  const [currentTypeSelected, setCurrentTypeSelected] = useState<string | undefined>("Select a stage type");
  const [showAddPuzzle, setShowAddPuzzle] = useState<boolean>(false);

  useEffect(() => {
    setCurrentTypeSelected(stageMappings[puzzle.type].displayName ? stageMappings[puzzle.type].displayName :"Select a stage type");
    return () => {}

  }, [puzzle]);

  return (
    <>

      <PuzzleCard  onMouseEnter={ () => setShowAddPuzzle(true)}  onMouseLeave = { () => setShowAddPuzzle(false)} >

        <HorizontalContainer>
          <CheckboxTitle>
            <HintsIcon />
            Puzzle number {index+1}
          </CheckboxTitle>
          <SelectFieldTypeDropdownButton onClick={() => setStageTypeDropdownOpen(prev => !prev)}>
            {<HintsIcon/>}{ currentTypeSelected } <ExpandDropdownIcon />
            {stageTypeDropdownOpen &&
              <DropdownMenu>
                {escapeRoomPuzzleTypes.map((elem, i) => (
                  <DropdownMenuItem onClick={() => {handlePuzzleTypeChanged(elem); setCurrentTypeSelected(stageMappings[elem].displayName ? stageMappings[elem].displayName :"Select a stage type")}}>
                    {stageMappings[elem].iconComponent}
                    {stageMappings[elem].displayName ?? elem}
                  </DropdownMenuItem>
                ))}
              </DropdownMenu>}
          </SelectFieldTypeDropdownButton>
        </HorizontalContainer>

        <HorizontalLine/>


        {/* Puzzle Editor */}
        {
          stageMappings[puzzle.type].editingComponentProducer({
            payload: puzzle.payload as any,
            onPayloadChanged: (value) => handlePuzzlePayloadChanged(value)
          })
        }

        {/* Buttons to duplicate and delete a puzzle from a room block */}
        <HorizontalLine/>
        <HorizontalContainer>
          <DeleteIcon onClick={ () => {handlePuzzleDelete()}}/>
          <CopyIcon onClick={() => {handlePuzzleDuplicate()}} />
        </HorizontalContainer>

        { showAddPuzzle ? 
        <>
        <DownloadButton onClick={() =>{handleAddNewPuzzle(index)}}>
                <DownloadIcon/>
        </DownloadButton>  
        </>
        : <></>}

      </PuzzleCard>
      
    </>
  );
}; // RoomSettingsEditor