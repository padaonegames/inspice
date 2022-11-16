import { useState } from "react";
import styled, { css } from "styled-components";
import FormCard from "../../../../components/Forms/Cards/FormCard";
import {
  DiaryPageDefinition,
  default_diary_page,
  DiaryPageDefinitionsResponseDefinition,
} from "../../../../services/escapeRoomActivity.model";
import { ConsumableFieldProps } from "../../../../services/multistageFormActivity.model";
import { PageAdd } from "@styled-icons/foundation/PageAdd";
import EscapeRoomDiaryPageCard from "../items/EscapeRoomDiaryPageCard";

export const fieldTypeIcon = css`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.75em;
`;

const AddDiaryPageIcon = styled(PageAdd)`
  ${fieldTypeIcon}
  cursor: pointer;
  color: white;
`;

const AddDiaryPageButton = styled.button`
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

export interface DiaryDefinitionCardProps
  extends ConsumableFieldProps<{}, DiaryPageDefinitionsResponseDefinition> {
  /** Prompt for the user to fill in this field */
  promptText?: string;
  /** Whether this field should always be filled in by the user */
  required?: boolean;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
} // DiaryDefinitionCardProps

export const DiaryDefinitionCard = (
  props: DiaryDefinitionCardProps
): JSX.Element => {
  const {
    promptText = "",
    requiredAlert,
    required,
    response,
    onResponseChanged,
  } = props;

  const { diaryPages } = response;

  // Index of the page that is currently being edited (or `none`, if no editing is taking place)
  const [selectedDiaryPageIndex, setSelectedDiaryPageIndex] =
    useState<number | "none">("none");

  const isDiaryPageNameValid = (pageIndex: number, pageName: string) => {
    // new name is only valid if it is non empty and
    // for every diaryPage in our array of diaryPages, it is either the one with the
    // same index as ours or has a different name. (unique)
    return (
      pageName.length > 0 &&
      diaryPages.every(
        (diaryPage, i) => i === pageIndex || diaryPage.pageId !== pageName
      )
    );
  }; // isDiaryPageNameValid

  const handleUpdateDiaryPageData = (
    newData: DiaryPageDefinition,
    index: number
  ) => {
    if (!onResponseChanged || index < 0 || index >= diaryPages.length) return;
    onResponseChanged({
      diaryPages: [
        ...diaryPages.slice(0, index),
        newData,
        ...diaryPages.slice(index + 1, diaryPages.length),
      ],
    });
    setSelectedDiaryPageIndex("none");
  }; // handleUpdateDiaryPageData

  const handleSelectDiaryPage = (index: number | "none") => {
    if (index !== "none" && (index < 0 || index >= diaryPages.length)) return;
    if (index === selectedDiaryPageIndex) {
      // deselect
      const res = window.confirm("Discard changes to selected diary page?");
      if (!res) return;
      setSelectedDiaryPageIndex("none");
      return;
    }
    if (selectedDiaryPageIndex === diaryPages.length) {
      const res = window.confirm(
        "Select this diary page and lose progress for your currently selected diary page?"
      );
      if (!res) return;
    }
    setSelectedDiaryPageIndex(index);
  }; // handleSelectDiaryPage

  const handleDeleteDiaryPage = (index: number) => {
    if (!onResponseChanged || index < 0 || index >= diaryPages.length) return;
    onResponseChanged({
      diaryPages: [
        ...diaryPages.slice(0, index),
        ...diaryPages.slice(index + 1, diaryPages.length),
      ],
    });

    if (selectedDiaryPageIndex !== "none" && index < selectedDiaryPageIndex)
      setSelectedDiaryPageIndex(selectedDiaryPageIndex - 1);
  }; // handleDeleteDiaryPage

  const handleSaveNewDiaryPage = (diaryPageData: DiaryPageDefinition) => {
    if (!onResponseChanged || selectedDiaryPageIndex !== diaryPages.length)
      return;
    onResponseChanged({ diaryPages: [...diaryPages, diaryPageData] });
    setSelectedDiaryPageIndex("none");
  }; // handleSaveNewDiaryPage

  const handleAddDiaryPage = () => {
    setSelectedDiaryPageIndex(diaryPages.length);
  }; // handleAddDiaryPage

  return (
    <FormCard
      promptText={promptText}
      required={required}
      requiredAlert={requiredAlert}
    >
      {diaryPages.map((diaryPage, index) => (
        // DiaryPage card that can be displayer in two modes (edit and display only)
        <EscapeRoomDiaryPageCard
          key={diaryPage.pageId}
          initialDiaryPageDefinition={diaryPage}
          onSaveDiaryPageData={(value) =>
            handleUpdateDiaryPageData(value, index)
          }
          onToggleDiaryPageEditMode={() => handleSelectDiaryPage(index)}
          onDeleteDiaryPage={() => handleDeleteDiaryPage(index)}
          isNameValid={(value) => isDiaryPageNameValid(index, value)}
          editMode={selectedDiaryPageIndex === index}
          editButtonAvaliable={
            selectedDiaryPageIndex === "none" ||
            selectedDiaryPageIndex === diaryPages.length
          }
        />
      ))}
      {/* If there are no diaryPages being modified or being created a button to a add a new one is displayer */}
      {selectedDiaryPageIndex === "none" && (
        <AddDiaryPageButton onClick={handleAddDiaryPage}>
          <AddDiaryPageIcon /> New Diary Page
        </AddDiaryPageButton>
      )}
      {/* DiaryPage editor at the end of the diaryPage list to add at the end of the list */}
      {selectedDiaryPageIndex === diaryPages.length && (
        <EscapeRoomDiaryPageCard
          initialDiaryPageDefinition={default_diary_page}
          onSaveDiaryPageData={handleSaveNewDiaryPage}
          onToggleDiaryPageEditMode={() => handleSelectDiaryPage("none")}
          isNameValid={(value) =>
            isDiaryPageNameValid(diaryPages.length, value)
          }
          editMode={true}
          editButtonAvaliable={false}
        />
      )}
    </FormCard>
  );
}; // DiaryDefinitionCard

export default DiaryDefinitionCard;
