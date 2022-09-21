import { CharacterDefinition } from "../../../../services/escapeRoomActivity.model";
import { PromptField } from "./PromptField";

import styled from "styled-components";
import { DeleteForever } from "@styled-icons/material-twotone/DeleteForever";
import { AlertCircle } from "@styled-icons/evaicons-solid/AlertCircle";
import { Save } from "@styled-icons/boxicons-solid/Save";
import { Edit } from "@styled-icons/boxicons-solid/Edit";

import { useEffect, useState } from "react";
import { ResourcesPopUp } from "../ResourcesPopUp";

const DeleteIcon = styled(DeleteForever)`
  position: absolute;
  right: 0.25rem;
  top: 0.25rem;

  height: 1.75em;
  width: 1.75em;
  border-radius: 0.25rem;
  background-color: rgb(19, 104, 206);
  border: 2px solid rgb(15, 90, 188);
  cursor: pointer;

  color: white;
  &:hover {
    background-color: rgb(49, 134, 236);
  }
`;

const AlertIcon = styled(AlertCircle)`
  position: absolute;
  left: 27%;
  top: 8%;
  height: 2em;
  width: 2em;
  color: rgb(255, 0, 0);
  transform: translate(-50%, -50%);
`;

const SaveIcon = styled(Save)<ButtonProps>`
  position: absolute;
  right: 0.25rem;
  top: 0.25rem;
  height: 1.75em;
  width: 1.75em;
  cursor: pointer;

  border-radius: 0.25rem;
  background-color: rgb(19, 104, 206);
  border: 2px solid rgb(15, 90, 188);
  opacity: ${(props) => (props.avaliable ? 1 : 0.3)};
  color: white;
  &:hover {
    background-color: rgb(49, 134, 236);
  }
`;

interface ButtonProps {
  avaliable: boolean;
}
const EditIcon = styled(Edit)<ButtonProps>`
  position: absolute;
  right: 2.5rem;
  top: 0.25rem;
  cursor: pointer;

  height: 1.75em;
  width: 1.75em;
  border-radius: 0.25rem;
  border: 2px solid rgb(15, 90, 188);
  background-color: rgb(19, 104, 206);
  color: white;
  opacity: ${(props) => (props.avaliable ? 1 : 0.3)};
  &:hover {
    background-color: rgb(49, 134, 236);
  }
`;
const CharacterContainer = styled.div`
  position: relative;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  align-items: left;
  width: 60%;
  max-height: 500px;
  border-bottom: 2px solid #dadce0;
  padding: 0.25em;
  background-color: rgb(15, 90, 188);
  border-radius: 0.5rem;
  box-shadow: rgba(13, 84, 176, 1) 0px -4px 0px 0px inset;
`;
const CharacterPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 30%;
  padding: 0 10px 0 10px;
  background-color: rgb(39, 134, 236);
  border-radius: 0.5rem 0 0 0.5rem;
`;

const CharacterInfoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  padding: 0 10px 10px 10px;
  width: 100%;
  background-color: rgb(230, 230, 230);
  border-radius: 0 0.5rem 0.5rem 0;
  z-index: 0;
`;

const ParragraphContainer = styled.div`
  position: relative;
  display: flex;
  padding: 0 10px 10px 10px;
  width: 100%;
  text-align: left;
  background-color: rgba(153, 194, 247, 1);
  border-radius: 0.1rem;
  color: white; //rgb(19, 104, 206);
  z-index: 0;
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

const SelectCharacterButton = styled.div`
  font-size: 1em;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;

  color: black;
  line-height: 135%;
  width: 100%;
  text-align: center;
  padding: 10px 0px 10px 0px;
  margin: 0px 0px 10px 0px;
  background-color: rgba(240, 240, 240, 1);
  border-radius: 0.5rem;

  &:hover {
    transition: border 0.25s;
    border: 3px solid rgb(0, 0, 0);
  }
`;

const CharacterPreview = styled.img`
  width: 100%;
  display: block;
`;

const DataLine = styled.div`
  position: relative;
  height: 1.25em;
  width: fit-content;
  margin-top: 10px;
  color: rgb(19, 104, 206);
  margin-bottom: 5px;
`;

export interface EscapeRoomCharacterCardProps {
  /** Default definition to initialize a characters data */
  initialCharacterDefinition: CharacterDefinition;
  /** Callback to parent component to notify that the user wants to save this characters data */
  onSaveCharacterData: (newInfo: CharacterDefinition) => void;
  /** Callback to parent component to notify that the user wants start editign this characters data */
  onEnterCharacterEditMode: () => void;
  /** Callback to parent component to notify that the user wants to delete this character */
  onDeleteCharacter: () => void;
  /** Callback to parent component that recieves this characters name and returns wether that name is valid or not */
  showAlert: (name: string) => boolean;
  /** Boolean to determine wether this card should be filled with elements that allow its edition or only its visualization */
  editMode: boolean;
  /** Boolean to prevent the user from editing a characters name with a value that is not acceptable and change to another character's edit mode */
  editButtonAvaliable: boolean;
} // EscapeRoomCharacterCardProps

export const EscapeRoomCharacterCard = (
  props: EscapeRoomCharacterCardProps
): JSX.Element => {
  const {
    initialCharacterDefinition,
    onSaveCharacterData,
    onDeleteCharacter,
    onEnterCharacterEditMode,
    showAlert,
    editMode,
    editButtonAvaliable,
  } = props;

  const [showResourcesPopUp, setShowResourcesPopUp] = useState<boolean>(false);
  const [characterData, setCharacterData] = useState<CharacterDefinition>(
    initialCharacterDefinition
  );

  const handleCharacterNameChanged = (newName: string) => {
    setCharacterData({ ...characterData, name: newName });
  }; // handleCharacterNameChanged

  const handleCharacterDescriptionChanged = (newDescription: string) => {
    setCharacterData({ ...characterData, description: newDescription });
  }; // handleCharacterDescriptionChanged

  const onSaveCharacterInfo = () => {
    //Trim to prevent names with empty spaces at the end/begining
    if (onSaveCharacterData)
      onSaveCharacterData({
        ...characterData,
        name: characterData.name.trim(),
      });
  }; // onSaveCharacterInfo

  const handleDeleteCharacter = () => {
    if (onDeleteCharacter) onDeleteCharacter();
  }; //handleDeleteCharacter

  const handleEnterEditCharacterMode = () => {
    if (onEnterCharacterEditMode) onEnterCharacterEditMode();
  }; // handleEnterEditCharacterMode

  const handleResourceSelected = (resourceSrc: string) => {
    setCharacterData({ ...characterData, imageSrc: resourceSrc });
    setShowResourcesPopUp((prev) => !prev);
  }; // handleResourceSelected

  return (
    <>
      {/* Pop up component to enable image selection from the escape room resources */}
      {showResourcesPopUp && (
        <ResourcesPopUp
          onClosePopUp={() => setShowResourcesPopUp(false)}
          onResourceSelected={handleResourceSelected}
          popUpTitle="Select an image to scan"
        />
      )}

      {/* Card with Prompt fields to modify the caracters name and description and a button to specify its image */}
      {editMode === true ? (
        <CharacterContainer>
          <CharacterPreviewContainer>
            {/* Image */}
            <CharacterPreview src={characterData.imageSrc} />
            <SelectCharacterButton
              onClick={() => {
                setShowResourcesPopUp(true);
              }}
            >
              Select Image
            </SelectCharacterButton>
          </CharacterPreviewContainer>
          {/* Name and description */}
          <CharacterInfoContainer>
            {showAlert(characterData.name.trim()) && <AlertIcon />}
            <SaveIcon
              avaliable={!showAlert(characterData.name.trim())}
              onClick={() => {
                !showAlert(characterData.name.trim()) && onSaveCharacterInfo();
              }}
            />
            <DataLine>Character Name</DataLine>
            <PromptField
              promptText={characterData.name}
              promptPlaceholder="Character Name"
              onPromptChange={handleCharacterNameChanged}
              textAlignment="left"
            />
            <DataLine>Character Description</DataLine>
            <PromptField
              promptText={characterData.description}
              promptPlaceholder="Character description"
              onPromptChange={handleCharacterDescriptionChanged}
              textAlignment="left"
              initialHeight="100px"
              bottomColor="#00ff00"
            />
          </CharacterInfoContainer>
        </CharacterContainer>
      ) : (
        //In display mode the charater info is displayed but cannot be modified
        <CharacterContainer>
          {/* Image */}
          <CharacterPreviewContainer>
            <CharacterPreview src={characterData.imageSrc} />
          </CharacterPreviewContainer>
          {/* Name and description */}
          <CharacterInfoContainer>
            <EditIcon
              avaliable={editButtonAvaliable}
              onClick={() => {
                editButtonAvaliable && handleEnterEditCharacterMode();
              }}
            />
            <DeleteIcon onClick={handleDeleteCharacter} />
            <DataLine>Character Name</DataLine>
            <ParragraphContainer>{characterData.name}</ParragraphContainer>
            <DataLine>Character Description</DataLine>
            <ParragraphContainer>
              {characterData.description}
            </ParragraphContainer>
          </CharacterInfoContainer>
        </CharacterContainer>
      )}
    </>
  );
}; // EscapeRoomCharacterCard

export default EscapeRoomCharacterCard;
