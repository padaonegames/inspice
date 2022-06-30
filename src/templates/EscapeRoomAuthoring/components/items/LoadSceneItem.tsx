import styled from "styled-components";
import { EditableItemProps, LoadSceneDefinition } from "../../../../services/escapeRoomActivity.model";
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

export interface EditableLoadSceneItemContentProps extends EditableItemProps<LoadSceneDefinition> {
  /** text to display for the add new option label. */
  addNewOptionLabel?: string;
} // EditableLoadSceneItemContentProps

export const EditableLoadSceneItemContent = (props: EditableLoadSceneItemContentProps): JSX.Element => {

  const {
    payload,
    addNewOptionLabel = 'New Text',
    onPayloadChanged
  } = props;

  const {
    sceneName
  } = payload;


  const handleEditSceneName = (value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      sceneName: value
    })
  }; // handleEditcode

  const availableColors = ['#e21b3c', '#1368ce', '#d89e00', '#26890c', '#0aa3a3', '#864cbf'];

  return (
    <>
      <PromptField
        promptText={payload.sceneName}
        promptPlaceholder='Scene to load'
        onPromptChange={handleEditSceneName}
      />
    </>
  );
}; // EditableLoadSceneItemContent

export const LoadSceneItemStageSlide = (props: LoadSceneDefinition): JSX.Element => {

  const {
    sceneName
  } = props;

  return (
    <>
      <PreviewTitle>{sceneName}</PreviewTitle>
    </>
  );
}; // LoadSceneItemStageSlide

export const loadSceneItemFactory: AbstractActivityItemFactory<LoadSceneDefinition> = {
  editingComponent: (editingProps) => (
    <EditableLoadSceneItemContent
      {...editingProps}
    />
  ),
  defaultDefinition: {
    sceneName: ''  
  }
}; // loadSceneItemFactory


export default EditableLoadSceneItemContent;