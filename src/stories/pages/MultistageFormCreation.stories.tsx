import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import { MemoryRouter } from "react-router-dom";
import { MultistageFormActivityDefinition } from "../../services/multistageFormActivity.model";
import { CreateMultistageFormActivityScreenComponent } from "../../templates/MultistageForm/CreateActivity/Screen";

export default {
  title: "Pages/Multistage Form Creation",
  component: CreateMultistageFormActivityScreenComponent,
  decorators: [
    (Story) => {
      return <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>;
    },
  ],
} as ComponentMeta<typeof CreateMultistageFormActivityScreenComponent>;

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

const Template: ComponentStory<
  typeof CreateMultistageFormActivityScreenComponent
> = (_) => (
  <CreateMultistageFormActivityScreenComponent
    initialActivityDefinition={sample_base}
  />
);

export const Default = Template.bind({});
Default.args = {};
