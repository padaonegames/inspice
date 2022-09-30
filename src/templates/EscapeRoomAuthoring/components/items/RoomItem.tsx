import { useState } from "react";
import {
  default_room,
  default_room_block,
  EditableItemProps,
  RoomBlock,
  RoomDefinition,
  SupportedPuzzle,
} from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";

import {
  multipleChoiceItemFactory,
  MultipleChoiceItemStageSlide,
} from "./MutipleChoiceItem";
import {
  waitingCodeItemFactory,
  WaitingCodeItemStageSlide,
} from "./WaitingCodeItem";
import { arScanItemFactory, ARScanItemStageSlide } from "./ARScanItem";
import { qrScanItemFactory, QRScanItemStageSlide } from "./QRScanItem";
import { loadSceneItemFactory, LoadSceneItemStageSlide } from "./LoadSceneItem";
import { narrativeItemFactory, NarrativeItemStageSlide } from "./NarrativeItem";
import {
  unlockPasswordItemFactory,
  UnlockPasswordItemStageSlide,
} from "./UnlockPasswordtem";

import { RoomSettingsEditor } from "./RoomSettingsEditor";
import {
  ItemToSlideProducerMapping,
  RoomBlockSlidesContainer,
} from "./RoomBlockSlidesContainer";
import { RoomExitBlockEditor } from "./RoomExitBlockEditor";
import { RoomBlockEditor } from "./RoomBlockEditor";

import styled from "styled-components";
import { ConferenceRoom } from "@styled-icons/fluentui-system-filled/ConferenceRoom";

const ExitIcon = styled(ConferenceRoom)`
  color: ${(props) => props.theme.frameColor};
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
`;

export const puzzleToSlidesMappings: ItemToSlideProducerMapping<SupportedPuzzle> =
  {
    "multiple-choice": MultipleChoiceItemStageSlide,
    "waiting-code": WaitingCodeItemStageSlide,
    "qr-scan": QRScanItemStageSlide,
    "ar-scan": ARScanItemStageSlide,
    "load-scene": LoadSceneItemStageSlide,
    narrative: NarrativeItemStageSlide,
    "unlock-password": UnlockPasswordItemStageSlide,
  }; // puzzleToSlidesMappings

export type PuzzleToEditorProducerMapping<T extends SupportedPuzzle> = {
  /** What type of puzzle we are working with here*/
  [P in T["type"]]: {
    /** Generation logic to use to create a form editing component */
    editingComponentProducer: (
      editingFormProps: EditableItemProps<Extract<T, { type: P }>["payload"]>
    ) => JSX.Element;
    /** Default value for StagePayload */
    defaultStagePayload: Extract<T, { type: P }>["payload"];
  };
}; // PuzzleToEditorProducerMapping

export const puzzleToEditorsMappings: PuzzleToEditorProducerMapping<SupportedPuzzle> =
  {
    "multiple-choice": {
      editingComponentProducer: multipleChoiceItemFactory.editingComponent,
      defaultStagePayload: multipleChoiceItemFactory.defaultDefinition,
    },
    "waiting-code": {
      editingComponentProducer: waitingCodeItemFactory.editingComponent,
      defaultStagePayload: waitingCodeItemFactory.defaultDefinition,
    },
    "qr-scan": {
      editingComponentProducer: qrScanItemFactory.editingComponent,
      defaultStagePayload: qrScanItemFactory.defaultDefinition,
    },
    "ar-scan": {
      editingComponentProducer: arScanItemFactory.editingComponent,
      defaultStagePayload: arScanItemFactory.defaultDefinition,
    },
    "load-scene": {
      editingComponentProducer: loadSceneItemFactory.editingComponent,
      defaultStagePayload: loadSceneItemFactory.defaultDefinition,
    },
    narrative: {
      editingComponentProducer: narrativeItemFactory.editingComponent,
      defaultStagePayload: narrativeItemFactory.defaultDefinition,
    },
    "unlock-password": {
      editingComponentProducer: unlockPasswordItemFactory.editingComponent,
      defaultStagePayload: unlockPasswordItemFactory.defaultDefinition,
    },
  }; // puzzleToEditorsMappings

export interface EditableRoomItemContentProps
  extends EditableItemProps<RoomDefinition> {} // EditableRoomItemContentProps

export const EditableRoomItemContent = (
  props: EditableRoomItemContentProps
): JSX.Element => {
  const { payload, onPayloadChanged } = props;

  const { exitBlock, blocks, hints } = payload;

  const [selectedBlock, setSelectedBlock] =
    useState<number | "room-settings" | "exit-block">("room-settings");

  //////////////////////////////Methods to manipulate entire blocks ////////////////////////////
  const handleAddBlock = () => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      blocks: [...blocks, default_room_block],
    });
  }; // handleAddBlock

  const handleDeleteBlock = (index: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      blocks: [
        ...blocks.slice(0, index),
        ...blocks.slice(index + 1, blocks.length),
      ],
    });
  }; // handleDeleteBlock

  const handleDuplicateBlock = (index: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      blocks: [
        ...blocks.slice(0, index + 1),
        blocks[index],
        ...blocks.slice(index + 1, blocks.length),
      ],
    });
  }; // handleDuplicateBlock

  //////////////////////////////Methods to manipulate entire blocks ////////////////////////////

  //Method to upload all the changes ocurred to the exitblock
  const handleExitBlockChanged = (exitBlockData: RoomBlock) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      exitBlock: exitBlockData,
    });
  };

  //Method to upload all the changes ocurred to a specific room block
  const handleRoomBlockChanged = (index: number, blockData: RoomBlock) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      blocks: [
        ...blocks.slice(0, index),
        blockData,
        ...blocks.slice(index + 1, blocks.length),
      ],
    });
  };

  //Method to upload changes from the room settings
  const handleHintsChanged = (value: string[]) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      hints: value,
    });
  }; // handleHintsChanged

  const currentBlock =
    selectedBlock !== "room-settings" && selectedBlock !== "exit-block"
      ? blocks[selectedBlock]
      : undefined;

  return (
    <>
      {/* Top side of the screen with slides that represent the blocks avaliable in this room */}
      {/* List of blocks on the top of the editor */}
      <RoomBlockSlidesContainer
        itemMappings={puzzleToSlidesMappings}
        selectedBlockIndex={selectedBlock}
        onSelectRoomSettings={() => setSelectedBlock("room-settings")}
        onSelectRoomExitBlock={() => setSelectedBlock("exit-block")}
        onSelectBlock={setSelectedBlock}
        onAddBlock={handleAddBlock}
        onDeleteBlock={handleDeleteBlock}
        onDuplicateBlock={handleDuplicateBlock}
        blocks={blocks}
        exitBlock={exitBlock}
      />

      {/* Body of the screen with the editor of the specifcc block thar we are editing  */}
      {/* Editor for the room specific settings */}
      {selectedBlock === "room-settings" && (
        <RoomSettingsEditor hints={hints} onHintsChanged={handleHintsChanged} />
      )}

      {/* Editor for the room's exit block */}
      {selectedBlock === "exit-block" && (
        <RoomExitBlockEditor
          exitBlock={payload.exitBlock}
          onPayloadChanged={handleExitBlockChanged}
        />
      )}

      {/* Editor for a block that is not the exit block */}
      {currentBlock &&
        selectedBlock !== "room-settings" &&
        selectedBlock !== "exit-block" && (
          <RoomBlockEditor
            block={currentBlock}
            blockIndex={selectedBlock}
            onPayloadChanged={handleRoomBlockChanged}
          />
        )}
    </>
  );
}; // EditableRoomItemContent

export const RoomItemStageSlide = (_: RoomDefinition): JSX.Element => {
  return <ExitIcon />;
}; // QRScanItemStageSlide

export const roomItemFactory: AbstractActivityItemFactory<RoomDefinition> = {
  editingComponent: (editingProps) => (
    <EditableRoomItemContent {...editingProps} />
  ),
  defaultDefinition: default_room,
}; // roomItemFactory

export default EditableRoomItemContent;
