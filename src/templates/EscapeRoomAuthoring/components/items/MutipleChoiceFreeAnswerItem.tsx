import {
  EditableItemProps,
  MultipleChoiceFreeAnswerItemDefinition,
} from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";

import styled from "styled-components";
import ConfigureMultipleChoiceCard from "../../../../components/Forms/Cards/ConfigureMultipleChoiceCard";
import ShortTextInputCard from "../../../../components/Forms/Cards/ShortTextInputCard";
import CheckBoxGroupInputCard from "../../../../components/Forms/Cards/CheckBoxGroupInputCard";
import { Root } from "./generalItemsStyles";
import NumberInputCard from "../../../../components/Forms/Cards/NumberInputCard";

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

export const EditableMultipleChoiceFreeAnswerItemContent = (
  props: EditableItemProps<MultipleChoiceFreeAnswerItemDefinition>
): JSX.Element => {
  const { payload, onPayloadChanged } = props;
  const { answers, maxAnswers, minAnswers, oneClickResponse } = payload;

  const handleEditPrompt = (value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      prompt: value,
    });
  }; // handleEditPrompt

  const handleAnswersChanged = (answers: string[]) => {
    if (!onPayloadChanged) return;

    onPayloadChanged({
      ...payload,
      answers: answers,
    });
  }; // handleAnswersChanged

  const handleSetOneClickResponse = (value: boolean) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({ ...payload, oneClickResponse: value });
  }; // handleSetOneClickResponse

  const handleMinAnswersChanged = (value: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({ ...payload, minAnswers: value });
  }; // handleMinAnswersChanged

  const handleMaxAnswersChanged = (value: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({ ...payload, maxAnswers: value });
  }; // handleMaxAnswersChanged

  const oneClickResponseKey = "Enable one-click response.";

  const alertMessageMin =
    minAnswers <= 0
      ? "Minimum number of answers must be at least 1."
      : minAnswers > maxAnswers
      ? "Minimum number of answers can't be greater than maximum number of answers."
      : minAnswers > answers.length
      ? `Minimum number of answers can't be greater than total number of answers (${answers.length}).`
      : undefined;

  const alertMessageMax =
    maxAnswers <= 0
      ? "Maximum number of answers must be at least 1."
      : minAnswers > maxAnswers
      ? "Maximum number of answers can't be lower than minimum number of answers."
      : maxAnswers > answers.length
      ? `Maximum number of answers can't be greater than total number of answers (${answers.length}).`
      : undefined;

  const alertMessageAnswers = answers.some((answer) => answer.length <= 0)
    ? "Please ensure that all answers have a text."
    : undefined;

  return (
    <Root>
      <ShortTextInputCard
        promptText="Prompt for this question:"
        required
        requiredAlert={payload.prompt.length === 0}
        fieldPayload={{ placeholder: "Start typing your prompt" }}
        response={{ text: payload.prompt }}
        onResponseChanged={(value) => handleEditPrompt(value.text)}
      />
      <ConfigureMultipleChoiceCard
        promptText="Answers to choose from:"
        required
        requiredAlert={alertMessageAnswers !== undefined}
        alertMessage={alertMessageAnswers}
        fieldPayload={{ rightAnswersEnabled: false }}
        response={{
          answers: payload.answers,
          correctAnswers: [],
        }}
        onResponseChanged={(value) => handleAnswersChanged(value.answers)}
      />
      <NumberInputCard
        promptText="Minimum number of answers to select:"
        required
        requiredAlert={alertMessageMin !== undefined}
        alertMessage={alertMessageMin}
        fieldPayload={{}}
        response={{ number: minAnswers }}
        onResponseChanged={(value) => handleMinAnswersChanged(value.number)}
      />
      <NumberInputCard
        promptText="Maximum number of answers to select:"
        required
        requiredAlert={alertMessageMax !== undefined}
        alertMessage={alertMessageMax}
        fieldPayload={{}}
        response={{ number: maxAnswers }}
        onResponseChanged={(value) => handleMaxAnswersChanged(value.number)}
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
    </Root>
  );
}; // EditableMultipleChoiceFreeAnswerItemContent

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

const PreviewAnswer = styled.div`
  position: relative;
  width: 100%;
  height: 0.6em;
  margin-bottom: 3px;
  background-color: transparent;
  border: 2px solid rgb(229, 229, 229);
  border-radius: 0.125rem;
`;

export const MultipleChoiceFreeAnswerItemStageSlide = (
  props: MultipleChoiceFreeAnswerItemDefinition
): JSX.Element => {
  const { prompt, answers } = props;

  return (
    <>
      <PreviewTitle>{prompt === "" ? "Empty Question" : prompt}</PreviewTitle>
      <PreviewAnswers>
        {[...Array(answers.length)].map((_, i) => (
          <PreviewAnswer key={i} />
        ))}
      </PreviewAnswers>
    </>
  );
}; // MultipleChoiceFreeAnswerItemStageSlide

export const multipleChoiceFreeAnswerItemFactory: AbstractActivityItemFactory<MultipleChoiceFreeAnswerItemDefinition> =
  {
    editingComponent: (editingProps) => (
      <EditableMultipleChoiceFreeAnswerItemContent {...editingProps} />
    ),
    defaultDefinition: {
      prompt: "",
      answers: [""],
      minAnswers: 1,
      maxAnswers: 1,
    },
  }; // multipleChoiceFreeAnswerItemFactory

export default EditableMultipleChoiceFreeAnswerItemContent;
