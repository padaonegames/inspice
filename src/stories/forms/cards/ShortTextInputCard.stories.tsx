import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";

import ShortTextInputCard from "../../../components/Forms/Cards/ShortTextInputCard";

export default {
  title: "Forms/Cards/Short Text Input Card",
  component: ShortTextInputCard,
  decorators: [(Story) => <div style={{ margin: "3em" }}>{Story()}</div>],
} as ComponentMeta<typeof ShortTextInputCard>;

const Template: ComponentStory<typeof ShortTextInputCard> = (args) => (
  <ShortTextInputCard {...args} />
);

export const NonRequired = Template.bind({});
NonRequired.args = {
  promptText: "Choose a name for your activity:",
  fieldPayload: {
    placeholder: "Activity name...",
    maxLength: 30,
  },
  response: { text: "" },
  required: false,
  requiredAlert: false,
};

export const Required = Template.bind({});
Required.args = {
  promptText: "Choose a name for your activity:",
  fieldPayload: {
    placeholder: "Activity name...",
    maxLength: 30,
  },
  response: { text: "" },
  required: true,
  requiredAlert: false,
};

export const RequiredAlert = Template.bind({});
RequiredAlert.args = {
  promptText: "Choose a name for your activity:",
  fieldPayload: {
    placeholder: "Activity name...",
    maxLength: 30,
  },
  response: { text: "" },
  required: true,
  requiredAlert: true,
};
