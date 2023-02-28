import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import { RoomPuzzleSettingsEditor } from "../../templates/EscapeRoomAuthoring/components/items/RoomPuzzleSettingsEditor";
import { createNewPuzzle } from "../../services/escapeRoomActivity.model";
import { multipleChoiceTestItemFactory } from "../../templates/EscapeRoomAuthoring/components/items/MutipleChoiceTestItem";
import { qrScanItemFactory } from "../../templates/EscapeRoomAuthoring/components/items/QRScanItem";
import { arScanItemFactory } from "../../templates/EscapeRoomAuthoring/components/items/ARScanItem";
import { waitingCodeItemFactory } from "../../templates/EscapeRoomAuthoring/components/items/WaitingCodeItem";
import { loadSceneItemFactory } from "../../templates/EscapeRoomAuthoring/components/items/LoadSceneItem";
import { narrativeItemFactory } from "../../templates/EscapeRoomAuthoring/components/items/NarrativeItem";
import { unlockPasswordItemFactory } from "../../templates/EscapeRoomAuthoring/components/items/UnlockPasswordtem";
import { ObjectID } from "bson";

export default {
  title: "Escape Rooms/Room Puzzle Settings Editor",
  component: RoomPuzzleSettingsEditor,
  decorators: [
    (Story) => {
      return Story();
    },
  ],
} as ComponentMeta<typeof RoomPuzzleSettingsEditor>;

const Template: ComponentStory<typeof RoomPuzzleSettingsEditor> = (args) => (
  <RoomPuzzleSettingsEditor {...args} />
);

export const Default = Template.bind({});
Default.args = {
  puzzle: createNewPuzzle(),
  index: 0,
  handleSelectedPuzzleChanged() {},
  handlePuzzleDelete() {},
  handlePuzzleDuplicate() {},
  handlePuzzlePayloadChanged(_) {},
  handlePuzzleTypeChanged(_) {},
};

export const MultipleChoice = Template.bind({});
MultipleChoice.args = {
  puzzle: {
    _id: new ObjectID().toString(),
    type: "multiple-choice-test",
    payload: multipleChoiceTestItemFactory.defaultDefinition,
  },
  index: 1,
  handleSelectedPuzzleChanged() {},
  handlePuzzleDelete() {},
  handlePuzzleDuplicate() {},
  handlePuzzlePayloadChanged(_) {},
  handlePuzzleTypeChanged(_) {},
};

export const QRScan = Template.bind({});
QRScan.args = {
  puzzle: {
    _id: new ObjectID().toString(),
    type: "qr-scan",
    payload: qrScanItemFactory.defaultDefinition,
  },
  index: 2,
  handleSelectedPuzzleChanged() {},
  handlePuzzleDelete() {},
  handlePuzzleDuplicate() {},
  handlePuzzlePayloadChanged(_) {},
  handlePuzzleTypeChanged(_) {},
};

export const ARScan = Template.bind({});
ARScan.args = {
  puzzle: {
    _id: new ObjectID().toString(),
    type: "ar-scan",
    payload: arScanItemFactory.defaultDefinition,
  },
  index: 3,
  handleSelectedPuzzleChanged() {},
  handlePuzzleDelete() {},
  handlePuzzleDuplicate() {},
  handlePuzzlePayloadChanged(_) {},
  handlePuzzleTypeChanged(_) {},
};

export const WaitingCodeItem = Template.bind({});
WaitingCodeItem.args = {
  puzzle: {
    _id: new ObjectID().toString(),
    type: "waiting-code",
    payload: waitingCodeItemFactory.defaultDefinition,
  },
  index: 4,
  handleSelectedPuzzleChanged() {},
  handlePuzzleDelete() {},
  handlePuzzleDuplicate() {},
  handlePuzzlePayloadChanged(_) {},
  handlePuzzleTypeChanged(_) {},
};

export const LoadSceneItem = Template.bind({});
LoadSceneItem.args = {
  puzzle: {
    _id: new ObjectID().toString(),
    type: "load-scene",
    payload: loadSceneItemFactory.defaultDefinition,
  },
  index: 4,
  handleSelectedPuzzleChanged() {},
  handlePuzzleDelete() {},
  handlePuzzleDuplicate() {},
  handlePuzzlePayloadChanged(_) {},
  handlePuzzleTypeChanged(_) {},
};

export const NarrativeItem = Template.bind({});
NarrativeItem.args = {
  puzzle: {
    _id: new ObjectID().toString(),
    type: "narrative",
    payload: narrativeItemFactory.defaultDefinition,
  },
  index: 4,
  handleSelectedPuzzleChanged() {},
  handlePuzzleDelete() {},
  handlePuzzleDuplicate() {},
  handlePuzzlePayloadChanged(_) {},
  handlePuzzleTypeChanged(_) {},
};

export const UnlockPasswordItem = Template.bind({});
UnlockPasswordItem.args = {
  puzzle: {
    _id: new ObjectID().toString(),
    type: "unlock-password",
    payload: unlockPasswordItemFactory.defaultDefinition,
  },
  index: 4,
  handleSelectedPuzzleChanged() {},
  handlePuzzleDelete() {},
  handlePuzzleDuplicate() {},
  handlePuzzlePayloadChanged(_) {},
  handlePuzzleTypeChanged(_) {},
};
