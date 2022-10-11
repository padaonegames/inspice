import {
  EditableItemProps,
  MultipleChoiceItemDefinition,
} from "../../../../services/escapeRoomActivity.model";
import EditableCheckBoxInput from "../EditableCheckBoxInput";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";
import { PromptField } from "./PromptField";

import styled from "styled-components";
import MultipleChoiceCard, {
  EditableMultipleChoiceCardContent,
} from "../../../../components/Forms/Cards/MultipleChoiceCard";
import EditableFieldCard from "../../../../components/Forms/Cards/EditableFieldCard";
import ConfigureMultipleChoiceCard from "../../../../components/Forms/Cards/ConfigureMultipleChoiceCard";
import ShortTextInputCard from "../../../../components/Forms/Cards/ShortTextInputCard";
import IntegerRangeInputFieldWithTag from "../../../../components/Forms/IntegerRangeInputFieldWithTag";
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

const AnswersContainer = styled.div`
  margin-top: 5px;
  display: flex;
  background-color: transparent;
  flex-direction: column;
  align-items: left;

  border-bottom: 2px solid #dadce0;
  padding: 5px 0;
`;

const availableColors = [
  "#e21b3c",
  "#1368ce",
  "#d89e00",
  "#26890c",
  "#0aa3a3",
  "#864cbf",
];

export const EditableMultipleChoiceItemContent = (
  props: EditableItemProps<MultipleChoiceItemDefinition>
): JSX.Element => {
  const { payload, onPayloadChanged } = props;
  const { answers, maxAnswers, oneClickResponse } = payload;

  const handleEditPrompt = (value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      prompt: value,
    });
  }; // handleEditPrompt

  const handleAnswersChanged = (
    answers: string[],
    correctAnswers: number[]
  ) => {
    if (!onPayloadChanged) return;

    onPayloadChanged({
      ...payload,
      answers: answers,
      correctAnswers: correctAnswers,
    });
  }; // handleAnswersChanged

  const handleSetOneClickResponse = (value: boolean) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({ ...payload, oneClickResponse: value });
  }; // handleSetOneClickResponse

  const oneClickResponseKey = "Enable one-click response.";

  return (
    <>
      <ShortTextInputCard
        promptText="Prompt for this question:"
        required
        requiredAlert={payload.prompt.length === 0}
        fieldPayload={{ placeholder: "Start typing your prompt" }}
        response={{ text: payload.prompt }}
        onResponseChanged={(value) => handleEditPrompt(value.text)}
      />
      <ConfigureMultipleChoiceCard
        fieldPayload={{}}
        response={{
          answers: payload.answers,
          correctAnswers: payload.correctAnswers,
        }}
        onResponseChanged={(value) =>
          handleAnswersChanged(value.answers, value.correctAnswers)
        }
      />
      <CheckBoxGroupInputCard
        promptText="Additional settings:"
        fieldPayload={{ fields: [oneClickResponseKey] }}
        response={{
          selectedFields: oneClickResponse ? [oneClickResponseKey] : [],
        }}
        onResponseChanged={(value) =>
          handleSetOneClickResponse(
            value.selectedFields.includes(oneClickResponseKey)
          )
        }
      />
    </>
  );
}; // EditableMultipleChoiceItemContent

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

const PreviewAnswers = styled.div`
  width: 100%;
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

export const MultipleChoiceItemStageSlide = (
  props: MultipleChoiceItemDefinition
): JSX.Element => {
  const { prompt, answers } = props;

  return (
    <>
      <PreviewTitle>{prompt === "" ? "Empty Question" : prompt}</PreviewTitle>
      <PreviewAnswers>
        {[...Array(answers.length)].map((_, i) => (
          <PreviewAnswer
            key={i}
            color={availableColors[i % availableColors.length]}
          />
        ))}
      </PreviewAnswers>
    </>
  );
}; // MultipleChoiceItemStageSlide

export const multipleChoiceItemFactory: AbstractActivityItemFactory<MultipleChoiceItemDefinition> =
  {
    editingComponent: (editingProps) => (
      <EditableMultipleChoiceItemContent {...editingProps} />
    ),
    defaultDefinition: {
      prompt: "",
      correctAnswers: [],
      answers: ["", ""],
    },
  }; // multipleChoiceItemFactory

export default EditableMultipleChoiceItemContent;
