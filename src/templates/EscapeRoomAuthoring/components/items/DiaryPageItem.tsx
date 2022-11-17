import {
  EditableItemProps,
  DiaryPageItemDefinition,
} from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";

import styled from "styled-components";
import { Root } from "./generalItemsStyles";
import DropdownInputCard from "../../../../components/Forms/Cards/DropdownInputCard";
import { useContext } from "react";
import { EscapeRoomActivityContext } from "../../EscapeRoomContext";
import { BookReader } from "@styled-icons/boxicons-regular/BookReader";

export const EditableDiaryPageItemContent = (
  props: EditableItemProps<DiaryPageItemDefinition>
): JSX.Element => {
  const { payload, onPayloadChanged } = props;
  const { pageId } = payload;

  const { availableDiaryPages } = useContext(EscapeRoomActivityContext);

  const handlePageChanged = (pageId: string | undefined) => {
    if (!onPayloadChanged || !pageId) return;
    onPayloadChanged({
      ...payload,
      pageId: pageId,
    });
  }; // handlePageChanged

  return (
    <Root>
      <DropdownInputCard
        promptText="Diary page to display:"
        required
        alertMessage={`Please select a valid page.${
          availableDiaryPages.length === 0
            ? "You may need to create one on the activity settings section first."
            : ""
        }`}
        requiredAlert={!pageId || pageId.length === 0}
        fieldPayload={{
          options: availableDiaryPages.map((page) => page.pageId),
        }}
        response={{ selectedOption: pageId }}
        onResponseChanged={(res) => handlePageChanged(res.selectedOption)}
      />
    </Root>
  );
}; // EditableDiaryPageItemContent

const PreviewTitle = styled.div`
  margin-bottom: 0rem;
  color: rgb(110, 110, 110);
  text-align: center;
  font-size: 0.75rem;
  line-height: 1.33;
  letter-spacing: 0.2px;
  max-height: 1.5rem;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const DiaryIconPreview = styled(BookReader)`
  position: relative;
  margin-top: 0.5rem;
  align-self: center;
  color: rgb(0, 0, 0);
  height: 60%;
`;

export const DiaryPageItemStageSlide = (
  props: DiaryPageItemDefinition
): JSX.Element => {
  const { pageId } = props;

  return (
    <>
      <PreviewTitle>{pageId === "" ? "Empty Page" : pageId}</PreviewTitle>
      <DiaryIconPreview />
    </>
  );
}; // DiaryPageItemStageSlide

export const diaryPageItemFactory: AbstractActivityItemFactory<DiaryPageItemDefinition> =
  {
    editingComponent: (editingProps) => (
      <EditableDiaryPageItemContent {...editingProps} />
    ),
    defaultDefinition: {
      pageId: "",
    },
  }; // DiaryPageItemFactory

export default EditableDiaryPageItemContent;
