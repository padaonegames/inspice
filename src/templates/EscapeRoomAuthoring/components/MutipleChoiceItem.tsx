import styled from "styled-components";
import { EditableItemProps, MultipleChoiceFieldDefinition } from "../../../services/escapeRoomActivity.model";
import EditableCheckBoxInput from "./EditableCheckBoxInput";
import { AbstractActivityItemFactory } from "./ActivityItemFactory";

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

const CheckboxList = styled.div`
  margin-top: 5px;
  display: flex;
  background-color: transparent;
  flex-direction: column;
  align-items: left;

  border-bottom: 2px solid #dadce0;
  padding: 5px 0;
`;

interface CheckBoxOptionProps {
  backgroundColor?: string;
}
const CheckboxOption = styled.div<CheckBoxOptionProps>`
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

export interface EditableMultipleChoiceItemContentProps extends EditableItemProps<MultipleChoiceFieldDefinition> {
  /** text to display for the add new option label. */
  addNewOptionLabel?: string;
} // EditableMultipleChoiceItemContentProps

export const EditableMultipleChoiceItemContent = (props: EditableMultipleChoiceItemContentProps): JSX.Element => {

  const {
    payload,
    addNewOptionLabel = 'New option',
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

  const availableColors = ['#e21b3c', '#1368ce', '#d89e00', '#26890c', '#0aa3a3', '#864cbf'];

  return (
    <>
      <CheckboxList>
        {answers.map((elem, i) => (
          <CheckboxOption
            backgroundColor={availableColors[i % availableColors.length]}
            key={`checkBoxOption${i}`}
          >
            <EditableCheckBoxInput
              key={`editableCheckBoxInput${i}`}
              labelText={elem}
              style='radio'
              boxSize='2.875rem'
              onObjectRemoved={() => handleRemoveOption(i)}
              onLabelTextChanged={(value) => handleEditOption(i, value)}
            />
          </CheckboxOption>
        ))}
        {payload.answers.length < 6 && (
          <CheckboxOption
            onClick={handleAddOption}
            key='checkBoxOptionAddNew'
            backgroundColor='darkgray'
          >
            <EditableCheckBoxInput
              key='editableCheckBoxInputAddNew'
              labelText=''
              labelTextPlaceholder={addNewOptionLabel}
              style='radio'
              boxSize='2.875rem'
              enabled={false}
            />
          </CheckboxOption>
        )}
      </CheckboxList>
    </>
  );
}; // EditableMultipleChoiceItemContent

export const multipleChoiceItemFactory: AbstractActivityItemFactory<MultipleChoiceFieldDefinition> = {
  editingComponent: (editingProps) => (
    <EditableMultipleChoiceItemContent
      {...editingProps}
    />
  ),
  defaultDefinition: {
    answers: ['', '']
  }
}; // multipleChoiceItemFactory


export default EditableMultipleChoiceItemContent;