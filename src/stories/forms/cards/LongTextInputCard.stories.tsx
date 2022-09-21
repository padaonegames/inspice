import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";

import LongTextInputCard from "../../../components/Forms/Cards/LongTextInputCard";

export default {
  title: "Forms/Cards/Long Text Input Card",
  component: LongTextInputCard,
  decorators: [(Story) => <div style={{ margin: "3em" }}>{Story()}</div>],
} as ComponentMeta<typeof LongTextInputCard>;

const Template: ComponentStory<typeof LongTextInputCard> = (args) => (
  <LongTextInputCard {...args} />
);

export const NonRequired = Template.bind({});
NonRequired.args = {
  promptText: `Enter a description for your activity:`,
  fieldPayload: {
    placeholder: "Description...",
    maxLength: 500,
  },
  response: { text: "" },
  required: false,
  requiredAlert: false,
};

export const Required = Template.bind({});
Required.args = {
  promptText: `Enter a description for your activity:`,
  fieldPayload: {
    placeholder: "Description...",
    maxLength: 500,
  },
  response: { text: "" },
  required: true,
  requiredAlert: false,
};

export const RequiredAlert = Template.bind({});
RequiredAlert.args = {
  promptText: `Enter a description for your activity:`,
  fieldPayload: {
    placeholder: "Description...",
    maxLength: 500,
  },
  response: { text: "" },
  required: true,
  requiredAlert: true,
};
