import { useState } from "react";
import { PromptField } from "./PromptField";

import styled from "styled-components";
import {
  default_puzzle,
  RoomBlock,
  SupportedPuzzle,
} from "../../../../services/escapeRoomActivity.model";

import { RoomPuzzleSettingsEditor } from "./RoomPuzzleSettingsEditor";
import { puzzleToEditorsMappings } from "./RoomItem";
import { SlideAdd } from "@styled-icons/fluentui-system-filled/SlideAdd";
import StepTitleCard from "../../../../components/Forms/Cards/StepTitleCard";
import ShortTextInputCard from "../../../../components/Forms/Cards/ShortTextInputCard";
import LongTextInputCard from "../../../../components/Forms/Cards/LongTextInputCard";

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

export interface RoomBlockEditorProps {
  /** Data of this current block with its title,description and puzzles */
  block: RoomBlock;
  /** Callback to parent component to notify that this block's data or puzzles have been modified */
  onPayloadChanged: (newPayload: RoomBlock) => void;
} // RoomBlockEditorProps

export const RoomBlockEditor = (props: RoomBlockEditorProps): JSX.Element => {
  const { block, onPayloadChanged } = props;
  const [selectedPuzzleIndex, setSelectedPuzzleIndex] = useState<number>(-1);

  // -----------------------------------------------------
  //      Methods to manipulate the entire block data
  // -----------------------------------------------------
  const handleChangeBlockName = (name: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...block,
      blockName: name,
    });
  }; // handleChangeBlockName

  const handleChangeBlockDescription = (description: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...block,
      blockDescription: description,
    });
  }; // handleChangeBlockDescription

  // -----------------------------------------------------
  //  Methods to manipulate the puzzles inside this block
  // -----------------------------------------------------
  const handleDuplicatePuzzle = (puzzleIndex: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...block,
      puzzles: [
        ...block.puzzles.slice(0, puzzleIndex + 1),
        block.puzzles[puzzleIndex],
        ...block.puzzles.slice(puzzleIndex + 1, block.puzzles.length),
      ],
    });
  }; // handleDuplicatePuzzle

  const handleDeletePuzzle = (puzzleIndex: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...block,
      puzzles: [
        ...block.puzzles.slice(0, puzzleIndex),
        ...block.puzzles.slice(puzzleIndex + 1, block.puzzles.length),
      ],
    });
  }; // handleDeletePuzzle

  const handlePuzzlePayloadChanged = (
    puzzleIndex: number,
    puzzlePayload: SupportedPuzzle["payload"]
  ) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...block,
      puzzles: [
        ...block.puzzles.slice(0, puzzleIndex),
        {
          ...block.puzzles[puzzleIndex],
          payload: puzzlePayload,
        },
        ...block.puzzles.slice(puzzleIndex + 1, block.puzzles.length),
      ] as SupportedPuzzle[],
    });
  }; // handlePuzzlePayloadChanged

  const handlePuzzleTypeChanged = (
    puzzleIndex: number,
    puzzleNewType: SupportedPuzzle["type"]
  ) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...block,
      puzzles: [
        ...block.puzzles.slice(0, puzzleIndex),
        {
          ...block.puzzles[puzzleIndex],
          type: puzzleNewType,
          payload: puzzleToEditorsMappings[puzzleNewType].defaultStagePayload,
        },
        ...block.puzzles.slice(puzzleIndex + 1, block.puzzles.length),
      ] as SupportedPuzzle[],
    });
  }; // handlePuzzleTypeChanged

  const handleSelectedPuzzleIndexChanged = (index: number) => {
    setSelectedPuzzleIndex(index);
  }; // handleSelectePuzzleIndexChanged

  const handleAddNewPuzzle = (puzzleIndex: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...block,
      puzzles: [
        ...block.puzzles.slice(0, puzzleIndex + 1),
        default_puzzle,
        ...block.puzzles.slice(puzzleIndex + 1, block.puzzles.length),
      ],
    });
  }; // handleAddNewPuzzle

  // -----------------------------------------------------
  // Methods to move the puzzles inside this block (UP/DOWN)
  // -----------------------------------------------------
  const handleMovePuzzleUpwards = (puzzleIndex: number) => {
    if (!onPayloadChanged || puzzleIndex === 0) return;

    let aux = block.puzzles;
    var element = aux[puzzleIndex];
    aux.splice(puzzleIndex, 1);
    aux.splice(puzzleIndex - 1, 0, element);

    onPayloadChanged({
      ...block,
      puzzles: aux,
    });
  }; // handleMovePuzzleUpwards

  const handleMovePuzzleDownwards = (puzzleIndex: number) => {
    if (!onPayloadChanged || puzzleIndex === block.puzzles.length - 1) return;

    let aux = block.puzzles;
    var element = aux[puzzleIndex];
    aux.splice(puzzleIndex, 1);
    aux.splice(puzzleIndex + 1, 0, element);

    onPayloadChanged({
      ...block,
      puzzles: aux,
    });
  }; // handleMovePuzzleDownwards

  return (
    <Root>
      {/* Element that contains the information relative to the room block */}
      <StepTitleCard
        stepTitle="Block Information"
        stepDescription="Welcome to the block edition tool. Below, you will be able to configure your escape room block by adding and editing puzzles. Please make sure to add a title and a description for this block (these will be displayed on the block selection screen on Unity)."
        onMouseEnter={() => {
          setSelectedPuzzleIndex(-1);
        }}
      />
      <ShortTextInputCard
        required
        requiredAlert={block.blockName.length === 0}
        fieldPayload={{ placeholder: "Give this block a title" }}
        promptText="Block Title:"
        response={{ text: block.blockName }}
        onResponseChanged={(res) => handleChangeBlockName(res.text)}
        onMouseEnter={() => {
          setSelectedPuzzleIndex(-1);
        }}
      />
      <LongTextInputCard
        fieldPayload={{ placeholder: "Enter a description for this block" }}
        promptText="Block Description:"
        response={{ text: block.blockDescription }}
        onResponseChanged={(res) => handleChangeBlockDescription(res.text)}
        onMouseEnter={() => {
          setSelectedPuzzleIndex(-1);
        }}
      />

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
      {block.puzzles.map((puzzle, i) => (
        <>
          <RoomPuzzleSettingsEditor
            puzzle={puzzle}
            index={i}
            firstCard={i === 0}
            lastCard={i === block.puzzles.length - 1}
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
