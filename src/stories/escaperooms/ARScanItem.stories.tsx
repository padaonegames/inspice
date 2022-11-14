import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import {
  EditableARScanItemContent,
  arScanItemFactory,
} from "../../templates/EscapeRoomAuthoring/components/items/ARScanItem";

export default {
  title: "Escape Rooms/AR Scan Item",
  component: EditableARScanItemContent,
  decorators: [
    (Story) => {
      return Story();
    },
  ],
} as ComponentMeta<typeof EditableARScanItemContent>;

const Template: ComponentStory<typeof EditableARScanItemContent> = (args) => (
  <EditableARScanItemContent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  payload: arScanItemFactory.defaultDefinition,
};

export const Alternative = Template.bind({});
Alternative.args = {
  payload: {
    imageSrc:
      "https://cdn3.vectorstock.com/i/1000x1000/60/67/example-rubber-stamp-vector-12386067.jpg",
    trackableSize: 1,
    trackableHint: "",
  },
};
