import {
  CharacterDefinition,
  default_character,
} from "../../../../services/escapeRoomActivity.model";
import { PromptField } from "./PromptField";

import { useState } from "react";
import { EscapeRoomCharacterCard } from "./EscapeRoomCharacterCard";

import styled from "styled-components";
import { UserPlus } from "@styled-icons/boxicons-regular/UserPlus";

import { Settings } from "@styled-icons/fluentui-system-filled/Settings";
const SettingsIcon = styled(Settings)`
  position: absolute;
  right: 8%;
  bottom: 0%;
  color: rgb(255, 255, 255);

  box-sizing: content-box;
  padding: 4px;
  border-radius: 100%;
  height: 1.5em;
  width: 1.5em;

  // &:hover {
  //   background-color: rgba(255, 255, 255, 0.3);
  // }
`;

const AddCharacterIcon = styled(UserPlus)`
  color: white;
  height: 1.75em;
  width: auto;
`;

const Wrapper = styled.main`
  position: relative;
  left: 12%;
  height: 100%;
  width: 88%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
  border: 0px none;
  font: inherit;
`;

const CharactersContainer = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0.75em;
  margin-bottom: 0rem;
  align-self: center;
  border: 1px solid rgb(15, 90, 188);
  background-color: rgba(220, 220, 220, 1);
  border-radius: 0.5rem;
`;

interface InputAreaProps {
  width?: string;
  height?: string;
  dimBackground?: boolean;
}
export const InputArea = styled.textarea<InputAreaProps>`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  width: ${(props) => props.width ?? "100%"};
  height: ${(props) => props.height ?? "6em"};
  margin-top: 10px;
  color: ${(props) => props.theme.textColor};
  border: none;
  outline: none;
  padding: 0.65em;
  background-color: ${(props) =>
    props.dimBackground ? "#f8f9fa" : "transparent"};
  resize: none;
  overflow-y: hidden;

  text-align: center;

  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  &:focus {
    box-shadow: #c44c49 0px -4px 0px 0px inset;
  }
`;
const Root = styled.div`
  position: relative;
  height: 10%;
  width: 100%;
  cursor: pointer;
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: rgb(19, 104, 206);
  border: 3px;
  border-radius: 0.5rem;
  border-style: solid;
  border-color: rgb(15, 90, 188);
  box-shadow: 0px 0px 10px 0px #000000;

  &:hover {
    background-color: rgb(23, 128, 234);
  }
`;

const CheckboxTitle = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;

  position: relative;
  height: 1.25em;
  width: fit-content;
  margin-top: 10px;
  color: rgb(19, 104, 206);
`;

const GeneralSettingsContainer = styled.div`
  width: 90%;
  margin-top: 5px;
  display: flex;
  background-color: rgb(255, 255, 255);
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-bottom: 2px solid #dadce0;

  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const SettingsDiv = styled.div`
  width: 95%;
  margin-top: 5px;
  display: flex;
  background-color: transparent;
  flex-direction: column;
  align-items: left;
  text-align: center;
  padding: 10px;

  margin-bottom: 2rem;
  border-radius: 0.25rem;
  border-bottom: 2px solid #dadce0;
  background-color: rgba(240, 240, 240, 1);
`;

const GeneralSettingsTitle = styled.div`
  font-size: 3em;
  font-weight: bold;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  color: rgb(15, 90, 188);
  border-bottom: 2px solid rgb(15, 90, 188);

  position: relative;
  height: 1.25em;
  width: fit-content;
  margin-top: 10px;
`;

const AddPuzzleButton = styled.div`
  position: relative;
  font-size: 1em;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  cursor: pointer;

  margin-top: 1em;
  margin-bottom: 0.25em;
  padding: 0.5em 0.75em;
  border-top: none;
  color: white;

  display: flex;
  text-align: center;
  align-items: center;

  background-color: rgb(19, 104, 206);
  border-radius: 0.5rem;
  border: 3px solid rgb(15, 90, 188);
  &:hover {
    transition: border 0.25s;
    border: 3px solid rgb(255, 255, 255);
  }
`;
export interface EscapeRoomSettingsProps {
  escapeRoomTitle: string;
  escapeRoomDescription: string;
  escapeRoomCharacters: CharacterDefinition[];
  onTitleChanged?: (title: string) => void;
  onDescriptionChanged?: (title: string) => void;
  onCharactersChanged?: (characters: CharacterDefinition[]) => void;
} // EscapeRoomSettingsProps

export const EscapeRoomSettings = (
  props: EscapeRoomSettingsProps
): JSX.Element => {
  const {
    escapeRoomTitle,
    escapeRoomCharacters,
    escapeRoomDescription,
    onTitleChanged,
    onDescriptionChanged,
    onCharactersChanged,
  } = props;

  const [selectedCharacterIndex, setSelectedCharacterIndex] =
    useState<number | "none">("none");
  const [editingNewCharacter, setEditingNewCharacter] =
    useState<boolean>(false);

  const handleEditTitle = (value: string) => {
    if (!onTitleChanged) return;
    onTitleChanged(value);
  }; // handleEditTitle

  const handleEditDescription = (value: string) => {
    if (!onDescriptionChanged) return;
    onDescriptionChanged(value);
  }; // handleEditTitle

  const checkRepeatedName = (characterIndex: number, newName: string) => {
    let i = 0;
    while (i < escapeRoomCharacters.length) {
      if (i !== characterIndex && escapeRoomCharacters[i].name === newName)
        return true;
      i++;
    }
    return false;
  };

  const handleUpdateCharacterData = (
    newData: CharacterDefinition,
    index: number
  ) => {
    if (
      !onCharactersChanged ||
      index < 0 ||
      index >= escapeRoomCharacters.length
    )
      return;
    onCharactersChanged([
      ...escapeRoomCharacters.slice(0, index),
      newData,
      ...escapeRoomCharacters.slice(index + 1, escapeRoomCharacters.length),
    ]);
    setSelectedCharacterIndex("none");
  }; // handleUpdateCharacterData

  const handleSelectCharacter = (index: number) => {
    if (index < 0 || index >= escapeRoomCharacters.length) return;
    if (editingNewCharacter) {
      const res = window.confirm(
        "Select this character and lose progress for your currently selected character?"
      );
      if (!res) return;
    }
    setSelectedCharacterIndex(index);
    setEditingNewCharacter(false);
  }; // handleSelectCharacter

  const handleDeleteCharacter = (index: number) => {
    if (
      !onCharactersChanged ||
      index < 0 ||
      index >= escapeRoomCharacters.length
    )
      return;
    onCharactersChanged([
      ...escapeRoomCharacters.slice(0, index),
      ...escapeRoomCharacters.slice(index + 1, escapeRoomCharacters.length),
    ]);

    if (selectedCharacterIndex !== "none" && index < selectedCharacterIndex)
      setSelectedCharacterIndex(selectedCharacterIndex - 1);
  }; // handleDeleteCharacter

  const handleSaveNewCharacter = (characterData: CharacterDefinition) => {
    if (!onCharactersChanged || !editingNewCharacter) return;
    onCharactersChanged([...escapeRoomCharacters, characterData]);
    setEditingNewCharacter(false);
  }; // handleSaveNewCharacter

  const handleAddCharacter = () => {
    setEditingNewCharacter(true);
  }; // handleAddCharacter

  return (
    <Wrapper>
      <GeneralSettingsContainer>
        <GeneralSettingsTitle> Escape Room Settings </GeneralSettingsTitle>
        <SettingsDiv>
          <CheckboxTitle> Escape Room Title </CheckboxTitle>
          <PromptField
            promptText={escapeRoomTitle}
            promptPlaceholder="Activity Title"
            textAlignment="left"
            onPromptChange={handleEditTitle}
          />
          <CheckboxTitle> Escape Room Description </CheckboxTitle>
          <PromptField
            promptText={escapeRoomDescription}
            promptPlaceholder="Activity Description"
            textAlignment="left"
            initialHeight="100px"
            onPromptChange={handleEditDescription}
          />

          {/* Character Section */}
          <CheckboxTitle> Characters </CheckboxTitle>
          <CharactersContainer>
            {escapeRoomCharacters.map((character, index) => (
              // Character card that can be displayer in two modes (edit and display only)
              <EscapeRoomCharacterCard
                key={character.name}
                initialCharacterDefinition={character}
                onSaveCharacterData={(value) =>
                  handleUpdateCharacterData(value, index)
                }
                onEnterCharacterEditMode={() => handleSelectCharacter(index)}
                onDeleteCharacter={() => handleDeleteCharacter(index)}
                showAlert={(value) => checkRepeatedName(index, value)}
                editMode={selectedCharacterIndex === index}
              />
            ))}
            {/* If there are no characters being modified a button to a add a new one is displayer */}
            {selectedCharacterIndex === "none" && (
              <AddPuzzleButton onClick={handleAddCharacter}>
                <AddCharacterIcon /> New Character
              </AddPuzzleButton>
            )}
            {/* Character editor at the end of the character list to add at the end of the list */}
            {editingNewCharacter && (
              <EscapeRoomCharacterCard
                initialCharacterDefinition={default_character}
                onSaveCharacterData={handleSaveNewCharacter}
                onEnterCharacterEditMode={() => {}}
                onDeleteCharacter={() => {}}
                showAlert={(value: string) =>
                  checkRepeatedName(escapeRoomCharacters.length, value)
                }
                editMode={true}
              />
            )}
          </CharactersContainer>
        </SettingsDiv>
      </GeneralSettingsContainer>
    </Wrapper>
  );
}; // EditableWaitingCodeItemContent

const PreviewTitle = styled.div`
  width: 90%;
  height: 50%;

  font-weight: 600;
  font-family: ${(props) => props.theme.contentFont};
  font-size: 1.5rem;
  text-align: center;
  text-overflow: ellipsis;
  color: rgb(255, 255, 255);

  border-bottom: 2px solid #ffffff;

  margin-bottom: 0.25rem;
  line-height: 1.33;
  letter-spacing: 0.2px;
  overflow: hidden;
  white-space: nowrap;
`;

const PreviewAnswers = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-family: ${(props) => props.theme.contentFont};
  overflow: hidden;
  text-overflow: ellipsis;
  height: 30%;
  width: 90%;
  max-width: 90%;
  max-height: 30%;
  display: block;
  white-space: nowrap;

  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3px;
  color: rgb(255, 255, 255);
`;

export interface EscapeRoomSettingsStageSlideProps {
  /** text to display for the add new option label. */
  title?: string;
  goToSettings: () => void;
} // EditableMultipleChoiceItemContentProps

export const EscapeRoomSettingsStageSlide = (
  props: EscapeRoomSettingsStageSlideProps
): JSX.Element => {
  const { title, goToSettings } = props;

  return (
    <Root
      onClick={() => {
        goToSettings && goToSettings();
      }}
    >
      {/* <SettingsIcon /> */}
      <PreviewTitle>{"Escape Room"}</PreviewTitle>
      <PreviewAnswers>{title === "" ? "No title" : title}</PreviewAnswers>
    </Root>
  );
}; // EscapeRoomSettingsItemStageSlide
export default EscapeRoomSettings;
