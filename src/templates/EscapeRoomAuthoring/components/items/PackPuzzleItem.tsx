import {
  default_puzzle_piece,
  EditableItemProps,
  PackPuzzleItemDefinition,
  PackPuzzlePiece,
} from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";

import styled, { css } from "styled-components";
import { Root } from "./generalItemsStyles";
import { useState } from "react";
import { PuzzlePiece } from "@styled-icons/fa-solid/PuzzlePiece";
import PackPuzzlePieceDefinitionCard from "../cards/PackPuzzlePieceDefinitionCard";
import NumberInputCard from "../../../../components/Forms/Cards/NumberInputCard";

const AddPuzzlePieceButton = styled.button`
  font-family: ${(props) => props.theme.contentFont};
  font-size: 0.8em;
  cursor: pointer;
  background-color: hsl(10, 80%, 80%);
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  height: 3em;
  padding: 0 1em;
  color: white;
  width: fit-content;
  margin-left: auto;
  margin-top: 1em;
`;

export const fieldTypeIcon = css`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.75em;
`;

const AddPuzzlePieceIcon = styled(PuzzlePiece)`
  ${fieldTypeIcon}
  cursor: pointer;
  color: white;
`;

export const EditablePackPuzzleItemContent = (
  props: EditableItemProps<PackPuzzleItemDefinition>
): JSX.Element => {
  const { payload, onPayloadChanged } = props;

  const { puzzlePieces, finishTime } = payload;

  // Index of the puzzle piece that is currently being edited (or `none`, if no editing is taking place)
  const [selectedPackPuzzlePieceIndex, setSelectedPackPuzzlePieceIndex] =
    useState<number | "none">("none");

  const handleUpdateFinishTime = (time: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({ ...payload, finishTime: time });
  }; // handleUpdateFinishTime

  const handleUpdatePackPuzzlePieceData = (
    newData: PackPuzzlePiece,
    index: number
  ) => {
    if (!onPayloadChanged || index < 0 || index >= puzzlePieces.length) return;
    onPayloadChanged({
      ...payload,
      puzzlePieces: [
        ...puzzlePieces.slice(0, index),
        newData,
        ...puzzlePieces.slice(index + 1, puzzlePieces.length),
      ],
    });
    setSelectedPackPuzzlePieceIndex("none");
  }; // handleUpdatePackPuzzlePieceData

  const handleSelectPackPuzzlePiece = (index: number | "none") => {
    if (index !== "none" && (index < 0 || index >= puzzlePieces.length)) return;
    if (index === selectedPackPuzzlePieceIndex) {
      // deselect
      const res = window.confirm("Discard changes to selected puzzle piece?");
      if (!res) return;
      setSelectedPackPuzzlePieceIndex("none");
      return;
    }
    if (selectedPackPuzzlePieceIndex === puzzlePieces.length) {
      const res = window.confirm(
        "Select this puzzle piece and lose progress for your currently selected puzzle piece?"
      );
      if (!res) return;
    }
    setSelectedPackPuzzlePieceIndex(index);
  }; // handleSelectPackPuzzlePiece

  const handleDeletePackPuzzlePiece = (index: number) => {
    if (!onPayloadChanged || index < 0 || index >= puzzlePieces.length) return;
    onPayloadChanged({
      ...payload,
      puzzlePieces: [
        ...puzzlePieces.slice(0, index),
        ...puzzlePieces.slice(index + 1, puzzlePieces.length),
      ],
    });

    if (
      selectedPackPuzzlePieceIndex !== "none" &&
      index < selectedPackPuzzlePieceIndex
    )
      setSelectedPackPuzzlePieceIndex(selectedPackPuzzlePieceIndex - 1);
  }; // handleDeletePackPuzzlePiece

  const handleSaveNewPackPuzzlePiece = (puzzlePieceData: PackPuzzlePiece) => {
    if (
      !onPayloadChanged ||
      selectedPackPuzzlePieceIndex !== puzzlePieces.length
    )
      return;
    onPayloadChanged({
      ...payload,
      puzzlePieces: [...puzzlePieces, puzzlePieceData],
    });
    setSelectedPackPuzzlePieceIndex("none");
  }; // handleSaveNewPackPuzzlePiece

  const handleAddPackPuzzlePiece = () => {
    setSelectedPackPuzzlePieceIndex(puzzlePieces.length);
  }; // handleAddPackPuzzlePiece

  return (
    <Root>
      <NumberInputCard
        required
        requiredAlert={finishTime < 0}
        alertMessage={"Please enter a valid number."}
        promptText="Time to wait after completing the puzzle before continuing"
        fieldPayload={{ isFloat: true, units: "seconds" }}
        response={{ number: finishTime }}
        onResponseChanged={(res) => handleUpdateFinishTime(res.number)}
      />
      {puzzlePieces.map((puzzlePiece, index) => (
        // Character card that can be displayer in two modes (edit and display only)
        <PackPuzzlePieceDefinitionCard
          key={puzzlePiece.imageSrc}
          initialPackPuzzlePieceDefinition={puzzlePiece}
          onSavePackPuzzlePieceData={(value) =>
            handleUpdatePackPuzzlePieceData(value, index)
          }
          onTogglePackPuzzlePieceEditMode={() =>
            handleSelectPackPuzzlePiece(index)
          }
          onDeletePackPuzzlePiece={() => handleDeletePackPuzzlePiece(index)}
          editMode={selectedPackPuzzlePieceIndex === index}
          editButtonAvaliable={
            selectedPackPuzzlePieceIndex === "none" ||
            selectedPackPuzzlePieceIndex === puzzlePieces.length
          }
        />
      ))}
      {/* If there are no puzzlePieces being modified or being created a button to a add a new one is displayer */}
      {selectedPackPuzzlePieceIndex === "none" && (
        <AddPuzzlePieceButton onClick={handleAddPackPuzzlePiece}>
          <AddPuzzlePieceIcon /> New Puzzle Piece
        </AddPuzzlePieceButton>
      )}
      {/* Character editor at the end of the puzzlePiece list to add at the end of the list */}
      {selectedPackPuzzlePieceIndex === puzzlePieces.length && (
        <PackPuzzlePieceDefinitionCard
          initialPackPuzzlePieceDefinition={default_puzzle_piece}
          onSavePackPuzzlePieceData={handleSaveNewPackPuzzlePiece}
          onTogglePackPuzzlePieceEditMode={() =>
            handleSelectPackPuzzlePiece("none")
          }
          editMode={true}
          editButtonAvaliable={false}
        />
      )}
    </Root>
  );
}; // EditablePackPuzzleItemContent

const PreviewPackPuzzle = styled.div`
  color: rgb(178, 178, 178);

  display: flex;
  flex-direction: column;
  gap: 3px;

  height: 100%;
  width: 100%;
`;

const PreviewPackPuzzleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  gap: 3px;
  width: 100%;
  height: 47%;
`;

const ImagePreviewContainer = styled.img`
  width: 100%;
  max-width: 50%;
  border-radius: 0.25rem;
  height: 100%;
  object-fit: contain;

  background-color: black;
`;

export const PackPuzzleItemStageSlide = (
  props: PackPuzzleItemDefinition
): JSX.Element => {
  const { puzzlePieces } = props;

  return (
    <PreviewPackPuzzle>
      <PreviewPackPuzzleRow>
        {puzzlePieces.flatMap((piece, i) =>
          i % 2 === 0 ? <ImagePreviewContainer src={piece.imageSrc} /> : []
        )}
      </PreviewPackPuzzleRow>
      <PreviewPackPuzzleRow>
        {puzzlePieces.flatMap((piece, i) =>
          i % 2 === 1 ? <ImagePreviewContainer src={piece.imageSrc} /> : []
        )}
      </PreviewPackPuzzleRow>
    </PreviewPackPuzzle>
  );
}; // PackPuzzleItemStageSlide

export const packPuzzleItemFactory: AbstractActivityItemFactory<PackPuzzleItemDefinition> =
  {
    editingComponent: (editingProps) => (
      <EditablePackPuzzleItemContent {...editingProps} />
    ),
    defaultDefinition: {
      puzzlePieces: [],
      finishTime: 5,
    },
  }; // packPuzzleItemFactory

export default EditablePackPuzzleItemContent;
