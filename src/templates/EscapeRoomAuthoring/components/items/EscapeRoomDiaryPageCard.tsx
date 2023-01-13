import {
  DiaryPageDefinition,
  DiaryPageSlot,
} from "../../../../services/escapeRoomActivity.model";

import styled, { css } from "styled-components";
import { Save } from "@styled-icons/boxicons-solid/Save";
import { Edit } from "@styled-icons/fluentui-system-regular/Edit";

import { useState } from "react";
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
import { DiaryPageSideCard } from "./DiaryPageSideCard";

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
const DiaryPageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: left;
`;

const PageSidesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 0.55em;
`;

const PageSideContainer = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DiaryPageInfoContainer = styled.div`
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

const SaveChangesButton = styled.button`
  ${actionButtonStyle}
  background-color: ${(props) => props.theme.primaryButtonColor};
`;

const CancelEditingButton = styled.button`
  ${actionButtonStyle}
  background-color: ${(props) => props.theme.secondaryButtonColor};
`;

export interface EscapeRoomDiaryPageCardProps {
  /** Default definition to initialize a diaryPages data */
  initialDiaryPageDefinition: DiaryPageDefinition;
  /** Callback to parent component to notify that the user wants to save this diaryPages data */
  onSaveDiaryPageData?: (newInfo: DiaryPageDefinition) => void;
  /** Callback to parent component to notify that the user wants to start/finish editing data */
  onToggleDiaryPageEditMode?: () => void;
  /** Callback to parent component to notify that the user wants to delete this diaryPage */
  onDeleteDiaryPage?: () => void;
  /** Callback to parent component that recieves this diaryPages name and returns wether that name is valid or not */
  isNameValid?: (newName: string) => boolean;
  /** Boolean to determine wether this card should be filled with elements that allow its edition or only its visualization */
  editMode: boolean;
  /** Boolean to prevent the user from editing a diaryPages name with a value that is not acceptable and change to another diaryPage's edit mode */
  editButtonAvaliable: boolean;
} // EscapeRoomDiaryPageCardProps

export const EscapeRoomDiaryPageCard = (
  props: EscapeRoomDiaryPageCardProps
): JSX.Element => {
  const {
    initialDiaryPageDefinition,
    onSaveDiaryPageData,
    onDeleteDiaryPage,
    onToggleDiaryPageEditMode,
    isNameValid,
    editMode,
    editButtonAvaliable,
  } = props;

  const [diaryPageData, setDiaryPageData] = useState<DiaryPageDefinition>(
    initialDiaryPageDefinition
  );

  const handleDiaryPageNameChanged = (newName: string) => {
    setDiaryPageData({ ...diaryPageData, pageId: newName });
  }; // handleDiaryPageNameChanged

  const onSaveDiaryPageInfo = () => {
    // Trim to prevent names with empty spaces at the end/begining
    if (onSaveDiaryPageData)
      onSaveDiaryPageData({
        ...diaryPageData,
        pageId: diaryPageData.pageId.trim(),
      });
  }; // onSaveDiaryPageInfo

  const handleDeleteDiaryPage = () => {
    if (onDeleteDiaryPage) onDeleteDiaryPage();
  }; //handleDeleteDiaryPage

  const handleDiarySlotsChanged = (
    side: "left" | "right",
    sideSlots: DiaryPageSlot[]
  ) => {
    if (side === "left")
      setDiaryPageData({ ...diaryPageData, leftSlots: sideSlots });
    if (side === "right")
      setDiaryPageData({ ...diaryPageData, rightSlots: sideSlots });
  }; // handleDiarySlotsChanged

  const handleToggleEditDiaryPageMode = () => {
    if (onToggleDiaryPageEditMode) onToggleDiaryPageEditMode();
  }; // handleEnterEditDiaryPageMode

  const needsName = diaryPageData.pageId.length === 0;
  const nameNotUnique = isNameValid && !isNameValid(diaryPageData.pageId);
  const needsImage = false;
  const shouldAlert = editMode && (needsImage || needsName || nameNotUnique);

  return (
    <Root>
      <CardPanel
        addPadding={false}
        addFocusEffect={false}
        requiredAlert={shouldAlert}
      >
        {/* Card with Prompt fields to modify the caracters name and description and a button to specify its image */}
        <DiaryPageContainer>
          {/* Name and description */}
          <DiaryPageInfoContainer>
            <ShortTextInputCard
              disabled={!editMode}
              required
              requiredAlert={nameNotUnique || needsName}
              alertMessage={
                needsName
                  ? "This field is required"
                  : nameNotUnique
                  ? "Diary Page name already in use"
                  : undefined
              }
              promptText="Diary Page Name:"
              fieldPayload={{ placeholder: "Diary Page Name" }}
              response={{ text: diaryPageData.pageId }}
              onResponseChanged={(value) =>
                handleDiaryPageNameChanged(value.text)
              }
            />
            <PageSidesContainer>
              <PageSideContainer>
                <DiaryPageSideCard
                  addNewSpriteSlotLabel="Add an image..."
                  addNewTextSlotLabel="Write some text..."
                  title="Left Side:"
                  slots={diaryPageData.leftSlots}
                  editMode={editMode}
                  onDiarySideChanged={(slots) =>
                    handleDiarySlotsChanged("left", slots)
                  }
                />
              </PageSideContainer>
              <PageSideContainer>
                <DiaryPageSideCard
                  addNewSpriteSlotLabel="Add an image..."
                  addNewTextSlotLabel="Write some text..."
                  title="Right Side:"
                  slots={diaryPageData.rightSlots}
                  editMode={editMode}
                  onDiarySideChanged={(slots) =>
                    handleDiarySlotsChanged("right", slots)
                  }
                />
              </PageSideContainer>
            </PageSidesContainer>
            <CardBottomRow>
              {editMode && (
                <>
                  <CancelEditingButton
                    title="Discard the changes to this diary page"
                    onClick={handleToggleEditDiaryPageMode}
                  >
                    <CancelEditingIcon />
                    Cancel
                  </CancelEditingButton>
                  <HorizontalLine />
                  <SaveChangesButton
                    title="Save your changes to this diary page"
                    onClick={onSaveDiaryPageInfo}
                  >
                    <SaveChangesIcon />
                    Save Changes
                  </SaveChangesButton>
                </>
              )}
              {!editMode && (
                <>
                  <EditIcon
                    title="Edit Diary Page"
                    disabled={!editButtonAvaliable}
                    onClick={() => {
                      editButtonAvaliable && handleToggleEditDiaryPageMode();
                    }}
                  />
                  <DeleteIcon
                    title="Remove Diary Page"
                    onClick={handleDeleteDiaryPage}
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
                  ? "Please select an image for this diary page"
                  : ""}
              </RequiredQuestionSpan>
            )}
          </DiaryPageInfoContainer>
        </DiaryPageContainer>
      </CardPanel>
    </Root>
  );
}; // EscapeRoomDiaryPageCard

export default EscapeRoomDiaryPageCard;
