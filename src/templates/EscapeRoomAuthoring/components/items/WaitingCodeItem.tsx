import {
  EditableItemProps,
  WaitingCodeDefinition,
} from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";

import styled from "styled-components";
import { Timer } from "@styled-icons/open-iconic/Timer";
import { Root } from "./generalItemsStyles";
import TextListCard from "../../../../components/Forms/Cards/TextListCard";
import ShortTextInputCard from "../../../../components/Forms/Cards/ShortTextInputCard";
import CheckBoxGroupInputCard from "../../../../components/Forms/Cards/CheckBoxGroupInputCard";

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

export const isWaitingCodeItemValid = (
  item: WaitingCodeDefinition
): boolean => {
  return (
    item.codes.length > 0 &&
    item.text.length > 0 &&
    item.codes.every((code) => code.length > 0)
  );
}; // isWaitingCodeItemValid

export interface EditableWaitingCodeItemContentProps
  extends EditableItemProps<WaitingCodeDefinition> {
  /** text to display for the add new option label. */
  addNewOptionLabel?: string;
} // EditableWaitingCodeItemContentProps

export const EditableWaitingCodeItemContent = (
  props: EditableWaitingCodeItemContentProps
): JSX.Element => {
  const {
    payload,
    addNewOptionLabel = "Add new text",
    onPayloadChanged,
  } = props;

  const { codes, text, caseSensitive } = payload;

  const handleEditText = (text: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      text: text,
    });
  }; // handleEditText

  const handleEditCodes = (value: string[]) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      codes: value,
    });
  }; // handleEditCodes

  const handleSetCaseSensitive = (value: boolean) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({ ...payload, caseSensitive: value });
  }; // handleSetCaseSensitive

  const makeCaseSensitiveKey = "Make codes case-sensitive.";

  return (
    <Root>
      {/* Text to show before entering the code to solve the puzzle */}
      <ShortTextInputCard
        required
        width={1}
        requiredAlert={text.length === 0}
        alertMessage="Please enter a text to show before entering the code."
        promptText="Text to show before entering the code:"
        fieldPayload={{ placeholder: "Enter your text" }}
        response={{ text: text }}
        onResponseChanged={(value) => handleEditText(value.text)}
      />
      {/* List of codes that will be accepted as solutions to this item */}
      <TextListCard
        required
        requiredAlert={codes.length === 0}
        alertMessage="Please add at least one more code to the list."
        promptText="Codes to solve this item:"
        fieldPayload={{ addNewOptionLabel: addNewOptionLabel }}
        response={{ texts: codes }}
        onResponseChanged={(value) => handleEditCodes(value.texts)}
      />
      <CheckBoxGroupInputCard
        promptText="Additional settings:"
        fieldPayload={{ fields: [makeCaseSensitiveKey] }}
        response={{
          selectedFields: caseSensitive ? [makeCaseSensitiveKey] : [],
        }}
        onResponseChanged={(value) =>
          handleSetCaseSensitive(
            value.selectedFields.includes(makeCaseSensitiveKey)
          )
        }
      />
    </Root>
  );
}; // EditableWaitingCodeItemContent

const PreviewBody = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const PreviewTitle = styled.div`
  width: 100%;
  height: 20%;
  color: black;
  text-align: center;
  text-overflow: ellipsis;
  font-size: 0.75rem;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 1.33;
  letter-spacing: 0.2px;
  white-space: nowrap;
  overflow: hidden;
`;

const WaitingIcon = styled(Timer)`
  position: absolute;
  color: rgb(0, 0, 0);
  right: -10%;
  bottom: 10%;
  height: 60%;
  width: 60%;
`;

const PreviewAnswers = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  margin-top: 3px;
  color: rgb(178, 178, 178);
  overflow: hidden;
`;

const PreviewAnswer = styled.div`
  position: relative;
  width: 100%;
  height: 0.5em;
  margin-bottom: 3px;
  color: white;
  background-color: transparent;
  border: 2px solid #e9e9e9;
  border-radius: 0.125rem;
`;

export const WaitingCodeItemStageSlide = (
  props: WaitingCodeDefinition
): JSX.Element => {
  const { codes, text } = props;

  return (
    <PreviewBody>
      <PreviewTitle>{text.length === 0 ? "No Text" : text}</PreviewTitle>
      <PreviewAnswers>
        {[...Array(codes.length)].map((_, i) => (
          <PreviewAnswer key={i} />
        ))}
      </PreviewAnswers>
      <WaitingIcon />
    </PreviewBody>
  );
}; // WaitingCodeItemStageSlide

export const waitingCodeItemFactory: AbstractActivityItemFactory<WaitingCodeDefinition> =
  {
    editingComponent: (editingProps) => (
      <EditableWaitingCodeItemContent {...editingProps} />
    ),
    defaultDefinition: {
      codes: [""],
      text: "",
    },
  }; // waitingCodeItemFactory

export default EditableWaitingCodeItemContent;
