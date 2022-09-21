import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";

import CheckBoxGroupInputCard from "../../../components/Forms/Cards/CheckBoxGroupInputCard";

export default {
  title: "Forms/Cards/Checkbox Group Input Card",
  component: CheckBoxGroupInputCard,
  decorators: [(Story) => <div style={{ margin: "3em" }}>{Story()}</div>],
} as ComponentMeta<typeof CheckBoxGroupInputCard>;

const Template: ComponentStory<typeof CheckBoxGroupInputCard> = (args) => (
  <CheckBoxGroupInputCard {...args} />
);

export const NoneChecked = Template.bind({});
NoneChecked.args = {
  promptText: "Specify allowed media input types:",
  fieldPayload: {
    fields: ["Text", "Audio", "Image"],
  },
  response: { selectedFields: [] },
  required: false,
  requiredAlert: false,
};

export const SomeChecked = Template.bind({});
SomeChecked.args = {
  promptText: "Specify allowed media input types:",
  fieldPayload: {
    fields: ["Text", "Audio", "Image"],
  },
  response: { selectedFields: ["Audio", "Image"] },
  required: false,
  requiredAlert: false,
};

export const RequiredAlert = Template.bind({});
RequiredAlert.args = {
  promptText: "Specify allowed media input types:",
  fieldPayload: {
    fields: ["Text", "Audio", "Image"],
  },
  response: { selectedFields: ["Audio", "Image"] },
  required: true,
  requiredAlert: true,
};
