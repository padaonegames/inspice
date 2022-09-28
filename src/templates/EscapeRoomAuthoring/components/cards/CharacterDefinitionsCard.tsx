import { useState } from "react";
import styled, { css } from "styled-components";
import FormCard from "../../../../components/Forms/Cards/FormCard";
import {
  CharacterDefinition,
  CharacterDefinitionsResponseDefinition,
  default_character,
} from "../../../../services/escapeRoomActivity.model";
import { ConsumableFieldProps } from "../../../../services/multistageFormActivity.model";
import EscapeRoomCharacterCard from "../items/EscapeRoomCharacterCard";
import { UserPlus } from "@styled-icons/boxicons-regular/UserPlus";

export const fieldTypeIcon = css`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.75em;
`;

const AddCharacterIcon = styled(UserPlus)`
  ${fieldTypeIcon}
  cursor: pointer;
  color: white;
`;

const AddCharacterButton = styled.button`
  font-family: ${(props) => props.theme.contentFont};
  font-size: 0.8em;
  cursor: pointer;
  background-color: hsl(10, 80%, 80%);
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  height: 3em;
  padding: 0 1em;
  color: white;
  width: fit-content;
  margin-left: auto;
  margin-top: 1em;
`;

export interface CharacterDefinitionsCardProps
  extends ConsumableFieldProps<{}, CharacterDefinitionsResponseDefinition> {
  /** Prompt for the user to fill in this field */
  promptText?: string;
  /** Whether this field should always be filled in by the user */
  required?: boolean;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
} // CharacterDefinitionsCardProps

export const CharacterDefinitionsCard = (
  props: CharacterDefinitionsCardProps
): JSX.Element => {
  const {
    promptText = "",
    requiredAlert,
    required,
    response,
    onResponseChanged,
  } = props;

  const { characters } = response;

  // Index of the character that is currently being (or `none`, if no editing is taking place)
  const [selectedCharacterIndex, setSelectedCharacterIndex] =
    useState<number | "none">("none");

  const isCharacterNameValid = (
    characterIndex: number,
    characterName: string
  ) => {
    // new name is only valid if it is non empty and
    // for every character in our array of characters, it is either the one with the
    // same index as ours or has a different name. (unique)
    return (
      characterName.length > 0 &&
      characters.every(
        (character, i) =>
          i === characterIndex || character.name !== characterName
      )
    );
  }; // isCharacterNameValid

  const handleUpdateCharacterData = (
    newData: CharacterDefinition,
    index: number
  ) => {
    if (!onResponseChanged || index < 0 || index >= characters.length) return;
    onResponseChanged({
      characters: [
        ...characters.slice(0, index),
        newData,
        ...characters.slice(index + 1, characters.length),
      ],
    });
    setSelectedCharacterIndex("none");
  }; // handleUpdateCharacterData

  const handleSelectCharacter = (index: number | "none") => {
    if (index !== "none" && (index < 0 || index >= characters.length)) return;
    if (index === selectedCharacterIndex) {
      // deselect
      const res = window.confirm("Discard changes to selected character?");
      if (!res) return;
      setSelectedCharacterIndex("none");
      return;
    }
    if (selectedCharacterIndex === characters.length) {
      const res = window.confirm(
        "Select this character and lose progress for your currently selected character?"
      );
      if (!res) return;
    }
    setSelectedCharacterIndex(index);
  }; // handleSelectCharacter

  const handleDeleteCharacter = (index: number) => {
    if (!onResponseChanged || index < 0 || index >= characters.length) return;
    onResponseChanged({
      characters: [
        ...characters.slice(0, index),
        ...characters.slice(index + 1, characters.length),
      ],
    });

    if (selectedCharacterIndex !== "none" && index < selectedCharacterIndex)
      setSelectedCharacterIndex(selectedCharacterIndex - 1);
  }; // handleDeleteCharacter

  const handleSaveNewCharacter = (characterData: CharacterDefinition) => {
    if (!onResponseChanged || selectedCharacterIndex !== characters.length)
      return;
    onResponseChanged({ characters: [...characters, characterData] });
    setSelectedCharacterIndex("none");
  }; // handleSaveNewCharacter

  const handleAddCharacter = () => {
    setSelectedCharacterIndex(characters.length);
  }; // handleAddCharacter

  return (
    <FormCard
      promptText={promptText}
      required={required}
      requiredAlert={requiredAlert}
    >
      {characters.map((character, index) => (
        // Character card that can be displayer in two modes (edit and display only)
        <EscapeRoomCharacterCard
          key={character.name}
          initialCharacterDefinition={character}
          onSaveCharacterData={(value) =>
            handleUpdateCharacterData(value, index)
          }
          onToggleCharacterEditMode={() => handleSelectCharacter(index)}
          onDeleteCharacter={() => handleDeleteCharacter(index)}
          isNameValid={(value) => isCharacterNameValid(index, value)}
          editMode={selectedCharacterIndex === index}
          editButtonAvaliable={
            selectedCharacterIndex === "none" ||
            selectedCharacterIndex === characters.length
          }
        />
      ))}
      {/* If there are no characters being modified or being created a button to a add a new one is displayer */}
      {selectedCharacterIndex === "none" && (
        <AddCharacterButton onClick={handleAddCharacter}>
          <AddCharacterIcon /> New Character
        </AddCharacterButton>
      )}
      {/* Character editor at the end of the character list to add at the end of the list */}
      {selectedCharacterIndex === characters.length && (
        <EscapeRoomCharacterCard
          initialCharacterDefinition={default_character}
          onSaveCharacterData={handleSaveNewCharacter}
          onToggleCharacterEditMode={() => handleSelectCharacter("none")}
          isNameValid={(value) =>
            isCharacterNameValid(characters.length, value)
          }
          editMode={true}
          editButtonAvaliable={false}
        />
      )}
    </FormCard>
  );
}; // CharacterDefinitionsCard

export default CharacterDefinitionsCard;
