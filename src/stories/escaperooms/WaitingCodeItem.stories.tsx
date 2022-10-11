import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import {
  EditableWaitingCodeItemContent,
  waitingCodeItemFactory,
} from "../../templates/EscapeRoomAuthoring/components/items/WaitingCodeItem";

export default {
  title: "Escape Rooms/Waiting Code Item",
  component: EditableWaitingCodeItemContent,
  decorators: [
    (Story) => {
      return Story();
    },
  ],
} as ComponentMeta<typeof EditableWaitingCodeItemContent>;

const Template: ComponentStory<typeof EditableWaitingCodeItemContent> = (
  args
) => <EditableWaitingCodeItemContent {...args} />;

export const Default = Template.bind({});
Default.args = {
  payload: waitingCodeItemFactory.defaultDefinition,
};

export const Alternative = Template.bind({});
Alternative.args = {
  payload: {
    codes: ["ELEFANTE", "ELFANTE"],
    text: "El código para resolver este puzle es el nombre del animal que tenemos frente a nosotros",
  },
};
