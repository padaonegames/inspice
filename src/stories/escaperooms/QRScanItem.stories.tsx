import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import {
  EditableQRScanItemContent,
  qrScanItemFactory,
} from "../../templates/EscapeRoomAuthoring/components/items/QRScanItem";

export default {
  title: "Escape Rooms/QR Scan Item",
  component: EditableQRScanItemContent,
  decorators: [
    (Story) => {
      return Story();
    },
  ],
} as ComponentMeta<typeof EditableQRScanItemContent>;

const Template: ComponentStory<typeof EditableQRScanItemContent> = (args) => (
  <EditableQRScanItemContent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  payload: qrScanItemFactory.defaultDefinition,
};

export const Alternative = Template.bind({});
Alternative.args = {
  payload: { encodedText: "Hello", codeHint: "" },
};
