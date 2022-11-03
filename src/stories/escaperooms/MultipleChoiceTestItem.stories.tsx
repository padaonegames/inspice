import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import {
  EditableMultipleChoiceTestItemContent,
  multipleChoiceTestItemFactory,
} from "../../templates/EscapeRoomAuthoring/components/items/MutipleChoiceTestItem";

export default {
  title: "Escape Rooms/Multiple Choice Item",
  component: EditableMultipleChoiceTestItemContent,
  decorators: [
    (Story) => {
      return Story();
    },
  ],
} as ComponentMeta<typeof EditableMultipleChoiceTestItemContent>;

const Template: ComponentStory<typeof EditableMultipleChoiceTestItemContent> = (
  args
) => <EditableMultipleChoiceTestItemContent {...args} />;

export const Default = Template.bind({});
Default.args = {
  payload: multipleChoiceTestItemFactory.defaultDefinition,
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
    minAnswers: 1,
    maxAnswers: 1
  },
};
