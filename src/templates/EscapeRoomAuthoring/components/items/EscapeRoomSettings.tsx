import { EditableItemProps, InProgressEscapeRoomActivityDefinition, WaitingCodeDefinition } from "../../../../services/escapeRoomActivity.model";
import EditableCheckBoxInput from "../EditableCheckBoxInput";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";
import { PromptField } from "./PromptField";

import styled from "styled-components";
import {Settings} from "@styled-icons/fluentui-system-filled/Settings"



const SettingsIcon = styled(Settings)`
  position: absolute;
  right:20%;
  color: rgb(0, 0, 0);
  height: 1.25em;
  width: 1.25em;
`

const ContentWrapper = styled.main`
  position: relative;
   left: 12%;
  height: 100%;
  width: 88%;
  display: flex;
  flex-direction: column;

  overflow: hidden;
  margin: 0px;
  padding: 0px;
  border: 0px none;
  font: inherit;
`;



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
  text-align:center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3px;
  color: rgb(0, 0, 0);
`;

const Root = styled.div`
  position: relative; 
  // box-sizing: border-box;
  height: 10%;
  width: 100%;
  background-color: rgba(255,0,0,0.5);
  user-select: none;
  padding: 12px 16px 12px 0px;
  display: block;
  border: 10px;
  // border-radius: 0% 0% 20% 0%;
  border-color:red;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
  color: rgb(51, 51, 51);
  max-height: 141px;

`;

const CheckboxTitle = styled.div`
  font-size: 1em;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;

  margin-top: 0.25em;
  margin-bottom: 0.25em;
  padding: 0.75em 1.25em;
  border-top: none;
  color: black;
  line-height: 135%;
  width: fit-content;
  text-align: center;

  display: flex;
  align-items: center;

  background-color: white;

  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const CheckboxList = styled.div`
  margin-top: 5px;
  display: flex;
  background-color: transparent;
  flex-direction: column;
  align-items: left;

  border-bottom: 2px solid #dadce0;
  padding: 0.75em;

  background-color:  #dbdbdb;

  border-radius: 1.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;





export interface EscapeRoomSettingsProps {

  escapeRoom: InProgressEscapeRoomActivityDefinition;
  /** text to display for the add new option label. */
  escapeRoomTitle:string;
  escapeRoomDescription: string;
  onTitleChanged: (title:string)=>void;
  onDescriptionChanged: (title:string)=>void;
  onSettingsChanged?: (escapeRoom: InProgressEscapeRoomActivityDefinition)=>void;
} // EditableWaitingCodeItemContentProps

export const EscapeRoomSettings = (props: EscapeRoomSettingsProps): JSX.Element => {

  const {
    escapeRoom,
    escapeRoomTitle,
    escapeRoomDescription,
    onSettingsChanged
  } = props;



  const handleEditTitle = (value: string) => {
    if (!onSettingsChanged) return;
    onSettingsChanged({
      ...escapeRoom,
      activityTitle: value
    })
  }; // handleEditcode


  return (
    <>
        <ContentWrapper>

      <CheckboxList>
        <CheckboxTitle>
          {/* <HintsIcon /> */}
          Escape Room
        </CheckboxTitle>
      </CheckboxList>
      <PromptField promptText={escapeRoomTitle} promptPlaceholder='Code to solve this puzzle' onPromptChange={handleEditTitle} />
        </ContentWrapper>
    </>
  );
}; // EditableWaitingCodeItemContent


export interface EscapeRoomSettingsStageSlideProps{
  /** text to display for the add new option label. */
  title?: string;
  goToSettings: ()=>void;
} // EditableMultipleChoiceItemContentProps

export const EscapeRoomSettingsStageSlide = (props:EscapeRoomSettingsStageSlideProps ): JSX.Element => {

  const {
    title,
    goToSettings
  } = props;

  return (
    <Root  onClick={()=>{goToSettings && goToSettings()}}>
      <SettingsIcon/>
      <PreviewTitle>{"Escape Room"}</PreviewTitle>
      <PreviewAnswers>
        {title === ""? "No title": title}
      </PreviewAnswers>
    </Root>
  );
}; // EscapeRoomSettingsItemStageSlide



export default EscapeRoomSettings;