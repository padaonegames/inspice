import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";

import MultipleChoiceCard from "../../../components/Forms/Cards/MultipleChoiceCard";

export default {
  title: "Forms/Cards/Multiple Choice Card",
  component: MultipleChoiceCard,
  decorators: [(Story) => <div style={{ margin: "3em" }}>{Story()}</div>],
} as ComponentMeta<typeof MultipleChoiceCard>;

const Template: ComponentStory<typeof MultipleChoiceCard> = (args) => (
  <MultipleChoiceCard {...args} />
);

export const NoneChecked = Template.bind({});
NoneChecked.args = {
  promptText: "How do you usually go to school?:",
  fieldPayload: {
    answers: ["On Foot", "By Bike", "By Car", "By Train", "Other"],
    maxAnswers: 2,
  },
  response: { selectedResponses: [] },
  required: false,
  requiredAlert: false,
};

export const MaximumChecked = Template.bind({});
MaximumChecked.args = {
  promptText: "How do you usually go to school? (choose up to 2):",
  fieldPayload: {
    answers: ["On Foot", "By Bike", "By Car", "By Train", "Other"],
    maxAnswers: 2,
  },
  response: { selectedResponses: [1, 3] },
  required: false,
  requiredAlert: false,
};

export const SomeChecked = Template.bind({});
SomeChecked.args = {
  promptText: "How do you usually go to school? (choose up to 2):",
  fieldPayload: {
    answers: ["On Foot", "By Bike", "By Car", "By Train", "Other"],
    maxAnswers: 2,
  },
  response: { selectedResponses: [1] },
  required: false,
  requiredAlert: false,
};
