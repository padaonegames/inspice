import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import { RoomPuzzleSettingsEditor } from '../../templates/EscapeRoomAuthoring/components/items/RoomPuzzleSettingsEditor';
import { default_puzzle } from '../../services/escapeRoomActivity.model';
import { multipleChoiceItemFactory } from '../../templates/EscapeRoomAuthoring/components/items/MutipleChoiceItem';
import { qrScanItemFactory } from '../../templates/EscapeRoomAuthoring/components/items/QRScanItem';
import { arScanItemFactory } from '../../templates/EscapeRoomAuthoring/components/items/ARScanItem';
import { waitingCodeItemFactory } from '../../templates/EscapeRoomAuthoring/components/items/WaitingCodeItem';

export default {
  title: 'Escape Rooms/Room Puzzle Settings Editor',
  component: RoomPuzzleSettingsEditor,
  decorators: [
    (Story) => {
      return (
        Story()
      );
    },
  ],
} as ComponentMeta<typeof RoomPuzzleSettingsEditor>;

const Template: ComponentStory<typeof RoomPuzzleSettingsEditor> = (args) => <RoomPuzzleSettingsEditor {...args} />;

export const Default = Template.bind({});
Default.args = {
  puzzle: default_puzzle,
  index: 0,
  handleSelectedPuzzleChanged() { },
  handlePuzzleDelete() { },
  handlePuzzleDuplicate() { },
  handlePuzzlePayloadChanged(puzzlePayload) { },
  handlePuzzleTypeChanged(puzzleNewType) { },
};

export const MultipleChoice = Template.bind({});
MultipleChoice.args = {
  puzzle: { type: "multiple-choice", payload: multipleChoiceItemFactory.defaultDefinition },
  index: 1,
  handleSelectedPuzzleChanged() { },
  handlePuzzleDelete() { },
  handlePuzzleDuplicate() { },
  handlePuzzlePayloadChanged(puzzlePayload) { },
  handlePuzzleTypeChanged(puzzleNewType) { },
};

export const QRScan = Template.bind({});
QRScan.args = {
  puzzle: { type: "qr-scan", payload: qrScanItemFactory.defaultDefinition },
  index: 2,
  handleSelectedPuzzleChanged() { },
  handlePuzzleDelete() { },
  handlePuzzleDuplicate() { },
  handlePuzzlePayloadChanged(puzzlePayload) { },
  handlePuzzleTypeChanged(puzzleNewType) { },
};

export const ARScan = Template.bind({});
ARScan.args = {
  puzzle: { type: "ar-scan", payload: arScanItemFactory.defaultDefinition },
  index: 3,
  handleSelectedPuzzleChanged() { },
  handlePuzzleDelete() { },
  handlePuzzleDuplicate() { },
  handlePuzzlePayloadChanged(puzzlePayload) { },
  handlePuzzleTypeChanged(puzzleNewType) { },
};

export const WaitingCodeItem = Template.bind({});
WaitingCodeItem.args = {
  puzzle: { type: "waiting-code", payload: waitingCodeItemFactory.defaultDefinition },
  index: 4,
  handleSelectedPuzzleChanged() { },
  handlePuzzleDelete() { },
  handlePuzzleDuplicate() { },
  handlePuzzlePayloadChanged(puzzlePayload) { },
  handlePuzzleTypeChanged(puzzleNewType) { },
};