import { useState } from "react";
import EditableCheckBoxInput from "../EditableCheckBoxInput";
import { PromptField } from "./PromptField";

import styled from "styled-components";
import { Download } from "@styled-icons/bootstrap/Download";
import { SlideAdd } from "@styled-icons/fluentui-system-filled/SlideAdd";
import {
  default_puzzle,
  RoomBlock,
  SupportedPuzzle,
} from "../../../../services/escapeRoomActivity.model";

import { RoomPuzzleSettingsEditor } from "./RoomPuzzleSettingsEditor";
import { puzzleToEditorsMappings } from "./RoomItem";

const Root = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SettingsContainer = styled.div`
  position: relative;
  width: 90%;
  margin-top: 5px;
  display: flex;
  background-color: transparent;
  flex-direction: column;
  align-items: left;
  overflow-y: hidden;

  padding: 0 0em 0.75em 0em;
  background-color: white;
  border-radius: 0.5rem;
  &:hover {
    border-left: 6px solid rgb(19, 104, 206);
  }
`;
export const CardTitle = styled.div`
  font-size: 1.5em;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;

  color: white;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(19, 104, 206);
`;

export const TitleContainer = styled.div`
  font-size: 1em;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;

  margin-left: 2rem;
  margin-top: 1rem;
  border-top: none;
  color: black;
  line-height: 135%;
  width: fit-content;
  text-align: center;

  display: flex;
  align-items: center;
  border-bottom: 2px solid white;
`;

//Components for the button to add a new Puzzle to the room block
export const AddPuzzleButton = styled.div`
  position: relative;
  font-size: 1em;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;

  margin-top: 1em;
  margin-bottom: 0.25em;
  padding: 0.5em 0.75em;
  border-top: none;
  color: white;

  display: flex;
  text-align: center;
  align-items: center;

  background-color: rgb(19, 104, 206);
  border-radius: 0.5rem;
  border: 3px solid rgb(15, 90, 188);
  &:hover {
    transition: border 0.25s;
    border: 3px solid rgb(255, 255, 255);
  }
`;

export const AddPuzzleIcon = styled(SlideAdd)`
  color: white;
  height: 1.75em;
  margin-right: 1rem;
  width: auto;
`;

const HintsIcon = styled(Download)`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.5em;
`;

const SelectedIcon = styled(Download)`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.5em;
`;

export interface RoomExitBlockEditorProps {
  /** Data of this block */
  exitBlock: RoomBlock;
  /** Callback to parent component to notify any changes made to this block */
  onPayloadChanged: (exitBlock: RoomBlock) => void;
}

export const RoomExitBlockEditor = (
  props: RoomExitBlockEditorProps
): JSX.Element => {
  const { exitBlock, onPayloadChanged } = props;

  const [selectedPuzzleIndex, setSelectedPuzzleIndex] = useState<number>(-1);

  /////////////////////////////Methods to manipulate the entire block data //////////////////////
  const handleChangeBlockName = (name: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...exitBlock,
      blockName: name,
    });
  }; //handleChangeBlockName

  const handleChangeBlockDescription = (description: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...exitBlock,
      blockDescription: description,
    });
  }; //handleChangeBlockDescription

  /////////////////////////////Methods to manipulate the entire block data //////////////////////

  /////////////////////////////Methods to manipulate the puzzles inside this block
  const handleDuplicatePuzzle = (puzzleIndex: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...exitBlock,
      puzzles: [
        ...exitBlock.puzzles.slice(0, puzzleIndex + 1),
        exitBlock.puzzles[puzzleIndex],
        ...exitBlock.puzzles.slice(puzzleIndex + 1, exitBlock.puzzles.length),
      ],
    });
  }; //handleDuplicatePuzzle

  const handleDeletePuzzle = (puzzleIndex: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...exitBlock,
      puzzles: [
        ...exitBlock.puzzles.slice(0, puzzleIndex),
        ...exitBlock.puzzles.slice(puzzleIndex + 1, exitBlock.puzzles.length),
      ],
    });
  }; //handleDeletePuzzle

  const handlePuzzlePayloadChanged = (
    puzzleIndex: number,
    puzzlePayload: SupportedPuzzle["payload"]
  ) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...exitBlock,
      puzzles: [
        ...exitBlock.puzzles.slice(0, puzzleIndex),
        {
          ...exitBlock.puzzles[puzzleIndex],
          payload: puzzlePayload,
        },
        ...exitBlock.puzzles.slice(puzzleIndex + 1, exitBlock.puzzles.length),
      ] as SupportedPuzzle[],
    });
  }; // handlePuzzlePayloadChanged

  const handlePuzzleTypeChanged = (
    puzzleIndex: number,
    puzzleNewType: SupportedPuzzle["type"]
  ) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...exitBlock,
      puzzles: [
        ...exitBlock.puzzles.slice(0, puzzleIndex),
        {
          ...exitBlock.puzzles[puzzleIndex],
          type: puzzleNewType,
          payload: puzzleToEditorsMappings[puzzleNewType].defaultStagePayload,
        },
        ...exitBlock.puzzles.slice(puzzleIndex + 1, exitBlock.puzzles.length),
      ] as SupportedPuzzle[],
    });
  }; // handlePuzzleTypeChanged

  const handleSelectedPuzzleIndexChanged = (index: number) => {
    setSelectedPuzzleIndex(index);
  };

  const handleAddNewPuzzle = (puzzleIndex: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...exitBlock,
      puzzles: [
        ...exitBlock.puzzles.slice(0, puzzleIndex + 1),
        default_puzzle,
        ...exitBlock.puzzles.slice(puzzleIndex + 1, exitBlock.puzzles.length),
      ],
    });
  }; //handleAddNewPuzzle

  /////////////////////////////Methods to manipulate the puzzles inside this block

  const handleMovePuzzleUpwards = (puzzleIndex: number) => {
    if (!onPayloadChanged || puzzleIndex === 0) return;

    let aux = exitBlock.puzzles;
    var element = aux[puzzleIndex];
    aux.splice(puzzleIndex, 1);
    aux.splice(puzzleIndex - 1, 0, element);

    onPayloadChanged({
      ...exitBlock,
      puzzles: aux,
    });
  }; //handleMovePuzzleUpwards

  const handleMovePuzzleDownwards = (puzzleIndex: number) => {
    if (!onPayloadChanged || puzzleIndex === exitBlock.puzzles.length - 1)
      return;

    let aux = exitBlock.puzzles;
    var element = aux[puzzleIndex];
    aux.splice(puzzleIndex, 1);
    aux.splice(puzzleIndex + 1, 0, element);

    onPayloadChanged({
      ...exitBlock,
      puzzles: aux,
    });
  }; //handleMovePuzzleDownwards

  return (
    <Root>
      {/* Element that contains the information relative to the room block */}
      <SettingsContainer
        onMouseEnter={() => {
          setSelectedPuzzleIndex(-1);
        }}
      >
        <CardTitle>Block Information</CardTitle>
        <TitleContainer>Block Title</TitleContainer>
        <PromptField
          promptText={exitBlock.blockName}
          promptPlaceholder="Give this block a title"
          onPromptChange={(value) => {
            handleChangeBlockName(value);
          }}
        />
        <TitleContainer>Block Description</TitleContainer>
        <PromptField
          promptText={exitBlock.blockDescription}
          promptPlaceholder="Give this block a description"
          onPromptChange={(value) => {
            handleChangeBlockDescription(value);
          }}
        />
      </SettingsContainer>

      {/* In case we want to add a puzzle at the beginning of the room block*/}
      {selectedPuzzleIndex === -1 && (
        <AddPuzzleButton
          onClick={() => {
            handleAddNewPuzzle(-1);
          }}
        >
          <AddPuzzleIcon />
          New Puzzle
        </AddPuzzleButton>
      )}

      {/* Sequence of editors to configure a room's block of puzzles */}
      {exitBlock.puzzles.map((puzzle, i) => (
        <>
          <RoomPuzzleSettingsEditor
            puzzle={puzzle}
            index={i}
            firstCard={i === 0}
            lastCard={i === exitBlock.puzzles.length - 1}
            handlePuzzlePayloadChanged={(value) => {
              handlePuzzlePayloadChanged(i, value);
            }}
            handlePuzzleTypeChanged={(value) => {
              handlePuzzleTypeChanged(i, value);
            }}
            handlePuzzleDelete={() => {
              handleDeletePuzzle(i);
            }}
            handlePuzzleDuplicate={() => {
              handleDuplicatePuzzle(i);
            }}
            handleSelectedPuzzleChanged={() => {
              handleSelectedPuzzleIndexChanged(i);
            }}
            handlePuzzleMovedUpwards={() => {
              handleMovePuzzleUpwards(i);
            }}
            handlePuzzleMovedDownwards={() => {
              handleMovePuzzleDownwards(i);
            }}
          />

          {/* Button that allows to add a new puzzle right after the one specified by "selectedPuzzleIndex" */}
          {i === selectedPuzzleIndex ? (
            <>
              <AddPuzzleButton
                onClick={() => {
                  handleAddNewPuzzle(i);
                }}
              >
                <AddPuzzleIcon />
                New Puzzle
              </AddPuzzleButton>
            </>
          ) : (
            <></>
          )}
        </>
      ))}
    </Root>
  );
}; // RoomSettingsEditor
