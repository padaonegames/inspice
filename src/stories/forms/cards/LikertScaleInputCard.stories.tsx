import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";

import LikertScaleInputCard from "../../../components/Forms/Cards/LikertScaleInputCard";

export default {
  title: "Forms/Cards/Likert Scale Input Card",
  component: LikertScaleInputCard,
  decorators: [(Story) => <div style={{ margin: "3em" }}>{Story()}</div>],
} as ComponentMeta<typeof LikertScaleInputCard>;

const Template: ComponentStory<typeof LikertScaleInputCard> = (args) => (
  <LikertScaleInputCard {...args} />
);

export const NoneChecked = Template.bind({});
NoneChecked.args = {
  promptText: "Rate your experience about using our products:",
  fieldPayload: {
    questions: [
      "Merchandise",
      "Books",
      "Board Games",
      "Consoles",
      "Video Games",
    ],
    scale: [
      "Very Unsatisfied",
      "Unsatisfied",
      "Neutral",
      "Satisfied",
      "Very Satisfied",
    ],
  },
  response: { responses: [undefined, 0, 1, 2, 3] },
  required: false,
  requiredAlert: false,
};
