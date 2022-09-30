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

  const { code, texts } = payload;

  const handleEditTexts = (texts: string[]) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      texts: texts,
    });
  }; // handleEditTexts

  const handleEditcode = (value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      code: value,
    });
  }; // handleEditcode

  return (
    <Root>
      {/* Code that the player is going to use during the puzzle */}
      <ShortTextInputCard
        promptText="Code to solve this puzzle"
        fieldPayload={{ placeholder: "Enter your code" }}
        response={{ text: code }}
        onResponseChanged={(value) => handleEditcode(value.text)}
      />
      {/* List of codes that the user wants to specify in this item */}
      <TextListCard
        promptText="Texts to show before entering code"
        fieldPayload={{ addNewOptionLabel: addNewOptionLabel }}
        response={{ texts: texts }}
        onResponseChanged={(value) => handleEditTexts(value.texts)}
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
