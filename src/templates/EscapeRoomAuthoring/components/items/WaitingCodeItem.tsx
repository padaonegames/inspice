import {
  EditableItemProps,
  WaitingCodeDefinition,
} from "../../../../services/escapeRoomActivity.model";
import EditableCheckBoxInput from "../EditableCheckBoxInput";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";
import { PromptField } from "./PromptField";

import styled from "styled-components";
import { Timer } from "@styled-icons/open-iconic/Timer";

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

const CodeListContainer = styled.div`
  margin-top: 5px;
  display: flex;
  background-color: transparent;
  flex-direction: column;
  align-items: left;

  border-bottom: 2px solid #dadce0;
  padding: 5px 0;
`;

interface CodeProps {
  backgroundColor?: string;
  borderRadius?: string;
}
const Code = styled.div<CodeProps>`
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  padding: 0.75em 0 0.75em 0.75em;
  border-top: none;
  font-size: 1em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  color: white;
  line-height: 135%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;

  background-color: ${(props) => props.backgroundColor || "transparent"};

  border-radius: ${(props) => props.borderRadius || "0.25rem"};
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

export interface EditableWaitingCodeItemContentProps
  extends EditableItemProps<WaitingCodeDefinition> {
  /** text to display for the add new option label. */
  addNewOptionLabel?: string;
} // EditableWaitingCodeItemContentProps

export const EditableWaitingCodeItemContent = (
  props: EditableWaitingCodeItemContentProps
): JSX.Element => {
  const { payload, addNewOptionLabel = "New Text", onPayloadChanged } = props;

  const { code, texts } = payload;

  const handleAddOption = () => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      texts: [...payload.texts, ""],
    });
  }; // handleAddOption

  const handleEditOption = (index: number, value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      texts: [
        ...payload.texts.slice(0, index),
        value,
        ...payload.texts.slice(index + 1),
      ],
    });
  }; // handleEditOption

  const handleRemoveOption = (index: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      texts: payload.texts.filter((_, i) => i !== index),
    });
  }; // handleRemoveOption

  const handleEditcode = (value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      code: value,
    });
  }; // handleEditcode

  return (
    <>
      {/* Code that the player is going to use during the puzzle */}
      <PromptField
        promptText={payload.code}
        promptPlaceholder="Code to solve this puzzle"
        onPromptChange={handleEditcode}
      />
      {/* List of codes that the user wants to specify in this item */}
      <CodeListContainer>
        {texts.map((elem, i) => (
          <Code
            backgroundColor={availableColors[i % availableColors.length]}
            key={`checkBoxOption${i}`}
          >
            <EditableCheckBoxInput
              key={`editableCheckBoxInput${i}`}
              labelText={elem}
              labelTextPlaceholder="Text to show"
              style="radio"
              boxSize="0" //2.875rem
              onObjectRemoved={() => handleRemoveOption(i)}
              onLabelTextChanged={(value) => handleEditOption(i, value)}
            />
          </Code>
        ))}
        {/* If the item has less than 6 codes appears a new "code" that functions as a button to add a new code to use during the puzzle */}
        {payload.texts.length < 6 && (
          <Code
            onClick={handleAddOption}
            key="checkBoxOptionAddNew"
            backgroundColor="darkgray"
            borderRadius="1.50rem"
          >
            <EditableCheckBoxInput
              key="editableCheckBoxInputAddNew"
              labelText=""
              labelTextPlaceholder={addNewOptionLabel}
              style="radio"
              boxSize="0" //2.875rem
              enabled={false}
            />
          </Code>
        )}
      </CodeListContainer>
    </>
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

interface PreviewAnswerProps {
  color: string;
}

const PreviewAnswer = styled.div<PreviewAnswerProps>`
  position: relative;
  width: 100%;
  height: 10px;
  margin-bottom: 3px;
  color: white;
  background-color: ${(props) => props.color};
  border: 1px solid rgb(229, 229, 229);
  border-radius: 0.125rem;
`;

const availableColors = [
  "#e21b3c",
  "#1368ce",
  "#d89e00",
  "#26890c",
  "#0aa3a3",
  "#864cbf",
];

export const WaitingCodeItemStageSlide = (
  props: WaitingCodeDefinition
): JSX.Element => {
  const { code, texts } = props;

  return (
    <PreviewBody>
      <PreviewTitle>{code === "" ? "No Code" : code}</PreviewTitle>
      <PreviewAnswers>
        {[...Array(texts.length)].map((_, i) => (
          <PreviewAnswer
            key={i}
            color={availableColors[i % availableColors.length]}
          />
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
      code: "",
      texts: [""],
    },
  }; // waitingCodeItemFactory

export default EditableWaitingCodeItemContent;
