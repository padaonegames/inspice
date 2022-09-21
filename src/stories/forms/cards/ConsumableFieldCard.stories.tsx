import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import { MultistageFormFieldDefinition } from "../../../services/multistageFormActivity.model";
import { ConsumableFieldCard } from "../../../templates/MultistageForm/ConsumeForm/components/ConsumableFieldCard";
import { fieldMappings } from "../../../templates/MultistageForm/ConsumeForm/Steps/ConsumeFormStageStep";

export default {
  title: "Forms/Cards/Consumable Field Card",
  component: ConsumableFieldCard,
  decorators: [(Story) => <div style={{ margin: "3em" }}>{Story()}</div>],
} as ComponentMeta<typeof ConsumableFieldCard>;

const Template: ComponentStory<typeof ConsumableFieldCard> = (args) => (
  <ConsumableFieldCard {...args} />
);

const sample_short_text: MultistageFormFieldDefinition = {
  _id: "1-1",
  fieldData: {
    type: "short-text",
    payload: {},
  },
  promptText: "Please enter your name:",
  required: true,
}; // sample_base

export const Default = Template.bind({});
Default.args = {
  fieldMappings: fieldMappings,
  formDefinition: sample_short_text,
  initialUserResponses: { "1-1": { text: "" } },
};
