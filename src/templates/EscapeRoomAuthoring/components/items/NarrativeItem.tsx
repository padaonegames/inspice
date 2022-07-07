import { EditableItemProps, NarrativeItemDefinition } from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";
import { PromptField } from "./PromptField";


import styled from "styled-components";
import {Unity} from "@styled-icons/fa-brands/Unity"
import {UserCircle} from "@styled-icons/boxicons-regular/UserCircle"
import {AddCircle} from "@styled-icons/fluentui-system-regular/AddCircle"

import { useState, useContext } from "react";
import {EscapeRoomContext} from "../../EscapeRoomContext"


const UnityIcon = styled(Unity)`
  position: relative;
  color: rgb(0, 0, 0);
  height: 100%;
`
const UserIcon = styled(UserCircle)`
  position: relative;
  color: rgb(0, 0, 0);
  height: 100%;
`
const AddIcon = styled(AddCircle)`
  position: relative;
  color: rgb(0, 0, 0);
  height: 100%;
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


const Title = styled.div`
  position: relative;
  font-size: 1em;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;

  margin-bottom: 0.25em;
  border-top: none;
  color: black;
  line-height: 135%;
  width: 100%;
  height:15%;
  
  display: flex;
  align-items: center;
  text-align: center;

  background-color: rgba(230,230,230,1);
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

///////////////////////////////////////////////////////Character slides 
const CharacterInteractionList = styled.div`
  position:relative;
  margin-top: 5px;
  align-items: center;
  width: 15%;
  height: 100%;
  border-bottom: 2px solid #dadce0;
  padding: 0.75em;
  background-color: rgba(185,185,185,1);
  border-radius: 1.25rem 0 0 1.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  border-bottom: 2px solid rgba(0,0,0,1);
  border-top: 2px solid rgba(0,0,0,1);
  border-left: 2px solid rgba(0,0,0,1);
  border-right: 2px solid rgba(0,0,0,1);
`;


  const InteractionListTitle = styled.div`
  position:relative;
  align-items: center;
  text-align:center;
  width: 100%;
  height: 10%;
  border-bottom: 2px solid #dadce0;
  background-color: rgba(255,255,255,0.5);
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  border-bottom: 2px solid rgba(0,0,0,1);
  border-top: 2px solid rgba(0,0,0,1);
  border-left: 2px solid rgba(0,0,0,1);
  border-right: 2px solid rgba(0,0,0,1);
  `;
  
  const CharacterSlidesContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 4;
  height: 80%;
  width: 100%;
  overflow-y: auto;
  overflow-x:hidden;
  align-items: center;
  margin: 0px 0px;
  background-color: rgba(220,220,220,0.5);

  border-bottom: 2px solid rgba(0,0,0,1);
  border-top: 2px solid rgba(0,0,0,1);
  border-left: 2px solid rgba(0,0,0,1);
  border-right: 2px solid rgba(0,0,0,1);

  scrollbar-gutter:stable;
  ::-webkit-scrollbar {
    width: 8px;
    z-index:1000;
  }
  ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
      border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
  }
`;

//Entire slide of a puzzle
const CharacterSlide = styled.div`
  position: relative;
  box-sizing: border-box;
  height: max-content;
  width: 90%;
  background-color: transparent;
  user-select: none;
  padding: 0px 0px 0px 0px;
  margin: 10px 0px 10px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align:center;

  border: 2px solid rgba(0,0,0,1);
  border-radius: 0.5rem;

  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
  color: rgb(51, 51, 51);
  background-color: rgba(230, 230, 230,0.75);
`;

const CharacterSlideTitle = styled.div`
  position: relative;
  height: 30%;
  width: 100%;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
  border-radius: 0.5rem 0.5rem 0 0;
  background-color: rgba(100, 100, 100,0.75);
`;

const CharacterSlidePreview = styled.img`
  // width: 50px;
  height: 50px;
  display: block;
`;

  /////////////////////////////////////////////////Character interaction
  const InteractionContent = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  align-items: left;
  width: 85%;
  height:100%;
  border-bottom: 2px solid #dadce0;
  padding: 0.75em;
  // background-color:  #dbdbdb;
  background-color: rgba(200,200,200,1);
  border-radius: 0 1.25rem 1.25rem 0;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  border-bottom: 2px solid rgba(0,0,0,1);
  border-top: 2px solid rgba(0,0,0,1);
  border-left: 2px solid rgba(0,0,0,1);
  border-right: 2px solid rgba(0,0,0,1);
  `;
  
  ///Dialog
  const CharacterInteractionContent = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  border-bottom: 2px solid #dadce0;
  padding: 0.75em;
  // background-color:  #dbdbdb;
  background-color: rgba(100,100,100,1);
  border-radius: 0 1.25rem 1.25rem 0;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  border-bottom: 2px solid rgba(0,0,0,1);
  border-top: 2px solid rgba(0,0,0,1);
  border-left: 2px solid rgba(0,0,0,1);
  border-right: 2px solid rgba(0,0,0,1);
  `;
  const Root = styled.div`
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    align-items: left;

    height: 400px;
    max-height: 500px;
    border-bottom: 2px solid #dadce0;
    padding: 0.75em;
    // background-color:  #dbdbdb;
    background-color: rgba(255,255,255,0.5);
    border-radius: 1.25rem;
    box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
  `;
  
  //Character selector
  const CharacterSelectorContent = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 20%;
  border-bottom: 2px solid #dadce0;
  padding: 0.75em;
  // background-color:  #dbdbdb;
  background-color: rgba(250,250,250,1);
  border-radius: 1.25rem 0 0 1.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  
  border-bottom: 2px solid rgba(0,0,0,1);
  border-top: 2px solid rgba(0,0,0,1);
  border-left: 2px solid rgba(0,0,0,1);
  border-right: 2px solid rgba(0,0,0,1);
`;

const CharacterPreview = styled.img`
  width: 100%;
  display: block;
`;


//DropDown
const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 2.5em;
  background-color: ${props => props.theme.cardBackground};
  min-width: 160px;
  width: 100%;
  box-shadow: rgba(37, 7, 107, 0.35) 0px 2px 4px 0px;
  z-index: 25;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
`;

const DropdownMenuItem = styled.a`
  color: ${props => props.theme.textColor};
  padding: 0.5em 0.85em;
  margin-top: 0.2em;
  margin-bottom: 0.2em;
  text-decoration: none;
  height: 2.5em;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  font-family: ${props => props.theme.contentFont};

  &:hover {
    background-color: #eeeeee;
  }
`;

const SelectFieldTypeDropdownButton = styled.span`
  position: absolute;
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;
  margin-top: 10px;
  cursor: pointer;
  color: ${props => props.theme.textColor};

  position: relative;

  height: 2.5em;
  width: 80%;

  background-color: rgb(250,250,250);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.1rem 0px;
  border: 1px solid #dadce0;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.85em;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 0.25rem 0px;
  }
`;





////////////////////Slides
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




const AddNewInteractionButton = styled.div`
  display:flex;
  justify-content: center;
  height:10%;
  background-color: rgba(250,250,250,1);

  border-bottom: 2px solid rgba(0,0,0,1);
  border-top: 2px solid rgba(0,0,0,1);
  border-left: 2px solid rgba(0,0,0,1);
  border-right: 2px solid rgba(0,0,0,1);
`;



export interface EditableNarrativeItemContentProps extends EditableItemProps<NarrativeItemDefinition> {
  /** text to display for the add new option label. */
  addNewOptionLabel?: string;
} // EditableNarrativeItemContentProps

export const EditableNarrativeItemContent = (props: EditableNarrativeItemContentProps): JSX.Element => {

  const [stageTypeDropdownOpen, setStageTypeDropdownOpen] = useState<boolean>(false);
  const [characterSelected, setCurrentTypeSelected] = useState<string | undefined>("Select a character");
  const [characterSelectedIndex, setCharacterSelectedIndex] = useState<number>(0);
  const [dialogSelected, setDialogSelected] = useState<number>(-1);

  const {escapeRoomData} = useContext(EscapeRoomContext);

  const {
    payload,
    addNewOptionLabel = 'New option',
    onPayloadChanged
  } = props;

  const {
    dialogs
  } = payload;

  const handleAddDialog = () => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      dialogs: [...payload.dialogs, ''],
      characters: [...payload.characters, "New Dialog"]
    })
  }; // handleAddOption


  const handleCharacterDialogChanged = (index: number, value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      dialogs: [
        ...payload.dialogs.slice(0, index),
        value,
        ...payload.dialogs.slice(index + 1)
      ]
    })
  }; // handleEditOption

  const handleCharacterCharacterSelectedInDialog= (characterIndex: number) => {
    if (!onPayloadChanged) return;
    setCharacterSelectedIndex(characterIndex);
    setCurrentTypeSelected(escapeRoomData.characters[characterIndex].name)
    onPayloadChanged({
      ...payload,
      characters: [
        ...payload.characters.slice(0, dialogSelected),
        escapeRoomData.characters[characterIndex].name,
        ...payload.characters.slice(dialogSelected + 1)
      ]
    })
  }; // handleEditOption

  return (
    <>
    <Root>
                                                                            {/* List of dialogs this item has */}
      <CharacterInteractionList>
        <InteractionListTitle> Title </InteractionListTitle>
        {/* Slides of the multiple parts that are going to take place in the narrative */}
        <CharacterSlidesContainer>
          {payload.dialogs.map((elem, i) => (
            <CharacterSlide onMouseDown={()=>{setDialogSelected(i)}}>
              <CharacterSlideTitle>
                <p> {i+1+"º " + payload.characters[i]}</p>
              </CharacterSlideTitle>
              <CharacterSlidePreview  src="https://stickerly.pstatic.net/sticker_pack/9uCc66lpT8KQrI1v0zlIQ/B9D9U3/9/357db9fd-cdf3-45bf-968f-ae8a34e5b389.png" />
           </CharacterSlide>
          ))}
        </CharacterSlidesContainer>

        <AddNewInteractionButton>
          <AddIcon onClick={()=>{handleAddDialog()}} />
        </AddNewInteractionButton>
      </CharacterInteractionList>

                                                                            {/* Character option select */}
      
      {(dialogSelected !== -1 || false) && <>
        <InteractionContent>
          {/* Selector of the character that is going to say something in this dialog */}
          <CharacterSelectorContent>
            <CharacterPreview src="https://stickerly.pstatic.net/sticker_pack/9uCc66lpT8KQrI1v0zlIQ/B9D9U3/9/357db9fd-cdf3-45bf-968f-ae8a34e5b389.png"></CharacterPreview>
            
            {/* Drop down menu with the multiple characters that can participate in the narrative */}
            <SelectFieldTypeDropdownButton onClick={() => setStageTypeDropdownOpen(prev => !prev)}>
              { payload.characters[dialogSelected]==="New Dialog" ? "Select a character" : payload.characters[dialogSelected] } 
              <UserIcon/>
              {stageTypeDropdownOpen &&
                <DropdownMenu>
                  {escapeRoomData.characters.map((elem, i) => (<DropdownMenuItem onClick={() => {handleCharacterCharacterSelectedInDialog(i); }}> {elem} </DropdownMenuItem>))}
                </DropdownMenu>
              }
            </SelectFieldTypeDropdownButton>
          </CharacterSelectorContent>

          {/* Part of the editor to specify what the character is going to say in a specific dialog part*/}
          <CharacterInteractionContent>
            <Title>
              { payload.characters[dialogSelected]==="New Dialog" ? "Who is going to say something?" : "What is "+ payload.characters[dialogSelected]+" going to say?"}
            </Title>
            <PromptField promptText={payload.dialogs[dialogSelected]} promptPlaceholder='What is going to be said' onPromptChange={(value) => {handleCharacterDialogChanged(dialogSelected,value)}} textAlignment={"left"} initialHeight={"15em"}/>
          </CharacterInteractionContent>
        </InteractionContent>
      </>}
    </Root>
    </>
  );
}; // EditableMultipleChoiceItemContent







export const NarrativeItemStageSlide = (props: NarrativeItemDefinition): JSX.Element => {

  const {
    dialogs
  } = props;

  return (
    <>
      {/* <PreviewTitle>{prompt}</PreviewTitle> */}
      <PreviewAnswers>
        {[...Array(dialogs.length)].map((_, i) => <PreviewAnswer key={i} />)}
      </PreviewAnswers>
    </>
  );
}; // narrativeItemStageSlide

export const narrativeItemFactory: AbstractActivityItemFactory<NarrativeItemDefinition> = {
  editingComponent: (editingProps) => (
    <EditableNarrativeItemContent
      {...editingProps}
    />
  ),
  defaultDefinition: {
    dialogs: [],
    characters: []
  }
}; // narrativeItemFactory


export default EditableNarrativeItemContent;