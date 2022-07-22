import { useEffect, useState } from "react";

import styled from "styled-components";
import { Cross } from "@styled-icons/entypo/Cross";
import { DeleteForever } from "@styled-icons/material-twotone/DeleteForever";
import { Done } from "@styled-icons/material/Done";
import Dropzone from "react-dropzone";
import { useParams } from "react-router-dom";
import { ResourceDefinition } from "../../../services/escapeRoomActivity.model";
import { useActivityResources } from "../useActivityResources";

const CloseIcon = styled(Cross)`
  position: absolute;
  right: 1%;
  top: 5%;
  height: 2em;
  width: 2em;
  color: rgb(0, 0, 0);
  cursor: pointer;
  border-radius: 100%;
  background-color: #d06a6a;
  border: 2px solid #c13c3c;
  &:hover {
    transition: border background-color visibility 1s;
    background-color: #ce5151;
  }
`;
const SelectedIcon = styled(Done)`
  position: absolute;
  right: 50%;
  top: 50%;
  height: 75px;
  width: 75px;
  transform: translate(50%, -50%);
  color: rgb(0, 255, 0);
`;

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
  z-index: 10;

  border: 5px solid #000;
  border-color: rgba(50, 50, 50, 1);
`;

const DeleteIcon = styled(DeleteForever)`
  color: rgb(0, 0, 0);
  height: 1.25em;
  width: 1.25em;
`;

////////////////////Title of the container
const PopUpTitle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(150, 150, 150, 1);
  height: 100px;
`;

const Title = styled.div`
  position: relative;
  display: flex;
  height: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0.25rem 0.25rem 0.25rem;
  border-style: solid;
  border-color: lightgray;
  border-width: 0px 0px 2px 0px;
  font-size: 2em;
  font-weight: 200;
`;

////////////////////Pop up body
const PopUpBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  justify-content: center;
  align-items: center;
  background-color: rgba(180, 180, 180, 1);
  border-top: 5px solid #000;
  border-bottom: 5px solid #000;
  border-color: rgba(50, 50, 50, 1);
  z-index: 99;

  padding: 50px 0 50px 0;

  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-gutter: stable;
  ::-webkit-scrollbar {
    width: 8px;
    z-index: 1000;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
`;

////////////////////GRID
interface GridProps {
  elements: number;
  elementsPerRow: number;
}
const SelectResourceGrid = styled.div<GridProps>`
  display: inline-grid;
  grid-template-columns: repeat(
    min(${(props) => props.elementsPerRow}, ${(props) => props.elements}),
    ${(props) => {
      return props.elements < props.elementsPerRow
        ? 100 / props.elements
        : 100 / props.elementsPerRow;
    }}%
  );
  grid-row-gap: 50px;
  width: 100%;
  height: 100%;
`;

////////////////////Resources
const ResourceContainer = styled.div`
  place-self: center;
  position: relative;
  width: 125px;
`;
interface ResourceProps {
  selected: boolean;
}
const ResourceContent = styled.div<ResourceProps>`
  place-self: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 1rem;
  background-color: ${(props) =>
    props.selected ? "rgba(255,255,255,1)" : "rgba(100,100,100,1)"};
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
  cursor: pointer;
  &:hover {
    transition: border 0.25s;
    border: 3px solid rgb(0, 0, 0);
  }
`;

const ResourcePreview = styled.img`
  padding: 0 0 20px 0;
  width: 80%;
  height: 80%;
`;

////////////////////Bottom of the popup
const PopUpButtons = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  background: rgba(150, 150, 150, 1);
  height: 100px;
`;

interface SelectFileButtonProps {
  avaliable: boolean;
}
const SelectFileButton = styled.div<SelectFileButtonProps>`
  position: absolute;
  background-color: ${(props) =>
    props.avaliable ? "rgba(0,230,255,1)" : "rgba(110,165,175,0.5)"};
  height: fit-content;
  width: fit-content;

  border-radius: 0.5rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  cursor: pointer;

  &:hover {
    ${(props) =>
      props.avaliable
        ? "transition: border 0.25s; border: 3px solid rgb(0, 0, 0);"
        : ""}
  }
`;

const DropZoneContainer = styled.div`
  margin-bottom: 20px;
  flex: 1;
  width: 90%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: rgba(255, 0, 0, 0.5);
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  cursor: pointer;
  transition: border 0.24s ease-in-out;
`;

const DeleteResourceButton = styled.div`
  position: absolute;
  top: 0%;
  right: 0%;
  padding: 3px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  box-sizing: border-box;
  color: rgb(247, 0, 255);
  background-color: rgb(222, 222, 222);
  border-radius: 0.75rem;
  cursor: pointer;
  &:hover {
    transition: border background-color visibility 1s;
    border: 3px solid rgb(0, 0, 0);
    background-color: rgb(180, 180, 180);
  }
`;

export interface ResourcesPopUpProps {
  /** Text that is going to be displayed at the top of the pop up as the title */
  popUpTitle?: string;
  /** Mode of the pop up ("select-resources" for specifying what resource the user wants to use or "manage-resources" to manage the escape rooms resources). Default: select-resources*/
  popUpMode?: "select-resources" | "manage-resources";
  /** Callback notifying parent component of user wanting to select a specific resource */
  onResourceSelected?: (resourceSrc: string) => void;
  /** Callback notifying parent component that the user closed the pop up message */
  onClosePopUp?: () => void;
} // ResourcesPopUpProps

export const ResourcesPopUp = (props: ResourcesPopUpProps): JSX.Element => {
  // TODO: This is not the cleanest solution.
  const { id } = useParams();

  if (!id) {
    return <>No id found</>;
  }

  return <ResourcesPopUpLogicWrapper {...props} id={id} />;
}; // ResourcesPopUp

interface ResourcesPopUpLogicWrapperProps extends ResourcesPopUpProps {
  id: string;
} // ResourcesPopUpLogicWrapperProps

const ResourcesPopUpLogicWrapper = (
  props: ResourcesPopUpLogicWrapperProps
): JSX.Element => {
  const { id } = props;

  const {
    availableResources,
    setResourceToUpload,
    resourceUploadStatus,
    refreshAvailableResources,
    resourceRemovalStatus,
    setResourceToRemove,
  } = useActivityResources(id);

  const handleAddResource = (file: File) => {
    setResourceToUpload(file);
  }; // handleAddResource

  const handleRemoveResource = (resourceName: string) => {
    setResourceToRemove(resourceName);
  }; // handleRemoveResource

  useEffect(() => {
    if (
      resourceUploadStatus.kind === "success" &&
      resourceUploadStatus.result.kind === "ok"
    ) {
      // there has been a successful upload and we can retrieve the new data by calling the refresh callback
      refreshAvailableResources();
    }
  }, [resourceUploadStatus]);

  useEffect(() => {
    if (
      resourceRemovalStatus.kind === "success" &&
      resourceRemovalStatus.result.kind === "ok"
    ) {
      // there has been a successful removal and we can retrieve the updated data by calling the refresh callback
      refreshAvailableResources();
    }
  }, [resourceRemovalStatus]);

  return (
    <ResourcesPopUpComponent
      {...props}
      resourceList={availableResources}
      onAddResource={handleAddResource}
      onResourceDeleted={handleRemoveResource}
    />
  );
}; // ResourcesPopUpLogicWrapper

export interface ResourcesPopUpComponentProps extends ResourcesPopUpProps {
  /** List of resources thar are going to be displayed */
  resourceList: ResourceDefinition[];
  /** Callback notifying that the user wants to delete a specific resource */
  onResourceDeleted?: (id: string) => void;
  /** Callback notifying parent component that the user wants to add a new resource to his escape room */
  onAddResource?: (resource: File) => void;
} // ResourcesPopUpComponentProps

export const ResourcesPopUpComponent = (
  props: ResourcesPopUpComponentProps
): JSX.Element => {
  const {
    resourceList,
    popUpTitle = "Title",
    popUpMode = "select-resources",
    onAddResource,
    onResourceDeleted,
    onResourceSelected,
    onClosePopUp,
  } = props;

  // Index of the resource that is being selected at any point
  const [selectedResource, setSelectedResource] = useState<number>(-1);
  // Index of the resource that is being hovered and needs to show the delete button
  const [hoveredResourceIndex, setHoveredResourceIndex] = useState<number>(-1);

  const handleResourceDeleted = (resourceIndex: number) => {
    if (onResourceDeleted) onResourceDeleted(resourceList[resourceIndex].name);
    setSelectedResource(-1);
    setHoveredResourceIndex(-1);
  }; // handleResourceDeleted

  const handleResourceDropped = (acceptedFiles: File[]) => {
    const [file] = acceptedFiles;
    if (onAddResource) onAddResource(file);
  }; // handleResourceDropped

  const handlePopUpClosed = () => {
    if (!onClosePopUp) return;
    onClosePopUp();
  }; //handlePopUpClosed

  const handleResourceSelected = () => {
    if (
      !onResourceSelected ||
      selectedResource === -1 ||
      selectedResource >= resourceList.length
    )
      return;
    onResourceSelected(resourceList[selectedResource].src);
  }; //handleResourceSelected

  return (
    <PopUpWrapper>
      {/* Title of the pop up */}
      <PopUpTitle>
        <Title>{popUpTitle}</Title>
        <CloseIcon onClick={handlePopUpClosed} />
      </PopUpTitle>

      {/* Body with the resources avaliable and a dropzone if the selected mode is "ManageResources" */}
      <PopUpBody>
        {/* Drop Zone for adding new resources  */}
        {
          <>
            <Dropzone onDrop={handleResourceDropped} multiple={false}>
              {({ getRootProps, getInputProps }) => (
                <DropZoneContainer {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </DropZoneContainer>
              )}
            </Dropzone>
          </>
        }
        {/* Grid with all the resources avaliable */}
        <SelectResourceGrid elements={resourceList.length} elementsPerRow={3}>
          {resourceList.map((resource, index) => (
            <ResourceContainer
              key={resource.name}
              onMouseEnter={() => setHoveredResourceIndex(index)}
              onMouseLeave={() => setHoveredResourceIndex(-1)}
            >
              <ResourceContent
                selected={selectedResource === index}
                onMouseDown={() => {
                  if (popUpMode === "select-resources")
                    setSelectedResource(index);
                }}
              >
                <ResourcePreview src={resource.src} />
                <h4>
                  <b>{resource.name}</b>
                </h4>
                {/* Green tick icon that shows if the resource is selected or not */}
                {selectedResource === index && <SelectedIcon />}
              </ResourceContent>
              {/* Button to delete the specific resource */}
              {hoveredResourceIndex === index && (
                <DeleteResourceButton
                  onClick={() => handleResourceDeleted(index)}
                >
                  <DeleteIcon />
                </DeleteResourceButton>
              )}
            </ResourceContainer>
          ))}
        </SelectResourceGrid>
      </PopUpBody>
      {/* Container of the buttons at the bottom of the pop up that let the user confirm his selection */}
      <PopUpButtons>
        {popUpMode === "select-resources" && (
          <SelectFileButton
            avaliable={selectedResource !== -1}
            onMouseDown={handleResourceSelected}
          >
            Select File
          </SelectFileButton>
        )}
      </PopUpButtons>
    </PopUpWrapper>
  );
}; // ResourcesPopUpComponent
