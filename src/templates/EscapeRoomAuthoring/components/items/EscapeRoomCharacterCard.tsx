import { CharacterDefinition } from "../../../../services/escapeRoomActivity.model";

import styled, { css } from "styled-components";
import { Save } from "@styled-icons/boxicons-solid/Save";
import { Edit } from "@styled-icons/fluentui-system-regular/Edit";

import { useState } from "react";
import { ResourcesPopUp } from "../ResourcesPopUp";
import {
  CardPanel,
  HorizontalLine,
  RequiredAlertIcon,
  RequiredQuestionSpan,
  Root,
} from "../../../../components/Forms/Cards/cardStyles";
import { Delete } from "@styled-icons/fluentui-system-regular/Delete";
import { Cancel } from "@styled-icons/material-outlined/Cancel";
import { ImageAdd } from "@styled-icons/boxicons-regular/ImageAdd";
import ShortTextInputCard from "../../../../components/Forms/Cards/ShortTextInputCard";
import LongTextInputCard from "../../../../components/Forms/Cards/LongTextInputCard";

const actionButtonStyle = css<ButtonProps>`
  font-family: ${(props) => props.theme.contentFont};
  font-size: ${(props) => props.theme.smallButtonFont};
  border-radius: ${(props) => props.theme.buttonBorderRadius};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  height: 3em;
  padding: 0 1em;
  color: white;
  opacity: 50%;
  cursor: default;

  ${(props) =>
    !props.disabled &&
    `
  opacity: 100%;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 0.5rem 0px;
  }
  `}
`;

interface ButtonProps {
  disabled?: boolean;
}
const fieldTypeIcon = css<ButtonProps>`
  color: ${(props) => props.theme.textColor};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.75em;
`;

const DeleteIcon = styled(Delete)`
  ${fieldTypeIcon}
  cursor: pointer;
`;

const EditIcon = styled(Edit)`
  ${fieldTypeIcon}
`;
const CharacterContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: left;
`;

interface CharacterPreviewContainerProps {
  src?: string;
}
const CharacterPreviewContainer = styled.div<CharacterPreviewContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 15em;

  background-size: contain;
  border-radius: 0.5rem 0rem 0rem 0.5rem;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-color: black;
  ${(props) =>
    props.src
      ? `background-image: url(${props.src});`
      : `background-color: darkred;`}
`;

const CharacterInfoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  padding: 0 10px 10px 10px;
  width: 100%;
  border-radius: 0 0.5rem 0.5rem 0;
  z-index: 0;
`;

export const CardBottomRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 5px 0;
  justify-content: right;
  align-items: center;
  margin-top: 0.25em;
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

const SaveChangesIcon = styled(Save)`
  ${fieldTypeIcon}
  color: white;
`;

const CancelEditingIcon = styled(Cancel)`
  ${fieldTypeIcon}
  color: white;
`;

const AddImageIcon = styled(ImageAdd)`
  ${fieldTypeIcon}
  color: white;
`;

const SaveChangesButton = styled.button`
  ${actionButtonStyle}
  background-color: ${(props) => props.theme.primaryButtonColor};
`;

const CancelEditingButton = styled.button`
  ${actionButtonStyle}
  background-color: ${(props) => props.theme.secondaryButtonColor};
`;

const SelectCharacterButton = styled.button`
  ${actionButtonStyle}
  background-color: ${(props) => props.theme.secondaryButtonColor};
  margin-bottom: 1em;
  opacity: 0.975;
`;

export interface EscapeRoomCharacterCardProps {
  /** Default definition to initialize a characters data */
  initialCharacterDefinition: CharacterDefinition;
  /** Callback to parent component to notify that the user wants to save this characters data */
  onSaveCharacterData?: (newInfo: CharacterDefinition) => void;
  /** Callback to parent component to notify that the user wants to start/finish editing data */
  onToggleCharacterEditMode?: () => void;
  /** Callback to parent component to notify that the user wants to delete this character */
  onDeleteCharacter?: () => void;
  /** Callback to parent component that recieves this characters name and returns wether that name is valid or not */
  isNameValid?: (newName: string) => boolean;
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
    onToggleCharacterEditMode,
    isNameValid,
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
    // Trim to prevent names with empty spaces at the end/begining
    if (onSaveCharacterData)
      onSaveCharacterData({
        ...characterData,
        name: characterData.name.trim(),
        description: characterData.description.trim(),
      });
  }; // onSaveCharacterInfo

  const handleDeleteCharacter = () => {
    if (onDeleteCharacter) onDeleteCharacter();
  }; //handleDeleteCharacter

  const handleToggleEditCharacterMode = () => {
    if (onToggleCharacterEditMode) onToggleCharacterEditMode();
  }; // handleEnterEditCharacterMode

  const handleResourceSelected = (resourceSrc: string | undefined) => {
    setCharacterData({ ...characterData, imageSrc: resourceSrc ?? "" });
    setShowResourcesPopUp((prev) => !prev);
  }; // handleResourceSelected

  const needsName = characterData.name.length === 0;
  const nameNotUnique = isNameValid && !isNameValid(characterData.name);
  const needsImage = characterData.imageSrc.length === 0;
  const shouldAlert = editMode && (needsImage || needsName || nameNotUnique);

  return (
    <Root>
      <CardPanel
        addPadding={false}
        addFocusEffect={false}
        requiredAlert={shouldAlert}
      >
        {/* Pop up component to enable image selection from the escape room resources */}
        {showResourcesPopUp && (
          <ResourcesPopUp
            onClosePopUp={() => setShowResourcesPopUp(false)}
            onResourceSelected={handleResourceSelected}
            popUpTitle="Select an image to scan"
          />
        )}

        {/* Card with Prompt fields to modify the caracters name and description and a button to specify its image */}
        <CharacterContainer>
          <CharacterPreviewContainer src={characterData.imageSrc}>
            {/* Image */}
            {editMode && (
              <SelectCharacterButton
                onClick={() => {
                  setShowResourcesPopUp(true);
                }}
              >
                <AddImageIcon />
                Select Image
              </SelectCharacterButton>
            )}
          </CharacterPreviewContainer>
          {/* Name and description */}
          <CharacterInfoContainer>
            <ShortTextInputCard
              disabled={!editMode}
              required
              requiredAlert={nameNotUnique || needsName}
              alertMessage={
                needsName
                  ? "This field is required"
                  : nameNotUnique
                  ? "Character name already in use"
                  : undefined
              }
              promptText="Character Name:"
              fieldPayload={{ placeholder: "Character Name" }}
              response={{ text: characterData.name }}
              onResponseChanged={(value) =>
                handleCharacterNameChanged(value.text)
              }
            />
            <LongTextInputCard
              disabled={!editMode}
              promptText="Character Description:"
              fieldPayload={{ placeholder: "Character Description" }}
              response={{ text: characterData.description }}
              onResponseChanged={(value) =>
                handleCharacterDescriptionChanged(value.text)
              }
            />
            <CardBottomRow>
              {editMode && (
                <>
                  <CancelEditingButton
                    title="Discard the changes to this character"
                    onClick={handleToggleEditCharacterMode}
                  >
                    <CancelEditingIcon />
                    Cancel
                  </CancelEditingButton>
                  <HorizontalLine />
                  <SaveChangesButton
                    title="Save your changes to this character"
                    onClick={onSaveCharacterInfo}
                  >
                    <SaveChangesIcon />
                    Save Changes
                  </SaveChangesButton>
                </>
              )}
              {!editMode && (
                <>
                  <EditIcon
                    title="Edit Character"
                    disabled={!editButtonAvaliable}
                    onClick={() => {
                      editButtonAvaliable && handleToggleEditCharacterMode();
                    }}
                  />
                  <DeleteIcon
                    title="Remove Character"
                    onClick={handleDeleteCharacter}
                  />
                </>
              )}
            </CardBottomRow>
            {shouldAlert && (
              <RequiredQuestionSpan>
                <RequiredAlertIcon />{" "}
                {needsName || nameNotUnique
                  ? "Please add a valid name"
                  : needsImage
                  ? "Please select an image for this character"
                  : ""}
              </RequiredQuestionSpan>
            )}
          </CharacterInfoContainer>
        </CharacterContainer>
      </CardPanel>
    </Root>
  );
}; // EscapeRoomCharacterCard

export default EscapeRoomCharacterCard;
