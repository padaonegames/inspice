import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import { useState } from "react";
import { MemoryRouter } from "react-router-dom";
import { MultistageFormActivity } from "../../services/multistageFormActivity.model";
import { CreateMultistageFormScreenComponent } from "../../templates/MultistageForm/CreateActivity/Screen";

export default {
  title: "Pages/Multistage Form Creation",
  component: CreateMultistageFormScreenComponent,
  decorators: [
    (Story) => {
      return <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>;
    },
  ],
} as ComponentMeta<typeof CreateMultistageFormScreenComponent>;

const sample_base: MultistageFormActivity = {
  title: "",
  author: "undefined",
  stages: [],
  _id: "",
  isValid: false,
}; // sample_base

const Template: ComponentStory<typeof CreateMultistageFormScreenComponent> = (
  _
) => {
  const [activityDefinition, setActivityDefinition] =
    useState<MultistageFormActivity>(sample_base);

  return <CreateMultistageFormScreenComponent />;
};

export const Default = Template.bind({});
Default.args = {};
