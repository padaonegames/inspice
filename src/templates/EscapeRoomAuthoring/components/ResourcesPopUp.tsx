


import styled from "styled-components";
import { Cross } from '@styled-icons/entypo/Cross';
import { ResourceStore } from "i18next";
import { useState } from "react";


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
`;

const TitleContainer  = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgba(150, 150, 150,1);
  height: 100px;
`;

const ResourcesContainer = styled.div`
  position: relative;
  display: flex;
  justify-content:center;
  align-items:center;
  flex-direction: column;
  background-color: rgba(200,200,200,1);
  flex: 1 1 calc(100% + clamp(-96px, -4vmin, -32px));
  height: 500px;
`;

////////////////////GRID
interface GridProps {
  elements: number;
  elementsPerRow:number;
}
const Grid = styled.div<GridProps>`
  display: inline-grid;
  grid-template-columns: repeat(min(${props=>props.elementsPerRow},${props=>props.elements}),${props=> {return props.elements<props.elementsPerRow?100/props.elements : 100/props.elementsPerRow}}%) ;
  grid-row-gap: 50px;
  overflow-x: hidden;
  overflow-y: auto;
  width:90%;
  height:90%;

  background-color: rgba(0,0,0,0.5);
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
  `;

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
  top
  display: block;
`;
////////////////////GRID


////////////////////Bottom buttons
const ButtonsContainer  = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  background: rgba(150, 150, 150,1);
  height: 100px;
`;


const AcceptButton = styled.div `

  background-color: rgba(0,230,255,1);
  height: fit-content;
  width: fit-content;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin: 0 1rem 0 0;
  border: 2px;
  border-color: rgba(0,0,0,1);
  &:hover {
    transition: border 0.25s;
    border: 3px solid rgb(0, 0, 0);
  }
`
const CancelButton = styled.div `

  background-color: rgba(255,77,77,1);
  height: fit-content;
  width: fit-content;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin: 0 1rem 0 0;

  &:hover {
    transition: border 0.25s;
    border: 3px solid rgb(0, 0, 0);
  }
`
////////////////////Bottom buttons


export interface ResourceDefinition {
  name:string;
  src:string;
}

export interface ResourcesPopUpComponentProps {
  /** What mappings we are working with in this editable stage (available stage types and how to render them) */
  resourceList: ResourceDefinition[];
  /** Callback notifying of stage type changing to a new format */
  onResourceDeleted?: () => void;
  /** Callback notifying parent of stage changing */
  onAddResource?: () => void;
  /** Callback notifying parent component of user wanting to delete this stage */
  onResourceSelected?: () => void;
}

/**
 * Editable version of StepTitleCard for form editing
 */
export const ResourcesPopUpComponent = (props: ResourcesPopUpComponentProps): JSX.Element => {

  const {
    resourceList,
    onResourceDeleted,
    onResourceSelected,
    onAddResource
  } = props;

  const [selectedResource, setSelectedResource] = useState<number>(-1);



  const handleResourceDeleted = () => {

  }; // handleStagePayloadChanged

  const handleResourceAdded = () => {

  }; // handleStagePayloadChanged

  const handlePopUpClosed = () =>{

  }

  const handleSelectionCanceled = () =>{

  }

  const handleResourceSelected = (index:number) =>{
    if(!onResourceSelected) return;
    setSelectedResource(index);
  }


  return (
    <PopUpWrapper>
      <TitleContainer>
        <CloseIcon onMouseDown={()=>{}} />
      </TitleContainer>
        <ResourcesContainer>

        <Grid elements={resourceList.length} elementsPerRow={3}>
                {resourceList.map((resource, index) => (
                  <ResourceContainer selected={selectedResource === index} onMouseDown={()=>{handleResourceSelected(index)}} >
                    <ResourcePreview  src={resource.src} />
                      <h4><b>{resource.name}</b></h4>                      
                  </ResourceContainer>
                ))}
        </Grid>





        </ResourcesContainer>
      <ButtonsContainer>

          <CancelButton> Cancelar </CancelButton>
          <AcceptButton> Aceptar </AcceptButton>
      </ButtonsContainer>
    </PopUpWrapper>
  );
}; // EditableStageComponent

export default ResourcesPopUpComponent;