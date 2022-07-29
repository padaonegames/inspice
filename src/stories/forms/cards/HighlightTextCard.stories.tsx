import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";

import HighLightTextCard from "../../../components/Forms/Cards/HighLightTextCard";

export default {
  title: "Forms/Cards/Highlight Text Card",
  component: HighLightTextCard,
  decorators: [(Story) => <div style={{ margin: "3em" }}>{Story()}</div>],
} as ComponentMeta<typeof HighLightTextCard>;

const Template: ComponentStory<typeof HighLightTextCard> = (args) => (
  <HighLightTextCard {...args} />
);

export const EmptyText = Template.bind({});
EmptyText.args = {
  promptText: "Empty content",
  text: "",
  highlighters: [],
};

const availableColors = [
  "#e21b3c",
  "#1368ce",
  "#d89e00",
  "#26890c",
  "#0aa3a3",
  "#864cbf",
];

export const MediumText = Template.bind({});
MediumText.args = {
  promptText: "Preview of a medium size text",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur pellentesque lectus, sed maximus odio ullamcorper vitae. Nullam tempus consectetur consequat. Sed sit amet pharetra leo. Phasellus faucibus iaculis accumsan. Etiam imperdiet at mauris eget consectetur. Cras fermentum ultricies mi ac ultrices. Nunc feugiat justo ut felis convallis, eget mattis nibh porta. Mauris turpis tellus, ultricies sed lacus ut, tempor aliquam nisl. Aliquam enim libero, lacinia quis tortor sit amet, semper ultrices lectus. Sed porta risus ut est tempus, ornare elementum dui consectetur.",
  highlighters: [
    { tag: "1", color: "#e21b3c" },
    { tag: "2", color: "#1368ce" },
    { tag: "3", color: "#d89e00" },
    { tag: "4", color: "#26890c" },
    { tag: "5", color: "#0aa3a3" },
    { tag: "6", color: "#864cbf" },
  ],
};
