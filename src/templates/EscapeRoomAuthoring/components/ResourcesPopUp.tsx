import { useState } from "react";

import styled from "styled-components";
import { Cross } from '@styled-icons/entypo/Cross';
import {Done} from "@styled-icons/material/Done"

const CloseIcon = styled(Cross)`
  position:absolute;
  right:1%;
  top:5%;
  height: 2em;
  width: 2em;
  color: rgb(0, 0, 0);
  &:hover {
    color: rgb(255, 0, 0);
  }
`
const SelectedIcon = styled(Done)`
  position:absolute;
  right:50%;
  top:50%;
  height: 75px;
  width: 75px;
  transform: translate(50%, -50%);
  color: rgb(0, 255, 0);
`


const PopUpWrapper = styled.main`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 700px;
  width: 800px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 2rem;
  background-color: rgba(255,255,0,1);
  z-index:10;
`;

////////////////////Title of the container
const TitleContainer  = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
  background: rgba(150, 150, 150,1);
  height: 100px;
`;

const PopUpTitle  = styled.div`
  position: relative;
  display: flex;
  height: 50%;
  flex-direction: column;
  align-items:center;
  justify-content:center;
  padding:1rem 0.25rem 0.25rem 0.25rem;
  border-style: solid;
  border-color: lightgray;
  border-width: 0px 0px 2px 0px;
  font-size: 2em;
  font-weight: 200;
`;

////////////////////Pop up body
const BodyContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  background-color: rgba(200,200,200,1);
  flex: 1 1 calc(100% + clamp(-96px, -4vmin, -32px));
  height: 500px;
`;

const OptionsContainer = styled.div`
  position:relative;
  width:90%;
  height:10%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align:center;
`;

interface OptionProps{
  selected:boolean;
}
const Option = styled.div<OptionProps>`
  position:relative;
  width:47%;
  height:90%;
  bottom:-5px;

  align-self:end;
  padding: 0 1rem 0rem 1rem;
  background-color: ${props => props.selected ? "rgba(121,121,121,1)":"rgba(50,50,50,1)"};
  border-radius: 1rem 1rem 0 0;
  border-bottom: 5px solid rgba(121,121,121,1);
  border-top: 5px solid rgba(50,0,0,1);
  border-left: 5px solid rgba(50,0,0,1);
  border-right: 5px solid rgba(50,0,0,1);
  z-index:${props => props.selected ? "100" : "98"};

  &:hover {
    ${props => props.selected ? "" : "transition: background-color 0.1s; background-color: rgba(0, 0, 255,0.5);"}
  }
`;

const OptionContent = styled.div`
  display: flex;
  width:90%;
  height:80%;
  justify-content:center;
  align-items:center;
  background-color: rgba(121,121,121,1);
  border: 5px solid #000;
  border-radius: 0.25rem;
  border-color: rgba(50,50,50,1);
  z-index:99;
`;

////////////////////GRID
interface GridProps {
  elements: number;
  elementsPerRow:number;
}
const SelectResourceGrid = styled.div<GridProps>`
  display: inline-grid;
  grid-template-columns: repeat(min(${props=>props.elementsPerRow},${props=>props.elements}),${props=> {return props.elements<props.elementsPerRow?100/props.elements : 100/props.elementsPerRow}}%) ;
  grid-row-gap: 50px;
  overflow-x: hidden;
  overflow-y: auto;
  width:100%;
  height:100%;
  padding: 1rem 0 1rem 0;

  scrollbar-gutter:stable;
  ::-webkit-scrollbar { width: 8px; z-index:1000; }
  ::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  border-radius: 10px;}
  ::-webkit-scrollbar-thumb { border-radius: 10px; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); }
`;

////////////////////Resources
  interface ResourceProps {
    selected:boolean;
  }
const ResourceContainer = styled.div<ResourceProps>`
  place-self:center;
  position:relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align:center;
  width:125px;
  border-radius:1rem;
  background-color: ${props => props.selected ? "rgba(255,255,255,1)" : "rgba(200,200,200,1)"};
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  &:hover {
    transition: border 0.25s;
    border: 3px solid rgb(0, 0, 0);
  }
`;
  
const ResourcePreview = styled.img`
  padding: 0 0 20px 0;
  width:80%;
  height:80%;
`;


////////////////////Bottom of the popup
const ButtonsContainer  = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  background: rgba(150, 150, 150,1);
  height: 100px;
`;

interface AcceptButtonProps{
  avaliable:boolean;
}
const AcceptButton = styled.div<AcceptButtonProps> `
  position:absolute;
  background-color:${props=>props.avaliable ? "rgba(0,230,255,1)":"rgba(0,230,255,0.5)"};
  height: fit-content;
  width: fit-content;

  border-radius: 0.5rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  right:0%;
  top:50%;
  transform: translate(-50%, -50%);

  &:hover {
  ${props =>props.avaliable ? 
      "transition: border 0.25s; border: 3px solid rgb(0, 0, 0);"
      :""}
    }
`
const CancelButton = styled.div `
  position:absolute;
  background-color: rgba(255,77,77,1);
  height: fit-content;
  width: fit-content;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem 0.5rem 1rem;

  right:15%;
  top:50%;
  transform: translate(-50%, -50%);

  &:hover {
    transition: border 0.25s;
    border: 3px solid rgb(0, 0, 0);
  }
`

export interface ResourceDefinition {
  name:string;
  src:string;
}

export interface ResourcesPopUpComponentProps {
  /** List of resources thar are going to be displayed */
  resourceList: ResourceDefinition[];
  /** Text that is going to be displayed at the top of the pop up as the title */
  popUpTitle?: string;
  /** Callback notifying that the user wants to delete a specific resource */
  onResourceDeleted?: (id:string) => void;
  /** Callback notifying parent component that the user wants to add a new resource to his escape room */
  onAddResource?: () => void;
  /** Callback notifying parent component of user wanting to select a specific resource */
  onResourceSelected?: (index:number) => void;
  /** Callback notifying parent component that the user closed the pop up message */
  onClosePopUp?: () => void;
  /** Callback notifying parent component that the user canceled the operation started with this pop up */
  onCancelSelectResource?: () => void;
}

export const ResourcesPopUpComponent = (props: ResourcesPopUpComponentProps): JSX.Element => {

  const {
    resourceList,
    popUpTitle= "Escape Room Resources",
    onAddResource,
    onResourceDeleted,
    onResourceSelected,
    onClosePopUp,
    onCancelSelectResource
  } = props;

  //Index of the resource that is being selected at any point
  const [selectedResource, setSelectedResource] = useState<number>(-1);
  //Mode of the pop up ("select" for specifying what resource the user wants to use or "manage" to manage the escape rooms resources)
  const [selectedMode, setSelectedMode] = useState<string>("select");


  const handleResourceDeleted = () => {

  }; // handleResourceDeleted

  const handleResourceAdded = () => {

  }; // handleResourceAdded

  const handlePopUpClosed = () =>{
    if(!onClosePopUp) return;
    onClosePopUp();
  } //handlePopUpClosed

  const handleSelectionCanceled = () =>{
    if(!onCancelSelectResource) return;
    onCancelSelectResource();
  }

  const handleResourceSelected = () =>{
    if(!onResourceSelected || selectedResource === -1) return;
    onResourceSelected(selectedResource);
  } //handleResourceSelected


  const handleOptionSelected = (option:string)=>{
    if(option===selectedMode)return;
    setSelectedMode(option);
  } //handleOptionSelected



  return (
    <PopUpWrapper>
      {/* Title of the pop up */}
      <TitleContainer>
        <PopUpTitle>{popUpTitle}</PopUpTitle>
        <CloseIcon onMouseDown={()=>{handlePopUpClosed()}} />
      </TitleContainer>

      {/* Body wich can have an interfece to select a specific resource or manage the user's escape room resources */}
      <BodyContainer>
        {/* Buttons to switch between the different modes of the popup */}
        <OptionsContainer>
          <Option selected={selectedMode === "select"} onMouseDown={()=>{handleOptionSelected("select")}} >Select</Option>
          <Option selected={selectedMode === "manage"} onMouseDown= {()=>{handleOptionSelected("manage")}}>Manage resources</Option>
        </OptionsContainer>
        {/* Content of the pop up, which depends on the mode that it is currently in */}
        <OptionContent>
            {selectedMode === "select" && 
              <SelectResourceGrid elements={resourceList.length} elementsPerRow={3}>
                {resourceList.map((resource, index) => (
                  <ResourceContainer selected={selectedResource === index} onMouseDown={()=>{setSelectedResource(index)}} >
                    <ResourcePreview  src={resource.src} />
                      <h4><b>{resource.name}</b></h4>      

                      {selectedResource === index && <SelectedIcon/>}                
                  </ResourceContainer>
                ))}
              </SelectResourceGrid>
            }
          </OptionContent>
      </BodyContainer>
      {/* Container of the buttons at the bottom of the pop up that let the user confirm or cancel his actions */}
      <ButtonsContainer>
        <CancelButton  onMouseDown={()=>{handleSelectionCanceled()}}> Cancel </CancelButton>
        <AcceptButton avaliable={selectedResource !== -1} onMouseDown={()=>{handleResourceSelected()}}> Select </AcceptButton>
      </ButtonsContainer>
    </PopUpWrapper>
  );
}; // ResourcesPopUpComponent

export default ResourcesPopUpComponent;