import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import { ShowAltDimensions } from "@styled-icons/boxicons-regular/ShowAlt";
import {
  CharacterDefinition,
  default_character,
} from "../../services/escapeRoomActivity.model";
import { EscapeRoomCharacterCard } from "../../templates/EscapeRoomAuthoring/components/items/EscapeRoomCharacterCard";

export default {
  title: "Escape Rooms/CharacterCard",
  component: EscapeRoomCharacterCard,
  decorators: [
    (Story) => {
      return Story();
    },
  ],
} as ComponentMeta<typeof EscapeRoomCharacterCard>;

const Template: ComponentStory<typeof EscapeRoomCharacterCard> = (args) => (
  <EscapeRoomCharacterCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  initialCharacterDefinition: default_character,
};

export const DefaultEdit = Template.bind({});
DefaultEdit.args = {
  editMode: true,
  showAlert() {
    return true;
  },
  initialCharacterDefinition: {
    name: "",
    description:
      "This informaction is not valid for a character, it must at least have a name, which also needs to be unique among the rest of the characters",
    imageSrc: "",
  },
};

export const Alternative = Template.bind({});
Alternative.args = {
  initialCharacterDefinition: {
    name: "Special name",
    description: "Special description",
    imageSrc:
      "https://previews.123rf.com/images/aquir/aquir1311/aquir131100316/23569861-sample-grunge-red-round-stamp.jpg",
  },
};
export const AlternativeEdit = Template.bind({});
AlternativeEdit.args = {
  editMode: true,
  showAlert() {
    return false;
  },
  initialCharacterDefinition: {
    name: "Special name",
    description: "Special description",
    imageSrc:
      "https://previews.123rf.com/images/aquir/aquir1311/aquir131100316/23569861-sample-grunge-red-round-stamp.jpg",
  },
};

export const InvalidCharacter = Template.bind({});
InvalidCharacter.args = {
  editMode: true,
  showAlert() {
    return true;
  },
  initialCharacterDefinition: {
    name: "Problem",
    description: "Alert, there must be another character with this exact name",
    imageSrc:
      "https://previews.123rf.com/images/aquir/aquir1311/aquir131100316/23569861-sample-grunge-red-round-stamp.jpg",
  },
};
