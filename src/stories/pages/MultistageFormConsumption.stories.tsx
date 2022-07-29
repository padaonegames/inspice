import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import { MemoryRouter } from "react-router-dom";
import { MultistageFormActivityDefinition } from "../../services/multistageFormActivity.model";
import { ConsumeMultistageFormScreenComponent } from "../../templates/MultistageForm/ConsumeForm/Screen";

export default {
  title: "Pages/Multistage Form Consumption",
  component: ConsumeMultistageFormScreenComponent,
  decorators: [
    (Story) => {
      return <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>;
    },
  ],
} as ComponentMeta<typeof ConsumeMultistageFormScreenComponent>;

const sample_base: MultistageFormActivityDefinition = {
  activityType: "Multistage Form",
  activityTitle: "",
  activityAuthor: "undefined",
  beginsOn: new Date(),
  endsOn: new Date(),
  stages: [
    {
      _id: "1",
      forms: [
        {
          _id: "1-1",
          fieldData: {
            type: "short-text",
            payload: {},
          },
          promptText: "Please enter your name:",
          required: true,
        },
        {
          _id: "1-2",
          fieldData: {
            type: "checkbox",
            payload: {
              fields: ["Image", "Video", "Text"],
            },
          },
          promptText:
            "Please enter which types of media you would like to submit:",
          required: true,
        },
        {
          _id: "1-3",
          fieldData: {
            type: "display-video",
            payload: {
              src: "https://www.youtube.com/watch?v=VR5k73E2tJY",
            },
          },
          promptText: "Please watch this video and answer the question below:",
        },
        {
          _id: "1-4",
          fieldData: {
            type: "multiple-choice",
            payload: {
              answers: ["Classical music", "Rock", "Pop", "None of the above"],
            },
          },
          promptText: "What type of music is played in the video?",
          required: true,
        },
      ],
    },
    {
      _id: "2",
      forms: [
        {
          _id: "2-1",
          fieldData: {
            type: "highlight-text",
            payload: {
              text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur 
                    pellentesque lectus, sed maximus odio ullamcorper vitae. Nullam tempus consectetur 
                    consequat. Sed sit amet pharetra leo. Phasellus faucibus iaculis accumsan. Etiam imperdiet 
                    at mauris eget consectetur. Cras fermentum ultricies mi ac ultrices. Nunc feugiat justo ut 
                    felis convallis, eget mattis nibh porta. Mauris turpis tellus, ultricies sed lacus ut, 
                    tempor aliquam nisl. Aliquam enim libero, lacinia quis tortor sit amet, semper ultrices lectus. 
                    Sed porta risus ut est tempus, ornare elementum dui consectetur.`,
              highlighters: [
                { tag: "1", color: "#e21b3c" },
                { tag: "2", color: "#1368ce" },
                { tag: "3", color: "#d89e00" },
                { tag: "4", color: "#26890c" },
                { tag: "5", color: "#0aa3a3" },
                { tag: "6", color: "#864cbf" },
              ],
            },
          },
          promptText: "Please highlight the following text with your emotions:",
          required: true,
        },
        {
          _id: "2-2",
          fieldData: {
            type: "checkbox",
            payload: {
              fields: ["Image", "Video", "Text"],
            },
          },
          promptText:
            "Please enter which types of media you would like to submit:",
          required: true,
        },
      ],
    },
  ],
  formResponsesDatasetUuid: "",
  _id: "",
}; // sample_base

const Template: ComponentStory<typeof ConsumeMultistageFormScreenComponent> = ({
  activityDefinition,
  userResponses,
}) => (
  <ConsumeMultistageFormScreenComponent
    activityDefinition={activityDefinition}
    userResponses={userResponses}
  />
);

export const Default = Template.bind({});
Default.args = {
  activityDefinition: sample_base,
  userResponses: {
    "1-1": { text: "" },
    "1-2": { selectedFields: ["Video"] },
  },
};
