import { useEffect, useState } from "react";
import { Question } from "@styled-icons/evil/Question";
import { multipleChoiceItemFactory } from "./MutipleChoiceItem";
import { waitingCodeItemFactory } from "./WaitingCodeItem";
import { qrScanItemFactory } from "./QRScanItem";
import { arScanItemFactory } from "./ARScanItem";
import {
  escapeRoomPuzzleTypes,
  SupportedPuzzle,
} from "../../../../services/escapeRoomActivity.model";

import { stageMappings } from "../../Screen";

import styled, { css } from "styled-components";
import { DeleteForever } from "@styled-icons/material-twotone/DeleteForever";
import { Copy } from "@styled-icons/boxicons-regular/Copy";
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { Puzzle } from "@styled-icons/heroicons-outline/Puzzle";
import { DownArrowAlt } from "@styled-icons/boxicons-regular/DownArrowAlt";
import { UpArrowAlt } from "@styled-icons/boxicons-regular/UpArrowAlt";

interface ButtonProps {
  avaliable: boolean;
}

const UpArrowIcon = styled(UpArrowAlt)<ButtonProps>`
  position: absolute;
  left: 2%;
  top: 50%;
  cursor: pointer;
  transform: translate(0%, -30%);

  height: 1.75em;
  width: 1.75em;
  border-radius: 0.25rem;
  border: 2px solid rgb(15, 90, 188);
  background-color: rgb(19, 104, 206);
  color: white;
  opacity: ${(props) => (props.avaliable ? 1 : 0.3)};
  &:hover {
    background-color: rgb(49, 134, 236);
  }
`;

const DownArrowIcon = styled(DownArrowAlt)<ButtonProps>`
  position: absolute;
  left: 7%;
  top: 50%;
  cursor: pointer;
  transform: translate(0%, -30%);

  height: 1.75em;
  width: 1.75em;
  border-radius: 0.25rem;
  border: 2px solid rgb(15, 90, 188);
  background-color: rgb(19, 104, 206);
  color: white;
  opacity: ${(props) => (props.avaliable ? 1 : 0.3)};

  &:hover {
    background-color: rgb(49, 134, 236);
  }
`;

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

export interface RoomPuzzleSettingsEditorProps {
  /** Data of the puzzle this editor is containing */
  puzzle: SupportedPuzzle;
  /** Index of this puzzle inside the block it is currently in */
  index: number;
  /** Boolean that specifies wether this card is the first one inside it's block and can be moved upwards or not */
  firstCard: boolean;
  /** Boolean that specifies wether this card is the last one inside it's block and can be moved downwards or not */
  lastCard: boolean;
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
  /** callback to parent component notifying that the user wants to move a puzzle upwards */
  handlePuzzleMovedUpwards: () => void;
  /** callback to parent component notifying that the user wants to move a puzzle downwards */
  handlePuzzleMovedDownwards: () => void;
  /** callback to parent component notifying that the user just changed some of this puzzle */
  handleSelectedPuzzleChanged: () => void;
}

export const RoomPuzzleSettingsEditor = (
  props: RoomPuzzleSettingsEditorProps
): JSX.Element => {
  const {
    puzzle,
    index,
    firstCard,
    lastCard,
    handlePuzzlePayloadChanged,
    handlePuzzleTypeChanged,
    handlePuzzleDelete,
    handlePuzzleDuplicate,
    handleSelectedPuzzleChanged,
    handlePuzzleMovedUpwards,
    handlePuzzleMovedDownwards,
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
        <UpArrowIcon
          avaliable={!firstCard}
          onMouseDown={handlePuzzleMovedUpwards}
        />
        <DownArrowIcon
          avaliable={!lastCard}
          onMouseDown={handlePuzzleMovedDownwards}
        />

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
