import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import { useState } from "react";
import { MemoryRouter } from "react-router-dom";
import { MultistageFormActivityDefinition } from "../../services/multistageFormActivity.model";
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

const sample_base: MultistageFormActivityDefinition = {
  activityType: "Multistage Form",
  activityTitle: "",
  activityAuthor: "undefined",
  beginsOn: new Date(),
  endsOn: new Date(),
  stages: [],
  formResponsesDatasetUuid: "",
  _id: "",
}; // sample_base

const Template: ComponentStory<typeof CreateMultistageFormScreenComponent> = (
  _
) => {
  const [activityDefinition, setActivityDefinition] =
    useState<MultistageFormActivityDefinition>(sample_base);

  return (
    <CreateMultistageFormScreenComponent
      activityDefinition={activityDefinition}
      setActivityDefinition={setActivityDefinition}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
