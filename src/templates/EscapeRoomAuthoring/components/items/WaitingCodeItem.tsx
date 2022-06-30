import styled from "styled-components";
import { EditableItemProps, WaitingCodeDefinition } from "../../../../services/escapeRoomActivity.model";
import EditableCheckBoxInput from "../EditableCheckBoxInput";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";
import { PromptField } from "./PromptField";

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
  borderRadius?:string;
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

  border-radius: ${props => props.borderRadius || '0.25rem'};
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

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

export interface EditableWaitingCodeItemContentProps extends EditableItemProps<WaitingCodeDefinition> {
  /** text to display for the add new option label. */
  addNewOptionLabel?: string;
} // EditableWaitingCodeItemContentProps

export const EditableWaitingCodeItemContent = (props: EditableWaitingCodeItemContentProps): JSX.Element => {

  const {
    payload,
    addNewOptionLabel = 'New Text',
    onPayloadChanged
  } = props;

  const {
    code,
    texts
  } = payload;

  const handleAddOption = () => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      texts: [...payload.texts, '']
    })
  }; // handleAddOption

  const handleEditOption = (index: number, value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      texts: [
        ...payload.texts.slice(0, index),
        value,
        ...payload.texts.slice(index + 1)
      ]
    })
  }; // handleEditOption

  const handleRemoveOption = (index: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      texts: payload.texts.filter((_, i) => i !== index)
    })
  }; // handleRemoveOption

  const handleEditcode = (value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      code: value
    })
  }; // handleEditcode

  const availableColors = ['#e21b3c', '#1368ce', '#d89e00', '#26890c', '#0aa3a3', '#864cbf'];

  return (
    <>
      <PromptField
        promptText={payload.code}
        promptPlaceholder='Code to solve this puzzle'
        onPromptChange={handleEditcode}
      />
      <CheckboxList>
        {texts.map((elem, i) => (
          <CheckboxOption
            backgroundColor={availableColors[i % availableColors.length]}
            key={`checkBoxOption${i}`}
          >
            <EditableCheckBoxInput
              key={`editableCheckBoxInput${i}`}
              labelText={elem}
              labelTextPlaceholder= "Text to show"
              style='radio'
              boxSize='0' //2.875rem
              onObjectRemoved={() => handleRemoveOption(i)}
              onLabelTextChanged={(value) => handleEditOption(i, value)}
            />
          </CheckboxOption>
        ))}
        {payload.texts.length < 6 && (
          <CheckboxOption
            onClick={handleAddOption}
            key='checkBoxOptionAddNew'
            backgroundColor='darkgray'
            borderRadius='1.50rem'
          >
            <EditableCheckBoxInput
              key='editableCheckBoxInputAddNew'
              labelText=''
              labelTextPlaceholder={addNewOptionLabel}
              style='radio'
              boxSize='0' //2.875rem
              enabled={false}
            />
          </CheckboxOption>
        )}
      </CheckboxList>
    </>
  );
}; // EditableWaitingCodeItemContent

export const WaitingCodeItemStageSlide = (props: WaitingCodeDefinition): JSX.Element => {

  const {
    code,
    texts
  } = props;

  return (
    <>
      <PreviewTitle>{prompt}</PreviewTitle>
      <PreviewAnswers>
        {[...Array(texts.length)].map((_, i) => <PreviewAnswer key={i} />)}
      </PreviewAnswers>
    </>
  );
}; // WaitingCodeItemStageSlide

export const waitingCodeItemFactory: AbstractActivityItemFactory<WaitingCodeDefinition> = {
  editingComponent: (editingProps) => (
    <EditableWaitingCodeItemContent
      {...editingProps}
    />
  ),
  defaultDefinition: {
    code: '',
    texts: ['']
  }
}; // waitingCodeItemFactory


export default EditableWaitingCodeItemContent;