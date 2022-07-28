import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import {
  EditableLoadSceneItemContent,
  loadSceneItemFactory,
} from "../../templates/EscapeRoomAuthoring/components/items/LoadSceneItem";

export default {
  title: "Escape Rooms/Load Scene Item",
  component: EditableLoadSceneItemContent,
  decorators: [
    (Story) => {
      return Story();
    },
  ],
} as ComponentMeta<typeof EditableLoadSceneItemContent>;

const Template: ComponentStory<typeof EditableLoadSceneItemContent> = (
  args
) => <EditableLoadSceneItemContent {...args} />;

export const Default = Template.bind({});
Default.args = {
  payload: loadSceneItemFactory.defaultDefinition,
};

export const Alternative = Template.bind({});
Alternative.args = {
  payload: {
    sceneName: "My scene name",
  },
};
