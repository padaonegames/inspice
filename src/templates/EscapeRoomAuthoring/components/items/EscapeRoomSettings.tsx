import { InProgressEscapeRoomActivityDefinition, default_character, CharacterDefinition } from "../../../../services/escapeRoomActivity.model";
import { PromptField } from "./PromptField";

import styled from "styled-components";
import {Settings} from "@styled-icons/fluentui-system-filled/Settings"
import {UserPlus} from "@styled-icons/boxicons-regular/UserPlus"
import { Cross } from '@styled-icons/entypo/Cross';

import { useContext, useState } from "react";
import { EscapeRoomContext } from "../../EscapeRoomContext";


const SettingsIcon = styled(Settings)`
  position: absolute;
  right:20%;
  color: rgb(0, 0, 0);
  height: 1.25em;
  width: 1.25em;
`

const AddCharacterIcon = styled(UserPlus)`
  color: ${props => props.theme.textColor};
  height: 1.75em;
  width: auto;
`;

const DeleteIcon = styled(Cross)`
  position:absolute;
  right:5px;
  height: 2em;
  width: 2em;

  color: rgb(0, 0, 0);
  &:hover {
    color: rgb(255, 0, 0);
  }
`

const Wrapper = styled.main`
  position: relative;
  left: 12%;
  height: 100%;
  width: 88%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
  border: 0px none;
  font: inherit;
`;


const CharacterContainer = styled.div`
margin-top: 5px;
display: flex;
flex-direction: row;
align-items: left;
width:50%;
max-height: 500px;
border-bottom: 2px solid #dadce0;
padding: 0.75em;
background-color: rgba(100,100,100,1);
border-radius: 1.25rem;
box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;
const CharacterPreviewContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
width:30%;
padding: 0 10px 0 10px;
background-color: rgba(150,150,150,1);
border-radius: 1.25rem 0 0 1.25rem;
`;


const CharactersContainer = styled.div`
margin-top: 5px;
display: flex;
flex-direction: column;
align-items: center;
width:100%;
padding: 0.75em;
background-color: rgba(0,0,0,0.5);
border-radius: 1.25rem;
box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const CharacterInfoContainer = styled.div`
position:relative;
display: flex;
flex-direction: column;
align-items: space-between;
padding:0 10px 10px 10px;
width:100%;
background-color: rgba(180,180,180,1);
border-radius: 0 1.25rem 1.25rem 0;
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
const Root = styled.div`
  position: relative; 
  height: 10%;
  width: 100%;
  background-color: rgba(150,150,150,0.5);
  box-shadow: rgba(255, 0, 0, 1) 0px px 0px 0px;
  border-radius: 0% 0% 0% 0%;
  border-color:red;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
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

const SelectCharacterButton = styled.div`
  font-size: 1em;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;

  color: black;
  line-height: 135%;
  width: 100%;
  text-align: center;
  padding: 10px 0px 10px 0px;
  margin: 0px 0px 10px 0px;
  background-color: rgba(240,240,240,1);
  border-radius: 0.5rem;

  &:hover {
    transition: border 0.25s;
    border: 3px solid rgb(0, 0, 0);
  }
`;

const GeneralSettingsContainer = styled.div`
  width: 100%;
  margin-top: 5px;
  display: flex;
  background-color: transparent;
  flex-direction: column;
  align-items: center;
  text-align:center;

  border-bottom: 2px solid #dadce0;
  background-color:  #dbdbdb;

  border-radius: 1.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const SettingsDiv = styled.div`
  width: 95%;
  margin-top: 5px;
  display: flex;
  background-color: transparent;
  flex-direction: column;
  align-items: left;
  text-align:center;

  margin-bottom: 2rem;

  border-bottom: 2px solid #dadce0;
  background-color:  rgba(0,0,0,0.5);

  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const GeneralSettingsTitle = styled.div`
  font-size: 1em;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;

  margin-top: 1em;
  margin-bottom: 0.25em;
  padding: 0.75em 1.25em;
  border-top: none;
  color: black;
  line-height: 135%;
  width: 95%;
  text-align: center;

  display: flex;
  align-items: center;

  background-color: white;

  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;


const CharacterPreview = styled.img`
  width:100%;
  display: block;
`;


const AddPuzzleButton = styled.div`

  position: relative;
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
  
  display: flex;
  text-align: center;
  align-items: center;

  background-color: rgb(255, 255, 255);

  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  &:hover {
    transition: border 0.25s;
    border: 3px solid rgb(200, 200, 200);
  }

`;

const DataLine = styled.div`
  position:relative;
  height: 1.25em;
  width: fit-content;
  margin-top:10px;

  border-style: solid;
  border-color: lightgray;
  border-width: 0px 0px 2px 0px;
`;


export interface EscapeRoomSettingsProps {

  escapeRoom: InProgressEscapeRoomActivityDefinition;
  /** text to display for the add new option label. */
  escapeRoomTitle:string;
  escapeRoomCharacters:CharacterDefinition[];
  escapeRoomDescription: string;
  onTitleChanged: (title:string)=>void;
  onDescriptionChanged: (title:string)=>void;
  onSettingsChanged?: (escapeRoom: InProgressEscapeRoomActivityDefinition)=>void;
} // EditableWaitingCodeItemContentProps

export const EscapeRoomSettings = (props: EscapeRoomSettingsProps): JSX.Element => {

  const {
    escapeRoom,
    escapeRoomTitle,
    escapeRoomCharacters,
    escapeRoomDescription,
    onSettingsChanged
  } = props;
  const {escapeRoomData, setEscapeRoomData} = useContext(EscapeRoomContext);



  const handleEditTitle = (value: string) => {
    if (!onSettingsChanged) return;
    onSettingsChanged({
      ...escapeRoom,
      activityTitle: value
    })
    setEscapeRoomData({
      ...escapeRoom,
      activityTitle: value
    })
  }; // handleEditcode


  const handleAddCharacter = ()=>{
    if (!onSettingsChanged) return;
    onSettingsChanged({
      ...escapeRoom,
      characters: [
        ...escapeRoom.characters,
        default_character
      ]
    })
    setEscapeRoomData({
      ...escapeRoom,
      characters: [
        ...escapeRoom.characters,
        default_character
      ]
    });
  }

  const handleDeleteCharacter = (index:number)=>{
    if (!onSettingsChanged) return;
    onSettingsChanged({
      ...escapeRoom,
      characters: [
        ...escapeRoom.characters.slice(0, index),
        ...escapeRoom.characters.slice(index + 1, escapeRoom.characters.length)
      ]
    })
    setEscapeRoomData({
      ...escapeRoom,
      characters: [
        ...escapeRoom.characters.slice(0, index),
        ...escapeRoom.characters.slice(index + 1, escapeRoom.characters.length)
      ]
    })
  }

  const handleCharacterNameChanged = (value:string, index:number) =>{
    if (!onSettingsChanged) return;
    onSettingsChanged({
      ...escapeRoom,
      characters: [
        ...escapeRoom.characters.slice(0, index),
        {...escapeRoom.characters[index],
          name: value
        },
        ...escapeRoom.characters.slice(index + 1, escapeRoom.characters.length)
      ]
    })
    setEscapeRoomData({
      ...escapeRoom,
      characters: [
        ...escapeRoom.characters.slice(0, index),
        {...escapeRoom.characters[index],
          name: value
        },
        ...escapeRoom.characters.slice(index + 1, escapeRoom.characters.length)
      ]
    })
  }


  const handleCharacterDescriptionChanged = (value:string, index:number) =>{
    if (!onSettingsChanged) return;
    onSettingsChanged({
      ...escapeRoom,
      characters: [
        ...escapeRoom.characters.slice(0, index),
        {...escapeRoom.characters[index],
          description: value
        },
        ...escapeRoom.characters.slice(index + 1, escapeRoom.characters.length)
      ]
    })
    setEscapeRoomData({
      ...escapeRoom,
      characters: [
        ...escapeRoom.characters.slice(0, index),
        {...escapeRoom.characters[index],
          description: value
        },
        ...escapeRoom.characters.slice(index + 1, escapeRoom.characters.length)
      ]
    })
  }

  return (
    <Wrapper>
      {/* <Container> */}
      <GeneralSettingsContainer>
        <GeneralSettingsTitle> Settings </GeneralSettingsTitle>
        <SettingsDiv>
          <CheckboxTitle> Escape Room Title </CheckboxTitle>
          <PromptField promptText={escapeRoomTitle} promptPlaceholder='Code to solve this puzzle' onPromptChange={handleEditTitle} />

          <CheckboxTitle> Characters </CheckboxTitle>
          <CharactersContainer>
            {escapeRoomCharacters.map((character, index) => (
              <CharacterContainer>
                {/* Character image */}
                  <CharacterPreviewContainer>
                    <CharacterPreview  src="https://stickerly.pstatic.net/sticker_pack/9uCc66lpT8KQrI1v0zlIQ/B9D9U3/9/357db9fd-cdf3-45bf-968f-ae8a34e5b389.png" />
                    <SelectCharacterButton> Select Image </SelectCharacterButton>
                  </CharacterPreviewContainer>

                  {/* Character data */}
                  <CharacterInfoContainer>
                    <DeleteIcon onMouseDown={()=>{handleDeleteCharacter(index)}}/>
                    <DataLine>Character Name</DataLine>
                    <PromptField promptText={character.name} promptPlaceholder='Character Name' onPromptChange={(value)=>handleCharacterNameChanged(value,index)} textAlignment="left"/>
                    <DataLine>Character Description</DataLine>
                    <PromptField promptText={character.description} promptPlaceholder='Something extra' onPromptChange={(value)=>handleCharacterDescriptionChanged(value,index)} textAlignment="left" initialHeight="100px"/>
                  </CharacterInfoContainer>
              </CharacterContainer>
              ))}
            </CharactersContainer>

          {/* In case we want to add a puzzle at the beginning of the room block*/}
          <AddPuzzleButton onClick={() =>{handleAddCharacter()}}>
            <AddCharacterIcon/>
          </AddPuzzleButton>  

        </SettingsDiv>
      </GeneralSettingsContainer>
    </Wrapper>
  );
}; // EditableWaitingCodeItemContent






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
