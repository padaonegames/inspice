import { InProgressEscapeRoomActivityDefinition, default_character, CharacterDefinition } from "../../../../services/escapeRoomActivity.model";
import { PromptField } from "./PromptField";

import styled from "styled-components";
import {Settings} from "@styled-icons/fluentui-system-filled/Settings"
import {UserPlus} from "@styled-icons/boxicons-regular/UserPlus"
import { Cross } from '@styled-icons/entypo/Cross';
import {AlertCircle} from "@styled-icons/evaicons-solid/AlertCircle"
import {Save} from "@styled-icons/boxicons-solid/Save"
import {Edit} from "@styled-icons/boxicons-solid/Edit"

import { useContext, useEffect, useState } from "react";
import { EscapeRoomContext } from "../../EscapeRoomContext";
import ResourcesPopUpComponent, { ResourceDefinition } from "../ResourcesPopUp";
import { WeatherPartlyCloudyDay } from "styled-icons/fluentui-system-filled";


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

const AlertIcon = styled(AlertCircle)`
  position:absolute;
  left:27%;
  top:8%;
  height: 2em;
  width: 2em;
  color: rgb(255, 0, 0);
  transform: translate(-50%, -50%);
`

const SaveIcon = styled(Save)`
position:absolute;
right:5px;
height: 2em;
width: 2em;

color: rgb(0, 0, 0);
&:hover {
  color: rgb(255, 0, 0);
}
`
const EditIcon = styled(Edit)`
position:absolute;
right:30px;
height: 2em;
width: 2em;

color: rgb(0, 0, 0);
&:hover {
  color: rgb(255, 0, 0);
}
`



const CharacterContainer = styled.div`
position:relative;
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




const CharacterInfoContainer = styled.div`
  position:relative;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  padding:0 10px 10px 10px;
  width:100%;
  background-color: rgba(180,180,180,1);
  border-radius: 0 1.25rem 1.25rem 0;
  z-index:0;
`;

const ParragraphContainer = styled.div`
  position:relative;
  display: flex;
  padding:0 10px 10px 10px;
  width:100%;
  background-color: rgba(255,0,0,0.5);
  border-radius: 0.25rem 0.25rem 0.25rem 0.25rem;
  z-index:0;
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






const CharacterPreview = styled.img`
  width:100%;
  display: block;
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


export interface EscapeRoomCharacterCardProps {

  characterInfo:CharacterDefinition;
  onSaveCharacterData: (newInfo:CharacterDefinition)=>void;
  onEnterCharacterEditMode: ()=>void;
  onDeleteCharacter: ()=>void;
  showAlert:(name:string)=>boolean;
  editMode:boolean;
} // EscapeRoomCharacterCardProps

export const EscapeRoomCharacterCard = (props: EscapeRoomCharacterCardProps): JSX.Element => {

  const {
    characterInfo,
    onSaveCharacterData,
    onDeleteCharacter,
    onEnterCharacterEditMode,
    showAlert,
    editMode
  } = props;
  const [showResourcesPopUp, setShowResourcesPopUp] = useState<boolean>(false);
  const [characterData, setCharacterData] = useState<CharacterDefinition>(characterInfo);
  useEffect(() => {setCharacterData(characterInfo)}, [characterInfo]);

  const handleCharacterNameChanged = (newName:string)=>{
    setCharacterData({...characterData, name:newName});
  } //handleCharacterNameChanged

  const handleCharacterDescriptionChanged = (newDescription:string)=>{
    setCharacterData({...characterData, description:newDescription});
  } //handleCharacterDescriptionChanged

  const onSaveCharacterInfo = ()=>{
    if(onSaveCharacterData) onSaveCharacterData(characterData);
  } //onSaveCharacterInfo

  const handleDeleteCharacter =()=>{
    if(onDeleteCharacter)onDeleteCharacter();
  } //handleDeleteCharacter

  const handleEnterEditCharacterMode =()=>{
    if(onEnterCharacterEditMode)onEnterCharacterEditMode();
  } //handleEnterEditCharacterMode

  const handleResourceSelected = (resourceIndex:number)=>{
    setCharacterData({...characterData, image:resources[resourceIndex].src});
    setShowResourcesPopUp(prev=>!prev)
  } //handleResourceSelected


  const resources: ResourceDefinition[]=[
    {name: "Baby",src: "https://cdn.memegenerator.es/descargar/398347"},
    {name: "YouKnowIt",src: "https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?crop=1:1"},
    {name: "Oh!",src: "https://imagenes.elpais.com/resizer/iksHj8K729zx_amR6S2K1sB79YI=/1960x1470/arc-anglerfish-eu-central-1-prod-prisa.s3.amazonaws.com/public/B6H277FBSRW2AUY6T5WYT5WCBQ.jpg"},
    {name: "Serius Face",src: "https://www.eltiempo.com/files/article_content/files/crop/uploads/2021/02/24/6036fbb0babdd.r_1614232657048.172-0-2049-1408.jpeg"},
    {name: "Troll Face",src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa9F7chZRSC97n3EEsBFQlGSjZeH_7cyBWvIDc_FZJnTEIPkpOt4cNBKDK5UI1gDnoihs&usqp=CAU"},
    {name: "Cuentame más",src: "https://ep01.epimg.net/verne/imagenes/2016/08/30/articulo/1472539721_878111_1472541204_sumario_normal.jpg"},
    {name: "Oh You",src: "https://i.kym-cdn.com/photos/images/newsfeed/001/089/228/f2d.jpg"},
    {name: "Squidward Face",src: "https://cdn.wallpapersafari.com/33/48/Dm90k3.jpg"},
    {name: "SpongeBob Face",src: "https://community.custom-cursor.com/uploads/default/original/2X/1/1bf4f93af5045fefcec6a28f5cd26858a8478abc.jpeg"},
    {name: "SpongeBob Face",src: "https://community.custom-cursor.com/uploads/default/original/2X/1/1bf4f93af5045fefcec6a28f5cd26858a8478abc.jpeg"},
    {name: "Oh You",src: "https://i.kym-cdn.com/photos/images/newsfeed/001/089/228/f2d.jpg"},
    {name: "Cuentame más",src: "https://ep01.epimg.net/verne/imagenes/2016/08/30/articulo/1472539721_878111_1472541204_sumario_normal.jpg"},
    {name: "Troll Face",src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa9F7chZRSC97n3EEsBFQlGSjZeH_7cyBWvIDc_FZJnTEIPkpOt4cNBKDK5UI1gDnoihs&usqp=CAU"},
  ]

  return (
    <>

      {/* Pop up component to enable image selection from the escape room resources */}
      {showResourcesPopUp && 
      <ResourcesPopUpComponent resourceList={resources} onClosePopUp={()=>{setShowResourcesPopUp(false)}} onCancelSelectResource={()=>{setShowResourcesPopUp(false)}} 
      onResourceSelected={(value)=>{handleResourceSelected(value)}} popUpTitle={"Select an image to scan"}/>}

      {/* Card with Prompt fields to modify the caracters name and description and a button to specify its image */}
      {editMode===true ?
        <CharacterContainer>
          <CharacterPreviewContainer>
            {/* Image */}
            <CharacterPreview  src={characterData.image} />
            <SelectCharacterButton onMouseDown={()=>{ setShowResourcesPopUp(true)}}> Select Image </SelectCharacterButton>
          </CharacterPreviewContainer>
            {/* Name and description */}
          <CharacterInfoContainer>
            {showAlert(characterData.name) && <AlertIcon/>}
            <SaveIcon onMouseDown={()=>{!showAlert(characterData.name) && onSaveCharacterInfo()}} />
            <DataLine>Character Name</DataLine>
            <PromptField promptText={characterData.name} promptPlaceholder='Character Name' onPromptChange={(value)=>handleCharacterNameChanged(value)} textAlignment="left"/>
            <DataLine>Character Description</DataLine>
            <PromptField promptText={characterData.description} promptPlaceholder='Something extra' onPromptChange={(value)=>handleCharacterDescriptionChanged(value)} textAlignment="left" initialHeight="100px"/>
          </CharacterInfoContainer>
        </CharacterContainer>
      :
      //In display mode the charater info is displayed but cannot be modified
      <CharacterContainer>
        {/* Image */}
        <CharacterPreviewContainer>
          <CharacterPreview  src={characterData.image} />
        </CharacterPreviewContainer>
        {/* Name and description */}
        <CharacterInfoContainer>
          <EditIcon onMouseDown={()=>{handleEnterEditCharacterMode()}}/>
          <DeleteIcon onMouseDown={()=>{handleDeleteCharacter()}}/>
          <DataLine>Character Name</DataLine>
          <ParragraphContainer>{characterData.name}</ParragraphContainer>
          <DataLine>Character Description</DataLine>
          <ParragraphContainer>{characterData.description}</ParragraphContainer>
        </CharacterInfoContainer>
      </CharacterContainer>
    }
  </>
  );
}; 

export default EscapeRoomCharacterCard;
