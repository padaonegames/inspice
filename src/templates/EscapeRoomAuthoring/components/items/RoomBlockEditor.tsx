import { useState } from "react";
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
import {
  AddPuzzleButton,
  AddPuzzleIcon,
  CardTitle,
  SettingsContainer,
  TitleContainer,
} from "./RoomExitBlockEditor";

const Root = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HintsIcon = styled(Download)`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.5em;
`;

export interface RoomBlockEditorProps {
  /** Data of this current block with its title,description and puzzles */
  block: RoomBlock;
  /** Position of this block inside the room that contains it */
  blockIndex: number;
  /** Callback to parent component to notify that this block's data or puzzles have been modified */
  onPayloadChanged: (blockIndex: number, exitBlock: RoomBlock) => void;
}

export const RoomBlockEditor = (props: RoomBlockEditorProps): JSX.Element => {
  const { block, blockIndex, onPayloadChanged } = props;

  const [selectedPuzzleIndex, setSelectedPuzzleIndex] = useState<number>(-1);

  /////////////////////////////Methods to manipulate the entire block data //////////////////////
  const handleChangeBlockName = (name: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged(blockIndex, {
      ...block,
      blockName: name,
    });
  }; //handleChangeBlockName

  const handleChangeBlockDescription = (description: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged(blockIndex, {
      ...block,
      blockDescription: description,
    });
  }; //handleChangeBlockDescription

  /////////////////////////////Methods to manipulate the entire block data //////////////////////

  /////////////////////////////Methods to manipulate the puzzles inside this block
  const handleDuplicatePuzzle = (puzzleIndex: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged(blockIndex, {
      ...block,
      puzzles: [
        ...block.puzzles.slice(0, puzzleIndex + 1),
        block.puzzles[puzzleIndex],
        ...block.puzzles.slice(puzzleIndex + 1, block.puzzles.length),
      ],
    });
  }; //handleDuplicatePuzzle

  const handleDeletePuzzle = (puzzleIndex: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged(blockIndex, {
      ...block,
      puzzles: [
        ...block.puzzles.slice(0, puzzleIndex),
        ...block.puzzles.slice(puzzleIndex + 1, block.puzzles.length),
      ],
    });
  }; //handleDeletePuzzle

  const handlePuzzlePayloadChanged = (
    puzzleIndex: number,
    puzzlePayload: SupportedPuzzle["payload"]
  ) => {
    if (!onPayloadChanged) return;
    onPayloadChanged(blockIndex, {
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
    onPayloadChanged(blockIndex, {
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
  };

  const handleAddNewPuzzle = (puzzleIndex: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged(blockIndex, {
      ...block,
      puzzles: [
        ...block.puzzles.slice(0, puzzleIndex + 1),
        default_puzzle,
        ...block.puzzles.slice(puzzleIndex + 1, block.puzzles.length),
      ],
    });
  }; //handleAddNewPuzzle

  /////////////////////////////Methods to manipulate the puzzles inside this block

  const handleMovePuzzleUpwards = (puzzleIndex: number) => {
    if (!onPayloadChanged || puzzleIndex === 0) return;

    let aux = block.puzzles;
    var element = aux[puzzleIndex];
    aux.splice(puzzleIndex, 1);
    aux.splice(puzzleIndex - 1, 0, element);

    onPayloadChanged(blockIndex, {
      ...block,
      puzzles: aux,
    });
  }; //handleMovePuzzleUpwards

  const handleMovePuzzleDownwards = (puzzleIndex: number) => {
    if (!onPayloadChanged || puzzleIndex === block.puzzles.length - 1) return;

    let aux = block.puzzles;
    var element = aux[puzzleIndex];
    aux.splice(puzzleIndex, 1);
    aux.splice(puzzleIndex + 1, 0, element);

    onPayloadChanged(blockIndex, {
      ...block,
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
          promptText={block.blockName}
          promptPlaceholder="Give this block a title"
          onPromptChange={(value) => {
            handleChangeBlockName(value);
          }}
        />
        <TitleContainer>Block Description</TitleContainer>
        <PromptField
          promptText={block.blockDescription}
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
