import { useState } from "react";
import {
  EditableItemProps,
  ArScanItemDefinition,
} from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";
import { ResourcesPopUp } from "../ResourcesPopUp";

import styled from "styled-components";
import { ScanObject } from "styled-icons/fluentui-system-filled";

const ArCodeIcon = styled(ScanObject)`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: auto;
  margin-right: 0.5em;
`;

const Root = styled.div`
  margin-top: 5px;
  display: flex;
  background-color: transparent;
  flex-direction: column;
  align-items: center;

  border-bottom: 2px solid #dadce0;
  padding: 0.75em;

  background-color: #dbdbdb;

  border-radius: 1.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const ItemTitle = styled.div`
  font-size: 1em;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
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

const defaultImage =
  "https://cdn3.vectorstock.com/i/1000x1000/60/67/example-rubber-stamp-vector-12386067.jpg";

export const EditableARScanItemContent = (
  props: EditableItemProps<ArScanItemDefinition>
): JSX.Element => {
  const { payload, onPayloadChanged } = props;

  const { imageSrc } = payload;

  //State to control wether the pop up should be displayed or not
  const [showResourcesPopUp, setShowResourcesPopUp] = useState<boolean>(false);

  const handleShowPopUp = (show: boolean) => {
    setShowResourcesPopUp(show);
  }; // handleShowPopUp

  const handleResourceSelected = (resourceSrc: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      imageSrc: resourceSrc,
    });
    setShowResourcesPopUp((prev) => !prev);
  }; // handleResourceSelected

  return (
    <>
      {/* Pop up component to enable image selection from the escape room resources */}
      {showResourcesPopUp && (
        <ResourcesPopUp
          onClosePopUp={() => {
            handleShowPopUp(false);
          }}
          onResourceSelected={handleResourceSelected}
          popUpTitle="Select an image to scan"
        />
      )}

      <Root>
        {/* Title of the component */}
        <ItemTitle>
          <ArCodeIcon
            onMouseDown={() => {
              handleShowPopUp(!showResourcesPopUp);
            }}
          />
          Image to Scan
        </ItemTitle>

        {/* Preview of the image that is going to be scanned */}
        <img src={imageSrc} width={200} height={200} alt="Image to scan" />
      </Root>
    </>
  );
}; // EditableARScanItemContent

const PreviewTitle = styled.div`
  margin-bottom: 0rem;
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

const PreviewAR = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3px;
  color: rgb(178, 178, 178);
`;

export const ARScanItemStageSlide = (
  props: ArScanItemDefinition
): JSX.Element => {
  const { imageSrc } = props;

  return (
    <>
      <PreviewTitle>{imageSrc === "" ? "Empty Image" : imageSrc}</PreviewTitle>
      <PreviewAR>
        <img src={imageSrc} width={50} height={50} />
      </PreviewAR>
    </>
  );
}; // ARScanItemStageSlide

export const arScanItemFactory: AbstractActivityItemFactory<ArScanItemDefinition> =
  {
    editingComponent: (editingProps) => (
      <EditableARScanItemContent {...editingProps} />
    ),
    defaultDefinition: {
      imageSrc: "",
    },
  }; // ARScanItemFactory

export default EditableARScanItemContent;
