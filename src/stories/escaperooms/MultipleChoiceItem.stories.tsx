import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import {
  EditableMultipleChoiceItemContent,
  multipleChoiceItemFactory,
} from "../../templates/EscapeRoomAuthoring/components/items/MutipleChoiceItem";

export default {
  title: "Escape Rooms/Multiple Choice Item",
  component: EditableMultipleChoiceItemContent,
  decorators: [
    (Story) => {
      return Story();
    },
  ],
} as ComponentMeta<typeof EditableMultipleChoiceItemContent>;

const Template: ComponentStory<typeof EditableMultipleChoiceItemContent> = (
  args
) => <EditableMultipleChoiceItemContent {...args} />;

export const Default = Template.bind({});
Default.args = {
  payload: multipleChoiceItemFactory.defaultDefinition,
};

export const Alternative = Template.bind({});
Alternative.args = {
  payload: {
    prompt: "What is the correct answer?",
    answers: [
      "Not this one",
      "Maybe this one",
      "This must be the one",
      "Not this one",
      "Could be this one",
      "Not this one",
    ],
    correctAnswers: [2],
  },
};
