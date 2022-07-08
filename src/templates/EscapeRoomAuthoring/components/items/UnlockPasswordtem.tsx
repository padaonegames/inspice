import { EditableItemProps, MultipleChoiceItemDefinition, NarrativeItemDefinition, UnlockPasswordItemDefinition } from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";
import { PromptField } from "./PromptField";

import styled from "styled-components";
import {UpArrow} from "@styled-icons/boxicons-solid/UpArrow"
import {DownArrow} from "@styled-icons/boxicons-solid/DownArrow"
import {DotsTwoVertical} from "@styled-icons/entypo/DotsTwoVertical"

const UppArrowIcon = styled(UpArrow)`
  position: absolute;
  color: rgb(0, 0, 0);
  height: 50px;
  top:-25%;
`
const DownArrowIcon = styled(DownArrow)`
  position: absolute;
  color: rgb(0, 0, 0);
  height: 50px;
  bottom:-25%;
`
const DotsTwoVerticalIcon = styled(DotsTwoVertical)`
  position: relative;
  margin-left:-50px;
  margin-right:-50px;
  color: rgb(0, 0, 0);
  height: 50%;
`

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

const Root = styled.div`
  margin-top: 5px;
  display: flex;
  background-color: rgba(255,255,0,0.5);
  flex-direction: column;
  align-items: center;
  text-align:center;
  border-bottom: 2px solid #dadce0;
  padding: 0.75em;
  
  background-color:  #dbdbdb;
  
  border-radius: 1.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const DescriptionEditorContainer = styled.div`
  position: relative;
  width: 50%;
  display: flex;
  flex-direction:column;
  align-items: center;
  text-align: center;
  background-color: rgba(200,200,200,1);
  border-radius:1rem 1rem 0 0;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const DescriptionEditorTitle = styled.div`
  position: relative;
  font-size: 1em;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;

  margin-bottom: 0.25em;
  border-top: none;
  color: black;
  line-height: 135%;
  
  height:50%;
  
  display: flex;
  align-items: center;
  text-align: center;
  padding:1rem;
  margin-top:10px;
  border-radius:1rem;

  background-color: rgba(255,255,255,1);
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const PasswordEditorContainer = styled.div`
  position: relative;
  width: 50%;
  height:400px;
  display: flex;
  flex-direction:column;
  align-items: center;
  text-align: center;
  border-radius: 0 0 1rem 1rem;
  background-color: rgba(150,150,150,1);
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const PasswordEditorTitle = styled.div`
  position: relative;
  height:10%;
  display: flex;
  align-items: center;
  text-align: center;
  padding:1rem;
  margin-top:5px;
  border-radius:1rem;
  background-color: rgba(255,255,255,1);
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const PasswordEditorDigits = styled.div`
  position: relative;
  width: 90%;
  height:90%;
  display: flex;
  flex-direction:row;
  justify-content: center;
  align-items:center;
  text-align: center;
  // background-color: rgba(0,0,255,0.5);
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const DigitEditor = styled.div`
  position: relative;
  width: 20%;
  height:50%;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content:center;
  text-align: center;
  background-color: rgba(255,255,255,1);
  margin-left: 5px;
  margin-right:5px;
  // border-color: rgba(0,0,0,1);
  border: 1px solid #000;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const Digit = styled.p`
  font-weight: 400;
  font-size:120px;
  line-height: 1.5;
  transition: color 0.5s ease;
  word-wrap: break-word;
`;


export const EditableUnlockPasswordItemContent = (props: EditableItemProps<UnlockPasswordItemDefinition>): JSX.Element => {

  const {
    payload,
    onPayloadChanged
  } = props;

  const {
    description,
    password
  } = payload;

  const handleEditDigit = (index: number, value: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      password: [
        ...payload.password.slice(0, index),
        value,
        ...payload.password.slice(index + 1)
      ]
    })
  }; // handleEditDigit

  const handleEditDescription = ( value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      description: value
    })
  }; // handleEditDescription

  return (
    <Root>
      {/* Desctiption that is going to be shown on this puzzle */}
      <DescriptionEditorContainer>
        <DescriptionEditorTitle> Description to help find out the password </DescriptionEditorTitle>
        <PromptField promptText={description} promptPlaceholder='Start typing your prompt' onPromptChange={(value)=>{handleEditDescription(value)}}/>
      </DescriptionEditorContainer>

      {/* Editor of the password */}
      <PasswordEditorContainer>
        <PasswordEditorTitle>Password to solve this puzzle</PasswordEditorTitle>
        {/* Container of the password digits */}
        <PasswordEditorDigits>
          {/* Digits that specify hours */}
          <DigitEditor>
            <UppArrowIcon onMouseDown={()=>{handleEditDigit(0,(password[0]+1)%10)}} />
            <Digit>{password[0]}</Digit>
            <DownArrowIcon onMouseDown={()=>{handleEditDigit(0,password[0]-1 < 0 ? 9: password[0]-1)}}/>
          </DigitEditor>
          <DigitEditor>
            <UppArrowIcon  onMouseDown={()=>{handleEditDigit(1,(password[1]+1)%10)}}/>
            <Digit>{password[1]}</Digit>
            <DownArrowIcon onMouseDown={()=>{handleEditDigit(1,password[1]-1 < 0 ? 9: password[1]-1)}}/>
          </DigitEditor>
          {/* Icon of the ":" that separate the digits */}
          <DotsTwoVerticalIcon/>
          {/* Digits that specify minutes */}
          <DigitEditor>
            <UppArrowIcon  onMouseDown={()=>{handleEditDigit(2,(password[2]+1)%10)}}/>
            <Digit>{password[2]}</Digit>
            <DownArrowIcon onMouseDown={()=>{handleEditDigit(2,password[2]-1 < 0 ? 9: password[2]-1)}}/>
          </DigitEditor>
          <DigitEditor>
            <UppArrowIcon  onMouseDown={()=>{handleEditDigit(3,(password[3]+1)%10)}}/>
            <Digit>{password[3]}</Digit>
            <DownArrowIcon  onMouseDown={()=>{handleEditDigit(3,password[3]-1 < 0 ? 9: password[3]-1)}}/>
          </DigitEditor>

        </PasswordEditorDigits>
      </PasswordEditorContainer>
    </Root>
  );
}; // EditableUnlockPasswordItemContent






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


export const UnlockPasswordItemStageSlide = (props: UnlockPasswordItemDefinition): JSX.Element => {

  const {
    description,
    password
  } = props;

  return (
    <>
      <PreviewTitle>{password}</PreviewTitle>
    </>
  );
}; // narrativeItemStageSlide

export const unlockPasswordItemFactory: AbstractActivityItemFactory<UnlockPasswordItemDefinition> = {
  editingComponent: (editingProps) => (
    <EditableUnlockPasswordItemContent
      {...editingProps}
    />
  ),
  defaultDefinition: {
    password: [0,0,0,0],
    description: ''
  }
}; // narrativeItemFactory


export default EditableUnlockPasswordItemContent;