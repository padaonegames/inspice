import { useEffect, useState } from "react";

import styled, { css } from "styled-components";
import {
  createNewPuzzle,
  RoomBlock,
  SupportedPuzzle,
} from "../../../../services/escapeRoomActivity.model";

import { RoomPuzzleSettingsEditor } from "./RoomPuzzleSettingsEditor";
import { puzzleToEditorsMappings } from "./RoomItem";
import { SlideAdd } from "@styled-icons/fluentui-system-filled/SlideAdd";
import StepTitleCard from "../../../../components/Forms/Cards/StepTitleCard";
import ShortTextInputCard from "../../../../components/Forms/Cards/ShortTextInputCard";
import LongTextInputCard from "../../../../components/Forms/Cards/LongTextInputCard";
import { ObjectID } from "bson";
import { cloneDeep } from "lodash";
import { ImageSelectionCard } from "../cards/ImageSelectionCard";

const Root = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  padding: 2em 0;
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

const AddPuzzleButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  transition: all 0.2s ease 0s;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const AddPuzzleButton = styled.button`
  font-family: ${(props) => props.theme.contentFont};
  font-size: ${(props) => props.theme.contentFontSize};
  cursor: pointer;
  background-color: hsl(10, 80%, 80%);
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  height: fit-content;
  text-align: center;
  padding: 0.4em 0.85em 0.4em 0.6em;
  color: white;
  width: fit-content;
  margin: 1em auto;
`;

export const fieldTypeIcon = css`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.75em;
`;

const AddPuzzleIcon = styled(SlideAdd)`
  ${fieldTypeIcon}
  cursor: pointer;
  color: white;
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

  // ÑAPA para que todo tenga _id (por no regenerar toda la base de datos de nuevo)
  useEffect(() => {
    let missingIdFound: boolean = false;
    const blockCopyPuzzles = cloneDeep(block).puzzles.map((p) => {
      if (!p._id) {
        missingIdFound = true;
        return { ...p, _id: new ObjectID().toString() };
      }
      return p;
    });

    if (missingIdFound) {
      onPayloadChanged({ ...block, puzzles: blockCopyPuzzles });
    }
  }, [block]);

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

  const handleChangeBlockClueImageSrc = (imageSrc: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...block,
      blockClueImageSrc: imageSrc,
    });
  }; // handleChangeBlockClueImageSrc

  const handleChangeBlockImageSrc = (imageSrc: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...block,
      blockImageSrc: imageSrc,
    });
  }; // handleChangeBlockImageSrc

  const handleChangeBlockClueText = (text: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...block,
      blockClueTextSrc: text,
    });
  }; // handleChangeBlockClueText

  // -----------------------------------------------------
  //  Methods to manipulate the puzzles inside this block
  // -----------------------------------------------------
  const handleDuplicatePuzzle = (puzzleIndex: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...block,
      puzzles: [
        ...block.puzzles.slice(0, puzzleIndex + 1),
        { ...block.puzzles[puzzleIndex], _id: new ObjectID().toString() },
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
        createNewPuzzle(),
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
      <ImageSelectionCard
        promptText="Image to represent this block before being played:"
        fieldPayload={{}}
        response={{ imageSrc: block.blockImageSrc }}
        onResponseChanged={(res) => handleChangeBlockImageSrc(res.imageSrc)}
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
      <ImageSelectionCard
        promptText="Image to display as a clue obtained after completing this block:"
        fieldPayload={{}}
        response={{ imageSrc: block.blockClueImageSrc }}
        onResponseChanged={(res) => handleChangeBlockClueImageSrc(res.imageSrc)}
      />
      <ShortTextInputCard
        fieldPayload={{ placeholder: "Give this block a text clue" }}
        promptText="Text to display as a clue obtained after completing this block (alongside image):"
        response={{ text: block.blockClueTextSrc }}
        onResponseChanged={(res) => handleChangeBlockClueText(res.text)}
        onMouseEnter={() => {
          setSelectedPuzzleIndex(-1);
        }}
      />

      {/* In case we want to add a puzzle at the beginning of the room block*/}
      {selectedPuzzleIndex === -1 && (
        <AddPuzzleButtonContainer>
          <AddPuzzleButton
            onClick={() => {
              handleAddNewPuzzle(-1);
            }}
          >
            <AddPuzzleIcon />
            New Puzzle
          </AddPuzzleButton>
        </AddPuzzleButtonContainer>
      )}

      {/* Sequence of editors to configure a room's block of puzzles */}
      {block.puzzles.map((puzzle, i) => (
        <>
          <RoomPuzzleSettingsEditor
            key={puzzle._id ?? puzzle.type + "_" + i}
            puzzle={puzzle}
            deletionEnabled={block.puzzles.length > 1}
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
