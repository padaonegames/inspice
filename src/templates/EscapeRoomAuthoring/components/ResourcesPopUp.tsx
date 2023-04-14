import { useEffect, useState } from "react";

import styled, { css } from "styled-components";
import { Cross } from "@styled-icons/entypo/Cross";
import Dropzone from "react-dropzone";
import { useParams } from "react-router-dom";
import { ResourceDefinition } from "../../../services/escapeRoomActivity.model";
import { useActivityResources } from "../useActivityResources";

const CloseIcon = styled(Cross)`
  position: absolute;
  right: 1.75em;
  top: auto;
  height: 1.5em;
  width: 2em;
  color: white;
  cursor: pointer;
`;

const PopUpWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 550px;
  width: 800px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #dadce0;
  z-index: 10;
`;

////////////////////Title of the container
const PopUpTitle = styled.div`
  position: relative;
  background: ${(props) => props.theme.secondaryButtonColor};
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.div`
  font-family: ${(props) => props.theme.contentFont};
  color: white;
  font-size: 1.25em;
  font-weight: 200;
`;

////////////////////Pop up body
const PopUpBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 440px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.cardBackground};
  border-top: 1px solid #dadce0;
  border-bottom: 1px solid #dadce0;
  z-index: 99;
  overflow-y: scroll;
`;

////////////////////GRID
interface GridProps {
  elements: number;
  elementsPerRow: number;
}
const SelectResourceGrid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25em;
  width: 100%;
  height: 355px;
  align-items: center;
  justify-items: center;
`;

////////////////////Resources
interface ResourceCardContainerProps {
  selected?: boolean;
}
const ResourceCardContainer = styled.div<ResourceCardContainerProps>`
  display: flex;
  flex-direction: column;
  height: 200px;
  cursor: pointer;
  margin: auto;
  width: 200px;
  border-radius: 0.35rem;
  ${(props) =>
    props.selected
      ? `border: 2px solid ${props.theme.secondaryButtonColor};`
      : "border: 1px solid #dfe1e5;"}

  ${(props) =>
    !props.selected &&
    `
      &:hover {
        border: 1px solid ${props.theme.secondaryButtonColor};
      }
      `}
`;

export const EmptyCard = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  margin-bottom: 20px;
  margin-right: 20px;
  width: 200px;
`;

interface ResourceCardImageProps {
  imgSrc: string;
}
const ResourceImageContainer = styled.div<ResourceCardImageProps>`
  border-top-left-radius: 0.35em;
  border-top-right-radius: 0.35em;
  height: 150px;
  width: 100%;
  overflow: hidden;
  align-self: center;
  margin: 0 auto;

  background-image: url(${(props) => props.imgSrc});
  background-repeat: no-repeat;
  background-size: 203px auto;
  background-position: 50% 50%;
  border: none;
  display: block;
  position: relative;
`;

const ResourceCardContent = styled.div`
  border-top: 1px solid #e2e2e2;
  padding: 0 12px;
  position: relative;

  height: 50px;
  display: flex;
  flex-direction: row;
  -moz-box-pack: justify;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 0 0 0.35rem 0.35rem;

  font: inherit;
`;

const ResourceTextContainer = styled.div`
  display: flex;
  margin: auto;
  min-width: 0px;
  width: 100%;
  flex-direction: column;
`;

const ResourceTitle = styled.a`
  overflow: hidden;
  line-height: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.textColor};
  font-family: ${(props) => props.theme.clickableTextFont};
  width: 100%;
  text-overflow: ellipsis;
  align-self: flex-start;
  font-size: 0.75em;
  text-decoration: none;
  letter-spacing: 0.15px;
  margin-bottom: 0.1rem;
  white-space: nowrap;
`;

const ResourceDeleteIcon = styled(Cross)`
  color: ${(props) => props.theme.textColor};
  height: 2em;
  width: 2em;
  margin: auto;
  padding: 0.4em;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background-color: ${(props) => props.theme.hoverAreaColor};
  }
`;

const ResourceOptionsContainer = styled.div`
  align-self: flex-end;
  height: 1.75em;
  width: 1.75em;
  margin: auto 10px;
  position: relative;
`;

////////////////////Bottom of the popup
const PopUpButtons = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  background: ${(props) => props.theme.cardBackground};
  height: 55px;
`;

const DropZoneContainer = styled.div`
  margin: 10px auto;
  width: 90%;
  height: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-radius: 2px;
  border-color: rgba(255, 0, 0, 0.5);
  border-style: dashed;
  background-color: ${(props) => props.theme.cardBackground};
  color: #bdbdbd;
  outline: none;
  cursor: pointer;
  transition: border 0.24s ease-in-out;
`;

interface ButtonProps {
  disabled?: boolean;
}

const actionButtonStyle = css<ButtonProps>`
  font-family: ${(props) => props.theme.contentFont};
  font-size: ${(props) => props.theme.smallButtonFont};
  border-radius: ${(props) => props.theme.buttonBorderRadius};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  height: 3em;
  padding: 0 1em;
  color: white;
  opacity: 50%;
  cursor: default;

  ${(props) =>
    !props.disabled &&
    `
  opacity: 100%;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 0.5rem 0px;
  }
  `}
`;

const SelectResourceButton = styled.button`
  ${actionButtonStyle}
  background-color: ${(props) => props.theme.secondaryButtonColor};
  margin-left: auto;
  margin-right: 1.75em;
  margin-y: auto;
  opacity: 0.975;
  color: white;
  cursor: pointer;
`;

export interface ResourcesPopUpProps {
  /** Text that is going to be displayed at the top of the pop up as the title */
  popUpTitle?: string;
  /** Mode of the pop up ("select-resources" for specifying what resource the user wants to use or "manage-resources" to manage the escape rooms resources). Default: select-resources*/
  popUpMode?: "select-resources" | "manage-resources";
  /** Callback notifying parent component of user wanting to select a specific resource */
  onResourceSelected?: (resourceSrc: string | undefined) => void;
  /** Callback notifying parent component that the user closed the pop up message */
  onClosePopUp?: () => void;
} // ResourcesPopUpProps

export const ResourcesPopUp = (props: ResourcesPopUpProps): JSX.Element => {
  // TODO: This is not the cleanest solution.
  const { activityId } = useParams();

  if (!activityId) {
    return <>No id found</>;
  }

  return <ResourcesPopUpLogicWrapper {...props} id={activityId} />;
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

  const handleResourceDeleted = (resourceIndex: number) => {
    if (onResourceDeleted) onResourceDeleted(resourceList[resourceIndex].name);
    setSelectedResource(-1);
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
    if (!onResourceSelected || selectedResource >= resourceList.length) return;

    if (selectedResource < 0) {
      onResourceSelected(undefined);
      return;
    }
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
        <Dropzone onDrop={handleResourceDropped} multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <DropZoneContainer {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag and drop some images here, or click to select files</p>
            </DropZoneContainer>
          )}
        </Dropzone>
        {/* Grid with all the resources avaliable */}
        <SelectResourceGrid elements={resourceList.length} elementsPerRow={4}>
          {resourceList.map((resource, index) => (
            <ResourceCardContainer
              key={resource.name}
              selected={index === selectedResource}
              onMouseDown={() => {
                if (popUpMode === "select-resources")
                  setSelectedResource(index === selectedResource ? -1 : index);
              }}
            >
              <ResourceImageContainer imgSrc={resource.src} />
              <ResourceCardContent>
                <ResourceTextContainer>
                  <ResourceTitle>{resource.name}</ResourceTitle>
                </ResourceTextContainer>
                <ResourceOptionsContainer>
                  <ResourceDeleteIcon
                    onClick={() => handleResourceDeleted(index)}
                  />
                </ResourceOptionsContainer>
              </ResourceCardContent>
            </ResourceCardContainer>
          ))}
        </SelectResourceGrid>
      </PopUpBody>
      {/* Container of the buttons at the bottom of the pop up that let the user confirm his selection */}
      <PopUpButtons>
        {popUpMode === "select-resources" && (
          <SelectResourceButton
            disabled={false}
            onMouseDown={handleResourceSelected}
          >
            Select File
          </SelectResourceButton>
        )}
      </PopUpButtons>
    </PopUpWrapper>
  );
}; // ResourcesPopUpComponent
