import { EditableItemProps, MultipleChoiceItemDefinition } from "../../../../services/escapeRoomActivity.model";
import EditableCheckBoxInput from "../EditableCheckBoxInput";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";
import { PromptField } from "./PromptField";

import styled from "styled-components";

interface InputAreaProps {
  width?: string;
  height?: string;
  dimBackground?: boolean;
}
export const InputArea = styled.textarea<InputAreaProps>`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;
  width: ${props => props.width ?? '100%'};
  height: ${props => props.height ?? '6em'};
  margin-top: 10px;
  color: ${props => props.theme.textColor};
  border: none;
  outline: none;
  padding: 0.65em;
  background-color: ${props => props.dimBackground ? '#f8f9fa' : 'transparent'};
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

interface AnswerProps {
  backgroundColor?: string;
}
const Answer = styled.div<AnswerProps>`
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  padding: 0.75em 0 0.75em 0.75em;
  border-top: none;
  font-size: 1em;
  font-weight: 200;
  font-family: ${props => props.theme.contentFont};
  color: white;
  line-height: 135%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;

  background-color: ${props => props.backgroundColor || 'transparent'};

  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;


export const EditableMultipleChoiceItemContent = (props: EditableItemProps<MultipleChoiceItemDefinition>): JSX.Element => {

  const {
    payload,
    onPayloadChanged
  } = props;

  const {
    answers,
    maxAnswers
  } = payload;

  const handleAddOption = () => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      answers: [...payload.answers, '']
    })
  }; // handleAddOption

  const handleEditOption = (index: number, value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      answers: [
        ...payload.answers.slice(0, index),
        value,
        ...payload.answers.slice(index + 1)
      ]
    })
  }; // handleEditOption

  const handleRemoveOption = (index: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      answers: payload.answers.filter((_, i) => i !== index)
    })
  }; // handleRemoveOption

  const handleEditPrompt = (value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      prompt: value
    })
  }; // handleEditPrompt

  const handleCheckOption = (index: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      correctAnswerIndex: index,
    })
  }; // handleEditPrompt

  const availableColors = ['#e21b3c', '#1368ce', '#d89e00', '#26890c', '#0aa3a3', '#864cbf'];

  return (
    <>
      <PromptField
        promptText={payload.prompt}
        promptPlaceholder='Start typing your prompt'
        onPromptChange={handleEditPrompt}
      />
      <AnswersContainer>
        {answers.map((elem, i) => (
          <Answer backgroundColor={availableColors[i % availableColors.length]}  key={`checkBoxOption${i}`}>
            <EditableCheckBoxInput
              key={`editableCheckBoxInput${i}`}
              labelText={elem}
              style='radio'
              checked= {i===payload.correctAnswerIndex}
              boxSize='2.875rem'
              onObjectRemoved={() => handleRemoveOption(i)}
              onCheckBoxChecked ={() => handleCheckOption(i)}
              onLabelTextChanged={(value) => handleEditOption(i, value)}
            />
          </Answer>
        ))}

        {/* If the multiple choice has less than 6 options appears a new "answer" that functions as a button to add a new possible answer to the multiple choice item */}
        {payload.answers.length < 6 && (
          <Answer
            onClick={handleAddOption}
            key='checkBoxOptionAddNew'
            backgroundColor='darkgray'
          >
            <EditableCheckBoxInput
              key='editableCheckBoxInputAddNew'
              labelText=''
              labelTextPlaceholder={'New option'}
              style='radio'
              boxSize='0'
              enabled={false}
            />
          </Answer>
        )}
      </AnswersContainer>
    </>
  );
}; // EditableMultipleChoiceItemContent



const PreviewTitle = styled.div`
  margin-bottom: 0.25rem;
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

const PreviewAnswers = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3px;
  color: rgb(178, 178, 178);
`;

const PreviewAnswer = styled.div`
  position: relative;
  width: calc(100% - 0.125rem);
  height: 7px;
  margin-bottom: 3px;
  border: 1px solid rgb(229, 229, 229);
  border-radius: 0.125rem;
`;


export const MultipleChoiceItemStageSlide = (props: MultipleChoiceItemDefinition): JSX.Element => {

  const {
    prompt,
    answers
  } = props;

  return (
    <>
      <PreviewTitle>{prompt}</PreviewTitle>
      <PreviewAnswers>
        {[...Array(answers.length)].map((_, i) => <PreviewAnswer key={i} />)}
      </PreviewAnswers>
    </>
  );
}; // MultipleChoiceItemStageSlide

export const multipleChoiceItemFactory: AbstractActivityItemFactory<MultipleChoiceItemDefinition> = {
  editingComponent: (editingProps) => (
    <EditableMultipleChoiceItemContent
      {...editingProps}
    />
  ),
  defaultDefinition: {
    prompt: '',
    correctAnswerIndex:-1,
    answers: ['', '']
  }
}; // multipleChoiceItemFactory


export default EditableMultipleChoiceItemContent;