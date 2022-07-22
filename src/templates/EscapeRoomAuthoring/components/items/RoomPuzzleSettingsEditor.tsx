import { useEffect, useState } from "react";
import { Question } from "@styled-icons/evil/Question";
import { multipleChoiceItemFactory } from "./MutipleChoiceItem";
import { waitingCodeItemFactory } from "./WaitingCodeItem";
import { qrScanItemFactory } from "./QRScanItem";
import { arScanItemFactory } from "./ARScanItem";
import {
  AvailableEscapeRoomStageType,
  escapeRoomStageTypes,
  escapeRoomPuzzleTypes,
  SupportedStage,
  SupportedPuzzle,
  EditableItemProps,
} from "../../../../services/escapeRoomActivity.model";

import { stageMappings } from "../../Screen";

import styled, { css } from "styled-components";
import { DeleteForever } from "@styled-icons/material-twotone/DeleteForever";
import { Copy } from "@styled-icons/boxicons-regular/Copy";
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { Download } from "@styled-icons/bootstrap/Download";
import { AddCircle } from "@styled-icons/fluentui-system-regular/AddCircle";
import { Puzzle } from "@styled-icons/heroicons-outline/Puzzle";

const PuzzleIcon = styled(Puzzle)`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.5em;
`;

const CheckboxTitle = styled.div`
  font-size: 1em;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;

  border-top: none;
  margin-left: 1rem;
  color: black;
  line-height: 135%;
  width: fit-content;
  text-align: center;

  display: flex;
  align-items: center;

  // background-color: white;

  // border-radius: 1rem;
  // box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const PuzzleCard = styled.div`
  position: relative;
  margin-top: 5px;
  display: flex;
  background-color: transparent;
  flex-direction: column;
  align-items: left;
  width: 90%;

  border-bottom: 2px solid #dadce0;
  padding: 0.75em;
  background-color: white;
  border-radius: 0.5rem;

  margin: 2rem 0 0rem 0;
  &:hover {
    border-left: 6px solid rgb(19, 104, 206);
  }
`;

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  flex-direction: row;
  // background-color: rgb(0, 0, 255);
  padding: 0 0 10px 0;
`;

const BottomContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: right;
  padding-top: 0.5rem;
  background-color: transparent;
`;

const ButtonContainer = styled.div`
  padding: 0.75em;
  background-color: transparent;
  border-radius: 1.5rem;
  &:hover {
    background-color: rgba(180, 180, 180, 1);
    // box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
    // border-bottom: 2px solid #dadce0;
  }
`;

const HorizontalLine = styled.div`
  display: flex;
  border-bottom: 2px solid #dadce0;
  width: 100%;
  height: 1px;
  background-color: rgb(180, 180, 180);
  padding-top: 1px;
`;

////////////////////////////////////////////////////////////////////////////////////////

export const fieldTypeIcon = css`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
`;

const DeleteIcon = styled(DeleteForever)`
  height: 1.75em;
  width: 1.75em;
  border-radius: 0.25rem;
  background-color: rgb(19, 104, 206);
  border: 2px solid rgb(15, 90, 188);
  cursor: pointer;
  margin-right: 0.5rem;

  color: white;
  &:hover {
    background-color: rgb(49, 134, 236);
  }
`;

const CopyIcon = styled(Copy)`
  height: 1.75em;
  width: 1.75em;
  border-radius: 0.25rem;
  background-color: rgb(19, 104, 206);
  border: 2px solid rgb(15, 90, 188);
  cursor: pointer;
  margin-right: 0.5rem;

  color: white;
  &:hover {
    background-color: rgb(49, 134, 236);
  }
`;

//DropDown

const ExpandDropdownIcon = styled(ChevronDown)`
  ${fieldTypeIcon}
  margin-left: auto;
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 2.5em;
  background-color: ${(props) => props.theme.cardBackground};
  min-width: 160px;
  width: 100%;
  box-shadow: rgba(37, 7, 107, 0.35) 0px 2px 4px 0px;
  z-index: 25;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
`;

const DropdownMenuItem = styled.a`
  color: ${(props) => props.theme.textColor};
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
  font-family: ${(props) => props.theme.contentFont};

  &:hover {
    background-color: #eeeeee;
  }
`;

const SelectFieldTypeDropdownButton = styled.span`
  position: absolute;
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};

  position: relative;
  height: 2.5em;
  width: 50%;
  background-color: rgb(250, 250, 250);
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
const AddPuzzleButton = styled.div`
  position: relative;

  font-size: 1em;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
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

  background-color: rgb(255, 255, 255);

  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  &:hover {
    transition: border 0.25s;
    border: 3px solid rgb(200, 200, 200);
  }
`;
const DownloadIcon = styled(Download)`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: auto;
`;

const AddPuzzleIcon = styled(AddCircle)`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: auto;
`;

export interface RoomPuzzleSettingsEditorProps {
  puzzle: SupportedPuzzle;
  index: number;
  /** callback to parent component notifying that the user wants to change a puzzle's settings */
  handlePuzzlePayloadChanged: (
    puzzlePayload: SupportedPuzzle["payload"]
  ) => void;
  /** callback to parent component notifying that the user wants to change the type of a puzzle */
  handlePuzzleTypeChanged: (puzzleNewType: SupportedPuzzle["type"]) => void;
  /** callback to parent component notifying that the user wants to delete a puzzle */
  handlePuzzleDelete: () => void;
  /** callback to parent component notifying that the user wants to duplicate a puzzle */
  handlePuzzleDuplicate: () => void;

  handleSelectedPuzzleChanged: () => void;
}

export const RoomPuzzleSettingsEditor = (
  props: RoomPuzzleSettingsEditorProps
): JSX.Element => {
  const {
    puzzle,
    index,
    handlePuzzlePayloadChanged,
    handlePuzzleTypeChanged,
    handlePuzzleDelete,
    handlePuzzleDuplicate,
    handleSelectedPuzzleChanged,
  } = props;

  const [stageTypeDropdownOpen, setStageTypeDropdownOpen] =
    useState<boolean>(false);

  const [selectedPuzzleType, setSelectedPuzzleType] = useState<number>(-1);

  return (
    <PuzzleCard onMouseEnter={() => handleSelectedPuzzleChanged()}>
      {/* Upper side of the card (Title and selector) */}
      <HeaderContainer>
        <CheckboxTitle>
          <PuzzleIcon />
          Puzzle number {index + 1}
        </CheckboxTitle>
        <SelectFieldTypeDropdownButton
          onClick={() => setStageTypeDropdownOpen((prev) => !prev)}
        >
          {/* If a puzzle is selected, its name and icon are displayed, if not, a message to select one */}
          {selectedPuzzleType === -1 ? (
            "Select a stage type"
          ) : (
            <>
              {
                stageMappings[escapeRoomPuzzleTypes[selectedPuzzleType]]
                  .iconComponent
              }
              {
                stageMappings[escapeRoomPuzzleTypes[selectedPuzzleType]]
                  .displayName
              }
            </>
          )}
          <ExpandDropdownIcon />
          {stageTypeDropdownOpen && (
            <DropdownMenu>
              {escapeRoomPuzzleTypes.map((elem, i) => (
                <DropdownMenuItem
                  onClick={() => {
                    handlePuzzleTypeChanged(elem);
                    setSelectedPuzzleType(i);
                  }}
                >
                  {stageMappings[elem].iconComponent}
                  {stageMappings[elem].displayName ?? elem}
                </DropdownMenuItem>
              ))}
            </DropdownMenu>
          )}
        </SelectFieldTypeDropdownButton>
      </HeaderContainer>

      <HorizontalLine />

      {/* Puzzle Editor */}
      {stageMappings[puzzle.type].editingComponentProducer({
        payload: puzzle.payload as any,
        onPayloadChanged: (value) => handlePuzzlePayloadChanged(value),
      })}

      <HorizontalLine />
      {/* Buttons to duplicate and delete a puzzle from a room block */}
      <BottomContainer>
        <DeleteIcon
          onClick={() => {
            handlePuzzleDelete();
          }}
        />

        <CopyIcon
          onClick={() => {
            handlePuzzleDuplicate();
          }}
        />
      </BottomContainer>
    </PuzzleCard>
  );
}; // RoomSettingsEditor
